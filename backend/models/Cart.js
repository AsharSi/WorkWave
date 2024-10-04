import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            unique: true
        },
        products: [
            {
                productId: {
                    type: String,
                },
                quantity: {
                    type: Number,
                },
                unit: {
                    type: String,
                },
                type: {
                    type: String,
                },
            }
        ],
    },
    { timestamps: true }
);

const Cart = mongoose.model("Cart", CartSchema);

export default Cart;