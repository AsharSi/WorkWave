import express from "express";
import Recruiter from "../models/Recruiter.js";
import bcryptjs from 'bcryptjs';

import { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// UPDATE Recruiter
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    try {
        const updatedRecruiter = await Recruiter.findByIdAndUpdate(req.params.id, {
            $set: {
                recruiter: req.body.recruiter,
                email: req.body.email,
                password: req.body.password,
                phoneNumber: req.body.phoneNumber,
                phoneCode: req.body.phoneCode,
                address: req.body.address,
                country: req.body.country,
            }
        }, { new: true });
        const { password, ...others } = updatedRecruiter._doc;
        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error);
    }
});

// DELETE Recruiter
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Recruiter.findByIdAndDelete(req.params.id)
        res.status(200).json("Your account has been deleted...");
    } catch (error) {
        res.status(500).json(error);
    }
});

// Get RecruiterS STATS
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        const data = await Recruiter.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                },
            },
        ]);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);
    }
});

// GET Recruiter
router.get("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const recruiter = await Recruiter.findById(req.params.id)

        if (!recruiter) return res.status(404).json("Recruiter does not exists!")

        const { password, ...others } = recruiter._doc;
        res.status(200).json(others);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
});

// GET ALL Recruiters
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new;
    try {
        const recruiters = query ? await Recruiter.find().sort({ _id: -1 }).limit(5) : await Recruiter.find();
        res.status(200).json(recruiters);
    } catch (error) {
        res.status(500).json(error);
    }
});

export default router;