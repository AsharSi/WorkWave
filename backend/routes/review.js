import express from "express";
import Review from "../models/Review.js";
import { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE REVIEW
router.post("/", async (req, res) => {
    try {
        const review = await Review.findOne({ productId: req.body.productId, userId: req.body.userId }).sort({ ['rating']: 'desc' });
        if (review) {
            const updatedReview = await Review.findByIdAndUpdate(review._id, {
                $set: req.body
            }, { new: true });
            return res.status(200).json(updatedReview);
        }
        const newReview = new Review(req.body);
        const savedReview = await newReview.save();
        res.status(200).json(savedReview);
    } catch (error) {
        res.status(500).json(error);
    }
});

// UPDATE REVIEW
router.post("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedReview = await Review.findByIdAndUpdate(req.params.id, {
            $set: {
                products: req.body.products
            }
        }, { new: true }
        );
        res.status(200).json(updatedReview);
    } catch (error) {
        res.status(500).json(error);
    }
});

// DELETE REVIEW
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Review.findByIdAndDelete(req.params.id)
        res.status(200).json("Successfully deleted...");
    } catch (error) {
        res.status(500).json(error);
    }
});

// GET PRODUCT REVIEW
router.get("/:id", async (req, res) => {
    try {
        const reviews = await Review.find({ productId: req.params.id }).sort({ ['rating']: 'desc' });
        if (!reviews) return res.status(404).json("Review is Empty!");

        res.status(200).json(reviews);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
});

router.get('/rating/:productId', async (req, res) => {
    try {
        const { productId } = req.params;
        const stats = await Review.aggregate([
            { $match: { productId: productId } },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: '$rating' },
                    totalReviews: { $sum: 1 }
                }
            }
        ]);

        if (stats.length === 0) {
            res.json({ _id: 'default', averageRating: 4 + Math.random() * 0.6, totalReviews: Math.floor(Math.random() * 101) + 100 });
            return;
        }

        // if (stats.length === 0) {
        //     res.status(404).json({ error: 'No reviews found for this product' });
        //     return;
        // }

        res.json(stats[0]);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


// GET ALL REVIEWS
router.get("/", async (req, res) => {
    try {
        const reviews = await Review.find();

        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json(error);
    }
});

export default router;