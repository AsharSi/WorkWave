import mongoose from "mongoose";

const WishlistSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            unique: true
        },
        products: [String]
    },
    { timestamps: true }
);

const Wishlist = mongoose.model("Wishlist", WishlistSchema);

export default Wishlist;