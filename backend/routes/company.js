import express from "express";
import Company from "../models/Company.js";
import bcryptjs from 'bcryptjs';
import { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// UPDATE Company
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    try {
        const updatedCompany = await Company.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.Companyname,
                email: req.body.email,
                password: req.body.password,
                phoneNumber: req.body.phoneNumber,
                phoneCode: req.body.phoneCode,
                address: req.body.address,
                country: req.body.country,
            }
        }, { new: true });
        const { password, ...others } = updatedCompany._doc;
        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error);
    }
});

// DELETE Company
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Company.findByIdAndDelete(req.params.id)
        res.status(200).json("Your account has been deleted...");
    } catch (error) {
        res.status(500).json(error);
    }
});

// Get CompanyS STATS
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        const data = await Company.aggregate([
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

// GET Company
router.get("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const company = await Company.findById(req.params.id)

        if (!company) return res.status(404).json("Company does not exists!")

        const { password, ...others } = company._doc;
        res.status(200).json(others);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
});

// GET ALL Companies
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new;
    try {
        const Companies = query ? await Company.find().sort({ _id: -1 }).limit(5) : await Company.find();
        res.status(200).json(Companies);
    } catch (error) {
        res.status(500).json(error);
    }
});

export default router;