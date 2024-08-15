import mongoose from 'mongoose';

const PlanActionSchema = new mongoose.Schema({
    numeroPlan: { type: Number, required: true, unique: true },
    date: { type: Date, default: Date.now, required: true },
    designation: { type: String, required: true },
    source: { type: String, required: true, enum: ['accomodation', 'autocontrôle'] },
    processus: { type: String, required: true, default: 'restauration' },
    site: { type: String, required: true, default: 'Saharabeach' },
    pieceJointe: { type: String, required: false }
}, { collection: 'planactions' });

const PlanAction = mongoose.model('PlanAction', PlanActionSchema);

export { PlanAction };
