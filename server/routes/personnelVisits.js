import express from 'express';
import { PersonnelVisit } from '../models/PersonnelVisit.js';
import { Visit } from '../models/Visit.js';

const router = express.Router();

router.get('/all', async (req, res) => {
    try {
        const employees = await PersonnelVisit.find({});
        res.json(employees);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur lors de la récupération des employés' });
    }
});

router.get('/search', async (req, res) => {
    const { matricule, status } = req.query;
    const query = {};

    if (matricule) {
        query.MATRIC = parseInt(matricule, 10);  // Convertir le paramètre matricule en Number
    }
    if (status) {
        query.Status = status;
    }

    try {
        const employees = await PersonnelVisit.find(query);
        res.json(employees);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur lors de la recherche des employés' });
    }
});

// Route to update employee status
router.put('/updateStatus/:id', async (req, res) => {
    try {
        const { status, visitId } = req.body;
        const employee = await PersonnelVisit.findById(req.params.id);

        if (!employee) {
            return res.status(404).json({ message: 'Employé non trouvé' });
        }

        employee.Status = status;

        // If the status is "present" and a visitId is provided, update the visit date
        if (status.toLowerCase() === 'p' && visitId) {
            const visit = await Visit.findById(visitId);
            if (!visit) {
                return res.status(404).json({ message: 'Visite non trouvée' });
            }

            const updatedDateVisite = employee.DateVisite ? [...employee.DateVisite, visit.visitDate] : [visit.visitDate];
            employee.DateVisite = updatedDateVisite;
        }

        await employee.save();
        res.json(employee);
    } catch (error) {
        console.error('Error updating employee status:', error);
        res.status(500).json({ message: 'Erreur serveur lors de la mise à jour du statut de l\'employé' });
    }
});



// Route to update employee visit date
router.put('/updateDateVisite/:id', async (req, res) => {
    try {
        const { dateVisite } = req.body;
        const employee = await PersonnelVisit.findById(req.params.id);

        if (!employee) {
            return res.status(404).json({ message: 'Employé non trouvé' });
        }

        const updatedDateVisite = employee.DateVisite ? [...employee.DateVisite, dateVisite] : [dateVisite];
        employee.DateVisite = updatedDateVisite;

        await employee.save();
        res.json(employee);
    } catch (error) {
        console.error('Error updating visit date:', error);
        res.status(500).json({ message: 'Erreur serveur lors de la mise à jour de la date de visite' });
    }
});

// Route to remove visit date from employee
router.put('/removeDateVisite/:id', async (req, res) => {
    try {
        const employee = await PersonnelVisit.findById(req.params.id);

        if (!employee) {
            return res.status(404).json({ message: 'Employé non trouvé' });
        }

        employee.DateVisite = []; // Clear all dates
        await employee.save();

        res.json(employee);
    } catch (error) {
        console.error('Error removing visit date:', error);
        res.status(500).json({ message: 'Erreur serveur lors de la suppression de la date de visite' });
    }
});

export { router as PersonnelVisitRouter };
