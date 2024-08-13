// routes/bacterialAnalysisRouter.js
import express from 'express';
import BacterialAnalysis from '../models/BacterialAnalysis.js';

const router = express.Router();

router.post('/add', async (req, res) => {
    try {
        const analysis = new BacterialAnalysis(req.body);
        await analysis.save();
        res.status(201).send({ message: 'Bacterial analysis data saved successfully.' });
    } catch (error) {
        res.status(400).send({ error: 'Failed to save data' });
    }
});

// New endpoint to fetch all analyses
router.get('/all', async (req, res) => {
    try {
        const analyses = await BacterialAnalysis.find();
        res.status(200).send(analyses);
    } catch (error) {
        res.status(400).send({ error: 'Failed to fetch data' });
    }
});


router.get('/list', async (req, res) => {
    try {
        const analyses = await BacterialAnalysis.find().sort({ date: 1 });
        res.status(200).send(analyses);
    } catch (error) {
        res.status(400).send({ error: 'Failed to retrieve data' });
    }
});

// routes/bacterialAnalysisRouter.js
router.get('/search', async (req, res) => {
    const { date } = req.query;
    try {
        const analyses = await BacterialAnalysis.find({ date: new Date(date) }).sort({ date: 1 });
        res.status(200).send(analyses);
    } catch (error) {
        res.status(400).send({ error: 'Failed to fetch data' });
    }
});


export { router as BacterialAnalysisRouter };


