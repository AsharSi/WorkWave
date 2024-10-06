import express from 'express';
import Competition from '../models/Competition.js';
import Recruiter from '../models/Recruiter.js';

const router = express.Router();

// Create a new competition
router.post('/', async (req, res) => {
    const { recruiterId, name, description, startDate, endDate, registrationDeadline, maxParticipants } = req.body;
    try {
        const recruiter = await Recruiter.findById(recruiterId);
        if (!recruiter) return res.status(404).json({ message: 'Recruiter not found' });

        const newCompetition = new Competition({
            recruiterId,
            name,
            description,
            startDate,
            endDate,
            registrationDeadline,
            maxParticipants
        });

        await newCompetition.save();

        recruiter.competitions.push(newCompetition._id);
        await recruiter.save();

        res.status(201).json(newCompetition);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all competitions
router.get('/', async (req, res) => {
    try {
        const competitions = await Competition.find().populate('recruiterId');
        res.status(200).json(competitions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all competitions by recruiter ID
router.get('/recruiter/:recruiterId', async (req, res) => {
    try {
        const competitions = await Competition.find({ recruiterId: req.params.recruiterId });
        res.status(200).json(competitions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a competition by ID
router.get('/:id', async (req, res) => {
    try {
        const competition = await Competition.findById(req.params.id).populate('recruiterId');
        if (!competition) return res.status(404).json({ message: 'Competition not found' });
        res.status(200).json(competition);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a competition
router.put('/:id', async (req, res) => {
    const { name, description, startDate, endDate, registrationDeadline, maxParticipants } = req.body;
    try {
        const updatedCompetition = await Competition.findByIdAndUpdate(req.params.id, {
            name,
            description,
            startDate,
            endDate,
            registrationDeadline,
            maxParticipants
        }, { new: true });
        res.status(200).json(updatedCompetition);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a competition
router.delete('/:id', async (req, res) => {
    try {
        await Competition.findByIdAndDelete(req.params.id);
        
        // Remove the competition from the recruiter's competitions array
        const recruiter = await Recruiter.findOne({ competitions: req.params.id });

        if (recruiter) {
            recruiter.competitions = recruiter.competitions.filter(compId => compId !== req.params.id);
            await recruiter.save();
        }

        res.status(200).json({ message: 'Competition deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


export default router;