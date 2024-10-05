import express from 'express';
import CompetitionStage from '../models/CompetitionStage.js';

const router = express.Router();

// Create a new stage for a competition
router.post('/:competitionId', async (req, res) => {
  const { name, description, stageNumber, maxScore, isFinalStage } = req.body;
  try {
    const newStage = new CompetitionStage({
      competitionId: req.params.competitionId,
      name,
      description,
      stageNumber,
      maxScore,
      isFinalStage
    });
    await newStage.save();
    res.status(201).json(newStage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all stages for a competition
router.get('/:competitionId', async (req, res) => {
  try {
    const stages = await CompetitionStage.find({ competitionId: req.params.competitionId });
    res.status(200).json(stages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a stage by ID
router.get('/:competitionId/:stageId', async (req, res) => {
  try {
    const stage = await CompetitionStage.findById(req.params.stageId);
    if (!stage) return res.status(404).json({ message: 'Stage not found' });
    res.status(200).json(stage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a stage
router.put('/:competitionId/:stageId', async (req, res) => {
  const { name, description, stageNumber, maxScore, isFinalStage } = req.body;
  try {
    const updatedStage = await CompetitionStage.findByIdAndUpdate(req.params.stageId, {
      name,
      description,
      stageNumber,
      maxScore,
      isFinalStage
    }, { new: true });
    res.status(200).json(updatedStage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a stage
router.delete('/:competitionId/:stageId', async (req, res) => {
  try {
    await CompetitionStage.findByIdAndDelete(req.params.stageId);
    res.status(200).json('Stage has been deleted...');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;