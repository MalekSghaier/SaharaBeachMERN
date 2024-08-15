import express from 'express';
import multer from 'multer';
import { PlanAction } from '../models/PlanAction.js';

const router = express.Router();

// Configurer multer pour les uploads de fichiers
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage });

// Route pour ajouter un nouveau plan d'action
router.post('/add', upload.single('pieceJointe'), async (req, res) => {
    try {
        const newPlanAction = new PlanAction({
            numeroPlan: req.body.numeroPlan,
            date: req.body.date,
            designation: req.body.designation,
            source: req.body.source,
            processus: 'restauration',
            site: 'Saharabeach',
            pieceJointe: req.file ? req.file.path : null, // Assurez-vous d'utiliser le nom correct
        });

        await newPlanAction.save();
        res.status(201).json({ message: 'Plan d\'action ajouté avec succès' });
    } catch (error) {
        console.error('Erreur lors de l\'ajout du plan d\'action:', error);
        res.status(500).json({ error: 'Erreur lors de l\'ajout du plan d\'action' });
    }
});

export { router as planActionRoutes };
