// routes/testCopro.js
import express from 'express';
import { TestCopro } from '../models/TestCopro.js';
import { PersonnelCopro } from '../models/PersonnelCopro.js';

const router = express.Router();

// Get all test copros
router.get('/', async (req, res) => {
    try {
        const testCopros = await TestCopro.find({});
        res.json(testCopros);
    } catch (err) {
        res.status(500).json({ status: false, message: 'Erreur serveur lors de la récupération des tests copro' });
    }
});

// Add a new test copro
router.post('/', async (req, res) => {
    const { testDate, description } = req.body;

    try {
        const newTestCopro = new TestCopro({
            testDate,
            description
        });

        await newTestCopro.save();
        res.json({ status: true, message: 'Test Copro ajouté avec succès' });
    } catch (err) {
        res.status(500).json({ status: false, message: 'Erreur serveur lors de l\'ajout du test copro' });
    }
});



// Search test copros by date
router.get('/search', async (req, res) => {
    const { date } = req.query;

    try {
        const testCopros = await TestCopro.find({
            testDate: {
                $eq: new Date(date)
            }
        });
        res.json(testCopros);
    } catch (err) {
        res.status(500).json({ status: false, message: 'Erreur serveur lors de la recherche des tests copro' });
    }
});




// Add this route to store the test date in a variable and update employee statuses
router.put('/:testId/employees/update', async (req, res) => {
    try {
        const testId = req.params.testId;
        console.log(testId);
        const test = await TestCopro.findById(testId);
        if (!test) {
            return res.status(404).json({ message: 'Test non trouvé' });
        }

        const testDate = test.testDate;

        // Update employees' DateVisite field if Status is 'P' and date is not already present
        await PersonnelCopro.updateMany(
            { Status: 'P', DateVisite: { $ne: testDate } },
            { $addToSet: { DateVisite: testDate } }
        );

        res.json({ message: 'Date de test mise à jour pour les employés présents', testDate });
    } catch (error) {
        console.error('Error updating employees:', error);
        res.status(500).json({ message: 'Erreur serveur lors de la mise à jour des employés' });
    }
});


export { router as TestCoproRouter };
