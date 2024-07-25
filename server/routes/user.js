import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { Personnel } from '../models/PersonnelSchema.js';

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
    const { fullName, matricule, birthDate, service, password } = req.body;
    try {
        const user = await User.findOne({ matricule });
        if (user) {
            return res.json({ message: "Un utilisateur avec ce matricule existe déjà !" });
        }

        const hashpassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            fullName,
            matricule,
            birthDate,
            service,
            password: hashpassword,
        });

        await newUser.save();
        return res.json({ status: true, message: "Inscription réussie" });
    } catch (err) {
        res.status(500).json({ status: false, message: 'Erreur serveur lors de l\'inscription' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { matricule, password } = req.body;

    try {
        const user = await User.findOne({ matricule });
        if (!user) {
            return res.json({ status: false, message: 'Utilisateur non trouvé' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ status: false, message: 'Mot de passe incorrect' });
        }

        const token = jwt.sign({ id: user._id }, 'your_jwt_secret');
        res.cookie('token', token, { httpOnly: true });

        res.json({
            status: true,
            message: 'Connexion réussie',
            user: {
                service: user.service
            }
        });
    } catch (err) {
        res.status(500).json({ status: false, message: 'Erreur serveur lors de la connexion' });
    }
});

// Get user info route
router.get('/user', async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.json({ status: false, message: 'Non connecté' });
        }

        const decoded = jwt.verify(token, 'your_jwt_secret');
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.json({ status: false, message: 'Utilisateur non trouvé' });
        }

        res.json({ status: true, user });
    } catch (err) {
        res.status(500).json({ status: false, message: 'Erreur serveur lors de la récupération des informations utilisateur' });
    }
});

// Get employees route with filters
router.get('/employees', async (req, res) => {
    const { sexe, service, nom, matricule, offset = 0, limit = 10 } = req.query;
    let filter = {};

    // Debugging logs
    console.log('Received query:', req.query);

    if (sexe) {
        if (sexe.toLowerCase() === 'homme') {
            filter.FHF = 'H';
        } else if (sexe.toLowerCase() === 'femme') {
            filter.FHF = 'F';
        }
    }
    if (service) {
        filter.DEPDES = new RegExp(`^${service}$`, 'i'); // Case-insensitive search for service
    }
    if (nom) {
        filter.NOMPRE = new RegExp(nom, 'i'); // Case-insensitive search for name
    }
    if (matricule) {
        // Ensure matricule is treated as a number for exact match
        const matriculeNumber = parseInt(matricule, 10);
        if (!isNaN(matriculeNumber)) {
            filter.MATRIC = matriculeNumber;
        } else {
            console.log('Matricule is not a number:', matricule);
            return res.status(400).json({ status: false, message: 'Matricule doit être un nombre' });
        }
    }

    try {
        const employees = await Personnel.find(filter)
            .skip(parseInt(offset, 10))
            .limit(parseInt(limit, 10));
        const totalEmployees = await Personnel.countDocuments(filter);

        res.json({ employees, total: totalEmployees });
    } catch (err) {
        console.error('Error retrieving employees:', err);
        res.status(500).json({ message: 'Erreur serveur lors de la récupération des employés' });
    }
});


// Add employee route
router.post('/add-employee', async (req, res) => {
    const { matricule, nom, prenom, birthDate, service, sexe } = req.body;

    if (!matricule || !nom || !prenom || !birthDate || !service || !sexe) {
        return res.status(400).json({ status: false, message: 'Tous les champs sont requis' });
    }

    const matriculeNumber = Number(matricule);
    if (isNaN(matriculeNumber)) {
        return res.status(400).json({ status: false, message: 'Matricule doit être un nombre' });
    }

    try {
        const newEmployee = new Personnel({
            MATRIC: matriculeNumber,
            NOMPRE: `${nom} ${prenom}`,
            DATNAI: new Date(birthDate),
            DEPDES: service,
            FHF: sexe
        });

        await newEmployee.save();
        res.json({ status: true, message: 'Employé ajouté avec succès' });
    } catch (err) {
        console.error('Erreur lors de l\'ajout de l\'employé:', err);
        res.status(500).json({ status: false, message: 'Erreur serveur lors de l\'ajout de l\'employé' });
    }
});

// Delete employee route
router.delete('/delete-employee/:matricule', async (req, res) => {
    const { matricule } = req.params;

    try {
        const result = await Personnel.deleteOne({ MATRIC: parseInt(matricule, 10) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ status: false, message: 'Employé non trouvé' });
        }

        res.json({ status: true, message: 'Employé supprimé avec succès' });
    } catch (err) {
        res.status(500).json({ status: false, message: 'Erreur serveur lors de la suppression de l\'employé' });
    }
});

// Get all personnel
router.get('/', async (req, res) => {
    try {
        const personnels = await Personnel.find({});
        res.json(personnels);
    } catch (err) {
        res.status(500).json({ status: false, message: 'Erreur serveur lors de la récupération des personnels' });
    }
});


export { router as UserRouter };
