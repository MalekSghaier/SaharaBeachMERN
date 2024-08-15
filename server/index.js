//index.js
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

import { UserRouter } from './routes/user.js';
import { LogoutRouter } from './routes/logout.js';
import { VisitRouter } from './routes/visits.js';
import { PersonnelVisitRouter } from './routes/personnelVisits.js';
import { TestCoproRouter } from './routes/testCopro.js';
import { PersonnelCoproRouter } from './routes/personnelCopro.js';
import { BacterialAnalysisRouter } from './routes/bacterialAnalysisRouter.js'; 
import {planActionRoutes} from './routes/planActionRoutes.js'; 



const app = express();
const PORT = process.env.PORT || 3000;

// Get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}


app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}));
app.use(cookieParser());

app.use('/auth', UserRouter);
app.use('/auth', LogoutRouter);
app.use('/api/visits', VisitRouter);
app.use('/api/personnelVisits', PersonnelVisitRouter);
app.use('/api/testCopro', TestCoproRouter);
app.use('/api/personnelCopro', PersonnelCoproRouter);
app.use('/api/bacterialAnalysis', BacterialAnalysisRouter);
app.use('/api/planactions', planActionRoutes); 


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