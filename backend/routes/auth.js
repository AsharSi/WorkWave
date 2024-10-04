import express from "express";
import jwt from "jsonwebtoken";
import bcryptjs from 'bcryptjs';
import Company from "../models/Company.js";
import { errorHandler } from "../utils/error.js";
import crypto from 'crypto';
import nodemailer from 'nodemailer';

const router = express.Router();

//REGISTER
router.post("/register", async (req, res, next) => {
    try {
        const hashedPassword = bcryptjs.hashSync(req.body.password, 10);

        const email = req.body.email;
        const existingCompany = await Company.findOne ({ email });

        if (existingCompany) return next(errorHandler(400, "Company already exists!"));

        const newCompany = new Company({
            company_name: req.body.company_name,
            email: req.body.email,
            description: req.body.description,
            phoneNumber: req.body.phoneNumber,
            phoneCode: req.body.phoneCode,
            country: req.body.country,
            password: hashedPassword
        });

        const savedCompany = await newCompany.save();

        const token = jwt.sign({ id: savedCompany._id, isAdmin: savedCompany.isAdmin }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = savedCompany._doc;
        res
            .cookie('access_token', token, { httpOnly: true, expires: new Date(Date.now() + 24 * 60 * 60 * 1000) })
            .status(200)
            .json(rest)
            
    } catch (error) {
        next(error);
    }
})

//LOGIN
router.post("/login", async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validCompany = await Company.findOne({ email });
        if (!validCompany) return next(errorHandler(404, "Company not found!"));
        const validPassword = await bcryptjs.compareSync(password, validCompany.password);
        if (!validPassword) return next(errorHandler(401, "Wrong Credentials!"));
        const token = jwt.sign({ id: validCompany._id, isAdmin: validCompany.isAdmin }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = validCompany._doc;
        res
            .cookie('access_token', token, { httpOnly: true, expires: new Date(Date.now() + 24 * 60 * 60 * 1000) })
            .status(200)
            .json(rest)
    } catch (error) {
        next(error)
    }
})

// O-AUTH
router.post("/google", async (req, res, next) => {
    try {
        const Company = await Company.findOne({ email: req.body.email });
        if (Company) {
            const token = jwt.sign({ id: Company._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = Company._doc;
            res
                .cookie('access_token', token, { httpOnly: true, expires: new Date(Date.now() + 24 * 60 * 60 * 1000) })
                .status(200)
                .json(rest);
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newCompany = new Company({
                company_name: req.body.company_name,
                email: req.body.email,
                password: hashedPassword,
                phoneNumber: req.body.phoneNumber,
                phoneCode: req.body.phoneCode,
                country: req.body.country
            });
            await newCompany.save();
            const token = jwt.sign(
                {
                    id: Company._id,
                    isAdmin: Company.isAdmin,
                },
                process.env.JWT_SECRET
            );
            const { password: pass, ...rest } = newCompany._doc;
            res
                .cookie('access_token', token, { httpOnly: true, expires: new Date(Date.now() + 24 * 60 * 60 * 1000) })
                .status(200)
                .json(rest);
        }

    } catch (error) {
        next(error)
    }
})

// LOGOUT
router.post("/logout", async (req, res, next) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json("Company has been logged out!");
    } catch (error) {
        next(error)
    }
})

// Forgot Password
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        const Company = await Company.findOne({ email });

        if (!Company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(20).toString('hex');
        Company.resetPasswordToken = resetToken;
        Company.resetPasswordExpires = Date.now() + 300000; // Token expires in 5 minutes
        await Company.save();

        // Send email with reset link
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'josaacounsellors@gmail.com',
                pass: process.env.MAIL
            }
        })
        const mailOptions = {
            from: 'josaacounsellors@gmail.com',
            to: Company.email,
            subject: 'Password Reset Request',
            text: `Click on this link to reset your password: http://localhost:5173/reset/${resetToken}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.status(500).json({ message: "Can't send reset link!" });
            } else {
                console.log('Email sent');
            }
        });

        res.json({ message: 'Password reset email sent' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Reset Password
router.post('/reset-password/:token', async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        // Find Company by reset token
        const Company = await Company.findOne({ resetPasswordToken: token });

        if (!Company) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // Check if token is expired
        if (Company.resetPasswordExpires < Date.now()) {
            return res.status(400).json({ message: 'Token has expired' });
        }

        // Hash password and save to Company
        const hashedPassword = bcryptjs.hashSync(password, 10);
        Company.password = hashedPassword;
        Company.resetPasswordToken = undefined;
        Company.resetPasswordExpires = undefined;
        await Company.save();

        res.json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;