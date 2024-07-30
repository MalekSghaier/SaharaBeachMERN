import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
dotenv.config();
import { UserRouter } from './routes/user.js';
import { VisitRouter } from './routes/visits.js';
import { PersonnelVisitRouter } from './routes/personnelVisits.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}));
app.use(cookieParser());
app.use('/auth', UserRouter);
app.use('/api/visits', VisitRouter);
app.use('/api/personnelVisits', PersonnelVisitRouter);

mongoose.connect('mongodb://127.0.0.1:27017/SaharaBeach')
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB", err);
    });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
