import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  cvLink: { type: String, required: true }, // link to the student's CV
  scores: [
    {
      competitionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Competition' },
      stageId: { type: mongoose.Schema.Types.ObjectId, ref: 'CompetitionStage' },
      score: Number,
      isQualified: { type: Boolean, default: false },
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

const Student = mongoose.model('Student', StudentSchema);

export default Student;