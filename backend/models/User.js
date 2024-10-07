import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String, default: "companyrecruiter" },
    image: { type: String },
    emailVerified: { type: Boolean, default: false },
    recruiter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recruiter",
    },
    createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", UserSchema);

export default User;