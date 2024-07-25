import mongoose from "mongoose";

const PersonnelVisitSchema = new mongoose.Schema({
    matricule: { type: Number, required: true},
    nom: { type: String, required: true },
    service: { type: String, required: true },
    dateNaissance: { type: Date, required: true },
    genre: { type: String, required: true },
    dateVisite: { type: Date, required: false }, 
    status: { type: String, required: true } 
});

const PersonnelVisitModel = mongoose.model("PersonnelVisit", PersonnelVisitSchema);

export { PersonnelVisitModel as PersonnelVisit };
