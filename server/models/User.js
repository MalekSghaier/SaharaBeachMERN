import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    matricule: { type: Number, required: true, unique: true },  
    birthDate: { type: Date, required: true },
    service: { type: String, required: true },
    password: { type: String, required: true }
});

const UserModel = mongoose.model("User", UserSchema);

export { UserModel as User };
