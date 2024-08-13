// models/BacterialAnalysis.js
import mongoose from 'mongoose';

const bacterialAnalysisSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    typeEchantillon: { type: String, enum: ['Alimentaire', 'eau', 'Légionnelles'], default: 'Alimentaire' },
    alimentaire: { type: [String], default: Array(5).fill('') },
    surfaces: { type: [String], default: Array(2).fill('') },
    empreintesMains: { type: [String], default: Array(3).fill('') },
    eau: { type: [String], default: [] },
    legionnelles: { type: [String], default: [] },
});

const BacterialAnalysis = mongoose.model('BacterialAnalysis', bacterialAnalysisSchema);

export default BacterialAnalysis;
