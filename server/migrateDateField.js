import mongoose from "mongoose";
import { PersonnelVisit } from './models/PersonnelVisit.js'; // Ajustez le chemin selon votre structure de projet

async function migrateDateField() {
  try {
    await mongoose.connect('mongodb://localhost:27017/SaharaBeach', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const visits = await PersonnelVisit.find({});

    for (let visit of visits) {
      if (typeof visit.DateVisite === 'string') {
        // Convertir la chaîne de caractères en tableau de dates
        const dateArray = [new Date(visit.DateVisite)];

        // Mettre à jour le document avec le tableau de dates
        await PersonnelVisit.updateOne(
          { _id: visit._id },
          { $set: { DateVisite: dateArray } }
        );

        console.log(`Document with ID ${visit._id} updated successfully.`);
      }
    }

    console.log("Data migration completed.");
    mongoose.disconnect();
  } catch (error) {
    console.error("Error during data migration:", error);
    mongoose.disconnect();
  }
}

migrateDateField();
