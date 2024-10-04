import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        imgURL: {
            type: String,
        },
        backgroundColor: {
            type: String,
        },
        categories: {
            type: Array
        },
    },
    { timestamps: true }
);

const Blog = mongoose.model('Blog', BlogSchema);

export default Blog;