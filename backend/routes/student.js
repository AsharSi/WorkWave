import express from 'express';
import Student from '../models/Student.js';

const router = express.Router();

router.post('/competitions/:competitionId/register', async (req, res) => {
  const { name, email, cvLink } = req.body;
  try {
    const newStudent = new Student({
      name,
      email,
      cvLink,
      scores: [{ competitionId: req.params.competitionId, stageId: null, score: 0 }]
    });
    await newStudent.save();
    res.status(201).json({ message: 'Student registered successfully.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Submit CV for a competition stage
router.post('/competitions/:competitionId/:stageId/submit-cv', async (req, res) => {
  const { studentId, score } = req.body;
  try {
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: 'Student not found.' });

    // Update the student's score for the stage
    student.scores.push({
      competitionId: req.params.competitionId,
      stageId: req.params.stageId,
      score,
      isQualified: score >= 60 // Example qualification threshold
    });

    await student.save();
    res.status(200).json({ message: 'CV submitted and score generated.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Submit interview results
router.post('/competitions/:competitionId/:stageId/submit-interview', async (req, res) => {
  const { studentId, score } = req.body;
  try {
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: 'Student not found.' });

    // Update the student's interview score
    student.scores.push({
      competitionId: req.params.competitionId,
      stageId: req.params.stageId,
      score,
      isQualified: score >= 75 // Example qualification threshold for interviews
    });

    await student.save();
    res.status(200).json({ message: 'Interview score submitted and student updated.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all students for a competition
router.get('/competitions/:competitionId/students', async (req, res) => {
  try {
    const students = await Student.find({ 'scores.competitionId': req.params.competitionId });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a student by ID
router.get('/students/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found.' });
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a student
router.put('/students/:id', async (req, res) => {
  const { name, email, cvLink } = req.body;
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, { name, email, cvLink }, { new: true });
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a student
router.delete('/students/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Student deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;