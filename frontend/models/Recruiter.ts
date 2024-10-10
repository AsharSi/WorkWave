import mongoose from "mongoose";

const RecruiterSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    userIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    description: {
      type: String,
    },
    competitions: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Competition" },
    ],
    competitionStages: [
      { type: mongoose.Schema.Types.ObjectId, ref: "CompetitionStage" },
    ],
    companyEmail: {
      type: String,
      unique: true,
      required: true,
    },
    credits: {
      type: Number,
      default: 500,
    },
    phoneNumber: {
      type: String,
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

export default mongoose.models.Recruiter ||
  mongoose.model("Recruiter", RecruiterSchema);
