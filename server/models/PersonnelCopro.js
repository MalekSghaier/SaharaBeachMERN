import mongoose from 'mongoose';

const PersonnelCoproSchema = new mongoose.Schema({
  MATRIC: { type: Number, required: true },
  NOMPRE: { type: String, required: true },
  DEPDES: { type: String, required: true },
  FHF: { type: String, required: true }, // Assuming FHF is gender, 'F' or 'H'
  DateVisite: { type: [Date] }, // Define as an array of Date objects
  Status: { type: String, required: true }
},{ collection: 'personnelcopros' });

const PersonnelCopro = mongoose.model('PersonnelCopro', PersonnelCoproSchema);

export { PersonnelCopro }; 
