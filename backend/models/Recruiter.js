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
    credits: {
      type: Number,
      default: 500,
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
    websiteLink: {
      type: String,
    },
    linkedInLink: {
      type: String,
    },
    location: {
      type: String,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

const Recruiter = mongoose.model("Recruiter", RecruiterSchema);

export default Recruiter;