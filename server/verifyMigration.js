import mongoose from "mongoose";
import { PersonnelVisit } from './models/PersonnelVisit.js'; // Ajustez le chemin selon votre structure de projet

async function verifyMigration() {
  try {
    await mongoose.connect('mongodb://localhost:27017/SaharaBeach');

    const visits = await PersonnelVisit.find({});

    for (let visit of visits) {
      console.log(`ID: ${visit._id}, DateVisite: ${visit.DateVisite}`);
    }

    mongoose.disconnect();
  } catch (error) {
    console.error("Error during verification:", error);
    mongoose.disconnect();
  }
}

verifyMigration();
