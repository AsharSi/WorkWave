import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/company.js';
import authRoutes from './routes/auth.js';
import competition from './routes/competition.js';
import stage from './routes/stage.js';
import student from './routes/student.js';
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

app.get("/api/test", (req, res) => {
    res.status(200).send("Test is Successfull!")
});

app.use("/api/auth", authRoutes);
app.use("/api/company", userRoutes);
app.use("/api/competition", competition);
app.use("/api/stage", stage);
app.use("/api/student", student);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error!";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});

