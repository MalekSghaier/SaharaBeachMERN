// models/Visit.js
import mongoose from 'mongoose';

const VisitSchema = new mongoose.Schema({
    visitDate: { type: Date, required: true },
    description: { type: String, required: false }

});

const VisitModel = mongoose.model('Visit', VisitSchema);

export { VisitModel as Visit };
