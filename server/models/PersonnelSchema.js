// Importez le modèle personnel
import mongoose from "mongoose";

const PersonnelSchema = new mongoose.Schema({
    MATRIC: { type: Number, required: true, unique: true },
    NOMPRE: { type: String, required: true },
    DATNAI: { type: Date, required: true },
    DEPDES: { type: String, required: true },
    FHF: { type: String, required: true }
});

const PersonnelModel = mongoose.model("Personnel", PersonnelSchema);

export { PersonnelModel as Personnel };
