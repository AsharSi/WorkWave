import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        }, 
        desc: {
            type: String,
            required: true
        },
        additionalDesc: {
            type: Array,
            required: true
        },
        additionalInfo: {
            type: String,
            required: true
        },
        img: {
            type: Array,
            required: true
        },
        categories: {
            type: Array
        },
        size: {
            type: Array
        },
        offer: {
            type: Boolean,
            default: false
        },
        regularPrice: {
            type: Number,
            required: true
        },
        discountedPrice: {
            type: Number,
            default: 0
        },
        inStock: {
            type: Boolean,
            default: true
        },
        productBrand: {
            type: String
        }
    },
    { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;