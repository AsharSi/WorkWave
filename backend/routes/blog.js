import express from "express";
import Blog from "../models/Blog.js";
import { verifyTokenAndAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE BLOG
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newBlog = new Blog(req.body);
    try {
        const savedBlog = await newBlog.save();
        res.status(200).json(savedBlog);
    } catch (error) {
        res.status(500).json(error);
    }
});

// UPDATE BLOG
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },
        { new: true } 
        );
        res.status(200).json(updatedBlog);
    } catch (error) {
        res.status(500).json(error);
    }
});

// DELETE BLOG
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id)
        res.status(200).json("Successfully deleted...");
    } catch (error) {
        res.status(500).json(error);
    }
});

// GET BLOG
router.get("/:id", async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
        if(!blog) return res.status(404).json("Blog does not exists!")

        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json(error);
    } 
});

// GET ALL BLOGS
router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        let blogs;

        if(qNew) {
            blogs = await Blog.find().sort({ createdAt: -1 }).limit(5);
        } else if(qCategory) {
            blogs = await Blog.find({
                categories: {
                    $in: [qCategory],
                },
            });
        } else {
            blogs = await Blog.find().sort({ createdAt: -1 });
        }

        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json(error);
    }
});

export default router;