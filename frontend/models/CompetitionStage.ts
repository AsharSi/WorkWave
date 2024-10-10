import mongoose from "mongoose";

const CompetitionStageSchema = new mongoose.Schema({
  competitionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Competition",
    required: true,
  },
  stageNumber: { type: Number, required: true },
  title: { type: String, required: true },
  content: { type: String },
  maxScore: { type: Number, default: 100 },
  qualifiedCandidates: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  ],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.CompetitionStage ||
  mongoose.model("CompetitionStage", CompetitionStageSchema);
