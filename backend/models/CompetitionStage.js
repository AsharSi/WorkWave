import mongoose from 'mongoose';

const CompetitionStageSchema = new mongoose.Schema({
    competitionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Competition', required: true },
    stageNumber: { type: Number, required: true },
    name: { type: String, required: true }, // e.g. "CV Submission", "Interview", etc.
    description: String,
    maxScore: { type: Number, required: true }, // maximum score for this stage
    isFinalStage: { type: Boolean, default: false },
    qualifiedCandidates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
    createdAt: { type: Date, default: Date.now }
});

const CompetitionStage = mongoose.model('CompetitionStage', CompetitionStageSchema);

export default CompetitionStage;