import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: { type: String, default: "user" },
  image: { type: String },
  emailVerified: { type: Date },
  companyName: { type: String },
  recruiter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recruiter",
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);