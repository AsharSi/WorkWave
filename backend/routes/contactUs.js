import express from "express";
import nodemailer from 'nodemailer';

const router = express.Router();

router.post("/", async (req, res, next) => {
    try {
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
            to: process.env.ADMIN_MAIL,
            subject: `${req.body.firstName} through Trop Organic Website`,
            html: `User ${req.body.firstName} ${req.body.lastName} has sent this message for you. <br> <b>Message:</b> ${req.body.message} <br> <b>Contact him back here:</b> <br> ${req.body.email} <br> ${req.body.phone}`
        }
        transporter.sendMail(mailOptions, (error, info) => {
            res.status(200).json("Message sent!");
        })
    } catch (error) {
        next(error);
    }
})

export default router;