import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {PersonnelCopro} from './models/PersonnelCopro.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const parseDateString = (dateString) => {
  // Assume date format is "DD/MM/YYYY" and convert to "YYYY-MM-DD"
  const [day, month, year] = dateString.split('/');
  return new Date(`${year}-${month}-${day}`);
};

const updateDateVisiteField = async () => {
  try {
    const Copros = await PersonnelCopro.find({});
    for (const copro of Copros) {
      if (!Array.isArray(copro.DateVisite)) {
        if (typeof copro.DateVisite === 'string') {
          // Convert string date to array of Date objects
          copro.DateVisite = [parseDateString(copro.DateVisite)];
        } else {
          copro.DateVisite = [];
        }
        await copro.save();
      } else {
        // Convert all string dates in the array to Date objects
        copro.DateVisite = copro.DateVisite.map(date =>
          typeof date === 'string' ? parseDateString(date) : date
        );
        await copro.save();
      }
    }
    console.log('Migration completed');
  } catch (err) {
    console.error(err);
  }
};

const runMigration = async () => {
  await connectDB();
  await updateDateVisiteField();
  mongoose.connection.close();
};

runMigration();
