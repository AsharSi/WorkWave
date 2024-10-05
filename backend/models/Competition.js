import mongoose from "mongoose";

const CompetitionSchema = new mongoose.Schema({
  recruiterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recruiter",
    required: true,
  },
  name: { type: String, required: true },
  description: String,
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  registrationDeadline: { type: Date, required: true },
  maxParticipants: { type: Number, default: 100 },
  stages: [{ type: mongoose.Schema.Types.ObjectId, ref: "CompetitionStage" }],
  createdAt: { type: Date, default: Date.now },
});

const Competition = mongoose.model("Competition", CompetitionSchema);

export default Competition;