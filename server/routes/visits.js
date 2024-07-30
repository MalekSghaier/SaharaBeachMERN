// routes/visits.js
import express from 'express';
import { Visit } from '../models/Visit.js';
import { PersonnelVisit } from '../models/PersonnelVisit.js';

const router = express.Router();

// Get all visits
router.get('/', async (req, res) => {
    try {
        const visits = await Visit.find({});
        res.json(visits);
    } catch (err) {
        res.status(500).json({ status: false, message: 'Erreur serveur lors de la récupération des visites' });
    }
});

// Add a new visit
router.post('/', async (req, res) => {
    const { visitDate, description } = req.body;

    try {
        const newVisit = new Visit({
            visitDate,
            description,
            employees: []
        });

        await newVisit.save();
        res.json({ status: true, message: 'Visite ajoutée avec succès' });
    } catch (err) {
        res.status(500).json({ status: false, message: 'Erreur serveur lors de l\'ajout de la visite' });
    }
});
// Add this route to store the visit date in a variable and update employee statuses
router.put('/:visitId/employees/update', async (req, res) => {
    try {
        const visitId = req.params.visitId;
        const visit = await Visit.findById(visitId);
        if (!visit) {
            return res.status(404).json({ message: 'Visite non trouvée' });
        }

        const visitDate = visit.visitDate;

        // Update employees' DateVisite field if Status is 'P' and date is not already present
        await PersonnelVisit.updateMany(
            { Status: 'P', DateVisite: { $ne: visitDate } },
            { $addToSet: { DateVisite: visitDate } }
        );

        res.json({ message: 'Date de visite mise à jour pour les employés présents', visitDate });
    } catch (error) {
        console.error('Error updating employees:', error);
        res.status(500).json({ message: 'Erreur serveur lors de la mise à jour des employés' });
    }
});
// Route pour rechercher les visites par date
router.get('/search', async (req, res) => {
    const { date } = req.query;
    try {
        const visits = await Visit.find({ visitDate: date });
        res.json(visits);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get employees for a specific visit
router.get('/:visitId/employees', async (req, res) => {
    try {
        const visitId = req.params.visitId;
        const employees = await PersonnelVisit.find({ visitId }).populate('employeeId');

        res.json(employees);
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ message: 'Error fetching employees' });
    }
});


router.put('/:visitId/employees/update', async (req, res) => {
    try {
        const visitId = req.params.visitId;
        const visit = await Visit.findById(visitId);
        const adress = visit.visitDate;
        if (!visit) {
            return res.status(404).json({ message: 'Visite non trouvée' });
        }

        const { visitDate } = visit;

        // Mettre à jour les employés présents sans dupliquer la date de visite
        await PersonnelVisit.updateMany(
            { Status: 'P', DateVisite: { $ne: adress } },
            { $addToSet: { DateVisite: adress } }
        );

        res.json({ message: 'Date de visite mise à jour pour les employés présents' });
    } catch (error) {
        console.error('Error updating employees:', error);
        res.status(500).json({ message: 'Erreur serveur lors de la mise à jour des employés' });
    }
});

// Update employees for a visit
router.put('/updateEmployees/:visitDate', async (req, res) => {
    const { visitDate } = req.params;
    const { employees } = req.body;

    try {
        await PersonnelVisit.updateMany(
            { 'DateVisite': { $ne: visitDate } },
            { $set: { Status: 'A' } }
        );

        await PersonnelVisit.updateMany(
            { _id: { $in: employees } },
            { $addToSet: { DateVisite: visitDate }, $set: { Status: 'P' } }
        );

        res.json({ status: true, message: 'Employés mis à jour pour la visite' });
    } catch (err) {
        res.status(500).json({ status: false, message: 'Erreur serveur lors de la mise à jour des employés' });
    }
});


export { router as VisitRouter };


