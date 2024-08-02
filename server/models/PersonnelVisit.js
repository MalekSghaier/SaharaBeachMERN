import mongoose from 'mongoose';

const PersonnelVisitSchema = new mongoose.Schema({
    MATRIC: { type: Number, required: true },  // Changer de String à Number
    NOMPRE: { type: String, required: true },
    DEPDES: { type: String, required: true },
    FHF: { type: String, required: true },
    DateVisite: { type: [Date], required: true },
    Status: { type: String, required: true }
}, { collection: 'personnelvisits' });

const PersonnelVisit = mongoose.model('PersonnelVisit', PersonnelVisitSchema);

export { PersonnelVisit };
