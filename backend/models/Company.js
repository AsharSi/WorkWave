import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema(
  {
    company_name: {
      type: String,
      required: true,
    },
    description: String,
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

const Company = mongoose.model("Company", CompanySchema);

export default Company;
