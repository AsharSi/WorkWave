import express from "express";
import Wishlist from "../models/Wishlist.js";
import { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// ADD TO WISHLIST
router.post("/add/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ userId: req.params.id })
        if (!wishlist) {
            const newWishlist = new Wishlist({
                userId: req.params.id,
                products: [req.body.productId]
            });
            const savedWishlist = await newWishlist.save();
            res.status(200).json(savedWishlist);
        }
        else {
            if (wishlist.products.indexOf(req.body.productId) !== -1) {
                return res.status(409).json('Item already exists in the wishlist');
            }
            wishlist.products.push(req.body.productId)
            const updatedWishlist = await Wishlist.findByIdAndUpdate(wishlist._id, {
                $set: {
                    products: wishlist.products
                }
            }, { new: true }
            );
            res.status(200).json(updatedWishlist);
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// REMOVE FROM WISHLIST
router.post("/remove/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ userId: req.params.id });
        if (!wishlist) {
            return res.status(404).json('Your Wishlist is empty!');
        }
        
        const productIdToRemove = req.body.productId;
        const updatedWishlist = await Wishlist.findByIdAndUpdate(
            wishlist._id,
            { $pull: { products: productIdToRemove } },
            { new: true }
        );

        if (!updatedWishlist) {
            return res.status(404).json('Item not found in the wishlist!');
        }

        res.status(200).json(updatedWishlist);
    } catch (error) {
        res.status(500).json(error);
    }
});

// GET USER WISHLIST
router.get("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ userId: req.params.id })
        if (!wishlist) return res.status(404).json("Wishlist is Empty!");

        res.status(200).json(wishlist);
    } catch (error) {
        res.status(500).json(error);
    }
});

// DELETE USER WISHLIST
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Wishlist.findByIdAndDelete(req.params.id)
        res.status(200).json("Successfully deleted...");
    } catch (error) {
        res.status(500).json(error);
    }
});

// GET ALL WISHLISTS
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const wishlists = await Wishlist.find();

        res.status(200).json(wishlists);
    } catch (error) {
        res.status(500).json(error);
    }
});

export default router;