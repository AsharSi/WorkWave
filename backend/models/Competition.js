import mongoose from "mongoose";

const CompetitionSchema = new mongoose.Schema({
  recruiterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recruiter",
    required: true,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  role: {type: String, required: true},
  description: { type: String },
  companyName: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  registrationDeadline: { type: Date, required: true },
  maxParticipants: { type: Number, default: 1000 },
  competitionLink: { type: String },
  infoSections: [{
    title: { type: String, required: true },
    content: { type: String, required: true },
  }],
  contacts: [{
    name: {type: String, required: true},
    email: {type: String, required: true},
    phoneNumber: {type: String},
  }],
  location: { type: String, required: true },
  rounds: [{ type: mongoose.Schema.Types.ObjectId, ref: "CompetitionStage" }],
  registerdCandidates: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Competition = mongoose.model("Competition", CompetitionSchema);

export default Competition;