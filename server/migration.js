import mongoose from 'mongoose';
import dotenv from 'dotenv';
import PersonnelVisit from './models/PersonnelVisit.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
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
    const visits = await PersonnelVisit.find({});
    for (const visit of visits) {
      if (!Array.isArray(visit.DateVisite)) {
        if (typeof visit.DateVisite === 'string') {
          // Convert string date to array of Date objects
          visit.DateVisite = [parseDateString(visit.DateVisite)];
        } else {
          visit.DateVisite = [];
        }
        await visit.save();
      } else {
        // Convert all string dates in the array to Date objects
        visit.DateVisite = visit.DateVisite.map(date => 
          typeof date === 'string' ? parseDateString(date) : date
        );
        await visit.save();
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
