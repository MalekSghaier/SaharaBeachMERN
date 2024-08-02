import express from 'express';
import { PersonnelCopro } from '../models/PersonnelCopro.js';
const router = express.Router();

router.get('/all', async (req, res) => {
    try {
        const employees = await PersonnelCopro.find({});
        res.json(employees);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur lors de la récupération des employés' });
    }
});

router.get('/search', async (req, res) => {
    const { matricule, testDate } = req.query;
    const query = {};

    if (matricule) {
        query.MATRIC = parseInt(matricule, 10);  // Convertir le paramètre matricule en Number
    }
    if (testDate) {
        query.DateVisite = { $elemMatch: { $eq: new Date(testDate) } };
    }

    try {
        const employees = await PersonnelCopro.find(query);
        res.json(employees);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur lors de la recherche des employés' });
    }
});


// Route to update employee status
router.put('/updateStatus/:id', async (req, res) => {
    try {
        const { status, testDate } = req.body;
        const employee = await PersonnelCopro.findById(req.params.id);

        if (!employee) {
            return res.status(404).json({ message: 'Employé non trouvé' });
        }

        if (status === 'P' && testDate) {
            const date = new Date(testDate);
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
        const { testVisite } = req.body;
        const employee = await PersonnelCopro.findById(req.params.id);

        if (!employee) {
            return res.status(404).json({ message: 'Employé non trouvé' });
        }

        const date = new Date(testVisite);
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

        const testDate = new Date(date);
        const employees = await PersonnelCopro.find({ DateVisite: testDate });

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

        const testDate = new Date(date);
        const employees = await PersonnelCopro.find({ DateVisite: { $ne: testDate } });

        res.status(200).send(employees);
    } catch (error) {
        console.error('Error searching employees without date:', error);
        res.status(500).send({ message: 'Erreur lors de la recherche des employés' });
    }
});

export { router as PersonnelCoproRouter };
