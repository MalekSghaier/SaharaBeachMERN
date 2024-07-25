import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
dotenv.config();
import { UserRouter } from './routes/user.js';
import { VisitRouter } from './routes/visits.js';  // Importation de VisitRouter


const app = express();

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}));
app.use(cookieParser());
app.use('/auth', UserRouter);
app.use('/api/visits', VisitRouter);  // Utilisation de VisitRouter
app.use('/api/personnels', UserRouter);  // Utilisation de PersonnelRouter

mongoose.connect('mongodb://127.0.0.1:27017/SaharaBeach')
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB", err);
    });

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
