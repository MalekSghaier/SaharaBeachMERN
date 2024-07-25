// models/Visit.js
import mongoose from 'mongoose';

const VisitSchema = new mongoose.Schema({
    visitDate: { type: Date, required: true },
    description: { type: String, required: true },

});

const VisitModel = mongoose.model('Visit', VisitSchema);

export { VisitModel as Visit };
