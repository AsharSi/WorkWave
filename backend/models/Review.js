import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
    {
        userId: {
            type: String
        },
        username: {
            type: String
        },
        productId: {
            type: String,
            required: true
        },
        review: {
            type: String
        },
        rating: {
            type: Number,
            required: true
        },
        purchased: {
            type: Boolean,
            required: true,
            default: false
        },
    },
    { timestamps: true }
);

const Review = mongoose.model("Review", ReviewSchema);

export default Review;