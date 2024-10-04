import express from "express";
import Product from "../models/Product.js";
import { verifyTokenAndAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE PRODUCT
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newProduct = new Product(req.body);
    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (error) {
        res.status(500).json(error);
    }
});

// UPDATE PRODUCT
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },
            { new: true }
        );
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json(error);
    }
});

// DELETE PRODUCT
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Successfully deleted...");
    } catch (error) {
        res.status(500).json(error);
    }
});

// GET PRODUCT
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) return res.status(404).json("Product does not exists!")

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json(error);
    }
});

// GET ALL PRODUCTS
// router.get("/", async (req, res) => {
//     const limit = parseInt(req.query.limit) || 9;
//     const startIndex = parseInt(req.query.startIndex) || 0;
//     const qNew = req.query.new;
//     let qCategory = req.query.category;
//     if (qCategory) {
//         qCategory = qCategory.toLowerCase();
//     }
//     try {
//         let products;

//         if (qNew) {
//             products = await Product.find().sort({ createdAt: -1 }).limit(5);
//         } else if (qCategory != 'null') {
//             products = await Product.find({
//                 categories: {
//                     $in: [qCategory],
//                 },
//             });
//         } else {
//             products = await Product.find();
//         }

//         res.status(200).json(products);
//     } catch (error) {
//         res.status(500).json(error);
//     }
// });
router.get("/", async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;
        let offer = req.query.offer;

        if (offer === undefined || offer === 'false') {
            offer = { $in: [false, true] };
        }

        // let furnished = req.query.furnished;

        // if(furnished === undefined || furnished === 'false'){
        //     furnished = { $in: [false, true] };
        // }

        // let parking = req.query.parking;

        // if(parking === undefined || parking === 'false'){
        //     parking = { $in: [false, true] };
        // }

        let categories = req.query.category;
        if (categories) {
            categories = categories.toLowerCase();
        }

        if (categories === undefined || categories === 'all') {
            categories = { $in: ['fruits', 'vegetables', 'flowers', 'dryfruits'] };
        }

        const searchTerm = req.query.searchTerm || '';

        const sort = req.query.sort || 'regularPrice';

        const order = req.query.order || 'desc';

        const products = await Product.find({
            title: { $regex: searchTerm, $options: 'i' },
            offer,
            categories,
        }).sort(
            { [sort]: order }
        ).limit(limit).skip(startIndex);

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json(error);
    }
});

export default router;