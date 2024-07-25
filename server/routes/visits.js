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

// Route pour récupérer les employés associés à une visite
router.get('/:visitId/employees', async (req, res) => {
    const { visitId } = req.params;
    try {
        const visit = await Visit.findById(visitId).populate('employees');
        if (!visit) {
            return res.status(404).json({ message: 'Visite non trouvée' });
        }
        const employees = await PersonnelVisit.find({ visitId }).populate('employeeId');
        const allEmployees = await Personnel.find({});
        const employeesWithStatus = allEmployees.map(employee => ({
            ...employee.toObject(),
            status: employees.some(e => e.employeeId.equals(employee._id)) ? 'present' : 'absent'
        }));
        res.json(employeesWithStatus);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export { router as VisitRouter };
