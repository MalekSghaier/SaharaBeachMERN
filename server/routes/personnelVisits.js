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
    const { matricule, visitDate } = req.query;
    const query = {};

    if (matricule) {
        query.MATRIC = parseInt(matricule, 10);  // Convertir le paramètre matricule en Number
    }
    if (visitDate) {
        query.DateVisite = { $elemMatch: { $eq: new Date(visitDate) } };
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
        const { status, visitDate } = req.body;
        const employee = await PersonnelVisit.findById(req.params.id);

        if (!employee) {
            return res.status(404).json({ message: 'Employé non trouvé' });
        }

        if (status === 'P' && visitDate) {
            const date = new Date(visitDate);
            const dateExists = employee.DateVisite.some(d => d.getTime() === date.getTime());

            if (!dateExists) {
                employee.DateVisite.push(date);
            }
        }

        employee.Status = 'A';
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

        const date = new Date(dateVisite);
        const dateExists = employee.DateVisite.some(d => d.getTime() === date.getTime());

        if (!dateExists) {
            employee.DateVisite.push(date);
        }

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
        const employee = await PersonnelCopro.findById(req.params.id);

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

// Route pour rechercher des employés selon une date de visite
router.get('/searchByDate', async (req, res) => {
    try {
        const { date } = req.query;
        if (!date) {
            return res.status(400).send({ message: 'Date de visite manquante' });
        }

        const visitDate = new Date(date);
        const employees = await PersonnelVisit.find({ DateVisite: visitDate });

        res.status(200).send(employees);
    } catch (error) {
        console.error('Error searching employees by date:', error);
        res.status(500).send({ message: 'Erreur lors de la recherche des employés' });
    }
});


// Route pour rechercher des employés n'ayant pas une date de visite spécifique
router.get('/searchWithoutDate', async (req, res) => {
    try {
        const { date } = req.query;
        if (!date) {
            return res.status(400).send({ message: 'Date de visite manquante' });
        }

        const visitDate = new Date(date);
        const employees = await PersonnelVisit.find({ DateVisite: { $ne: visitDate } });

        res.status(200).send(employees);
    } catch (error) {
        console.error('Error searching employees without date:', error);
        res.status(500).send({ message: 'Erreur lors de la recherche des employés' });
    }
});

export { router as PersonnelVisitRouter };
