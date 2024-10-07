import mongoose from "mongoose";

const CompetitionSchema = new mongoose.Schema({
  recruiterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recruiter",
    required: true,
  },
  title: { type: String, required: true },
  role: {type: String, required: true},
  descritpion: { type: String },
  companyName: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  registrationDeadline: { type: Date, required: true },
  maxParticipants: { type: Number, default: 100 },
  registerdCandidates: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  competitionLink: { type: String, required: true },
  infoSections: [{
    title: { type: String, required: true },
    content: { type: String, required: true },
  }],
  contacts: [{
    name: {type: String, required: true},
    email: {type: String, required: true},
    phoneNumber: {type: String},
  }],
  stages: [{ type: mongoose.Schema.Types.ObjectId, ref: "CompetitionStage" }],
  createdAt: { type: Date, default: Date.now },
});

const Competition = mongoose.model("Competition", CompetitionSchema);

export default Competition;