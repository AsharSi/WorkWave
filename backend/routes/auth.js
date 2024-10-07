import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcryptjs from 'bcryptjs';
import Recruiter from "../models/Recruiter.js";
import { errorHandler } from "../utils/error.js";
import crypto from 'crypto';
import nodemailer from 'nodemailer';

const router = express.Router();

//REGISTER
router.post("/register/:userId", async (req, res, next) => {
    try {
        const hashedPassword = bcryptjs.hashSync(req.body.password, 10);

        const email = req.body.email;

        const existingUser = await User.findById(req.params.userId);
        if (!existingUser) return next(errorHandler(404, "User not found!"));

        const existingRecruiter = await Recruiter.findOne({ email });
        if (existingRecruiter) return next(errorHandler(400, "Company already exists!"));

        const newRecruiter = new Recruiter({
            recruiter: req.body.recruiter,
            email: req.body.email,
            description: req.body.description,
            phoneNumber: req.body.phoneNumber,
            phoneCode: req.body.phoneCode,
            location: req.body.location,
            websiteLink: req.body.websiteLink,
            linkedInLink: req.body.linkedInLink,
            credits: req.body.credits,
            password: hashedPassword
        });

        const savedRecruiter = await newRecruiter.save();

        existingUser.recruiter = savedRecruiter._id;
        await existingUser.save();

        const token = jwt.sign({ id: savedRecruiter._id, isAdmin: savedRecruiter.isAdmin }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = savedRecruiter._doc;

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
    try {
        const { email, password } = req.body;
        const validRecruiter = await Recruiter.findOne({ email });
        if (!validRecruiter) return next(errorHandler(404, "Recruiter not found!"));
        const validPassword = await bcryptjs.compareSync(password, validRecruiter.password);
        if (!validPassword) return next(errorHandler(401, "Wrong Credentials!"));
        const token = jwt.sign({ id: validRecruiter._id, isAdmin: validRecruiter.isAdmin }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = validRecruiter._doc;
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
        const Recruiter = await Recruiter.findOne({ email: req.body.email });
        if (Recruiter) {
            const token = jwt.sign({ id: Recruiter._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = Recruiter._doc;
            res
                .cookie('access_token', token, { httpOnly: true, expires: new Date(Date.now() + 24 * 60 * 60 * 1000) })
                .status(200)
                .json(rest);
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newRecruiter = new Recruiter({
                company_name: req.body.company_name,
                email: req.body.email,
                password: hashedPassword,
                phoneNumber: req.body.phoneNumber,
                phoneCode: req.body.phoneCode,
                country: req.body.country
            });
            await newRecruiter.save();
            const token = jwt.sign(
                {
                    id: Recruiter._id,
                    isAdmin: Recruiter.isAdmin,
                },
                process.env.JWT_SECRET
            );
            const { password: pass, ...rest } = newRecruiter._doc;
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
        res.status(200).json("Recruiter has been logged out!");
    } catch (error) {
        next(error)
    }
})

// Forgot Password
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        const Recruiter = await Recruiter.findOne({ email });

        if (!Recruiter) {
            return res.status(404).json({ message: 'Recruiter not found' });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(20).toString('hex');
        Recruiter.resetPasswordToken = resetToken;
        Recruiter.resetPasswordExpires = Date.now() + 300000; // Token expires in 5 minutes
        await Recruiter.save();

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
            to: Recruiter.email,
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

        // Find Recruiter by reset token
        const Recruiter = await Recruiter.findOne({ resetPasswordToken: token });

        if (!Recruiter) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // Check if token is expired
        if (Recruiter.resetPasswordExpires < Date.now()) {
            return res.status(400).json({ message: 'Token has expired' });
        }

        // Hash password and save to Recruiter
        const hashedPassword = bcryptjs.hashSync(password, 10);
        Recruiter.password = hashedPassword;
        Recruiter.resetPasswordToken = undefined;
        Recruiter.resetPasswordExpires = undefined;
        await Recruiter.save();

        res.json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;