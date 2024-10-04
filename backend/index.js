import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/product.js';
import cartRoutes from './routes/cart.js';
import orderRoutes from './routes/order.js';
import blogRoutes from './routes/blog.js';
import contactUsRoutes from './routes/contactUs.js';
import wishlistRoutes from './routes/wishlist.js';
import reviewRoutes from './routes/review.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';
dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection Successfull!"))
    .catch((err) => {
        console.log(err);
    });


const __dirname = path.resolve();
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

const port = 5000;

app.listen(port, () => {
    console.log("Server is Running:");
});

app.get("/api/test", (req,res) => {
    res.status(200).send("Test is Successfull!")
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/contactUs", contactUsRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/review", reviewRoutes);


app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error!";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});

