import mongoose from "mongoose";

const RecruiterSchema = new mongoose.Schema(
  {
    recruiter: {
      type: String,
      required: true,
    },
    description: String,
    competitions: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Competition" },
    ],
    competitionStages: [
      { type: mongoose.Schema.Types.ObjectId, ref: "CompetitionStage" },
    ],
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phoneNumber: {
      type: Number,
    },
    phoneCode: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    country: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

const Recruiter = mongoose.model("Recruiter", RecruiterSchema);

export default Recruiter;
