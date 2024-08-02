// models/TestCopro.js
import mongoose from 'mongoose';

const TestCoproSchema = new mongoose.Schema({
    testDate: { type: Date, required: true },
    description: { type: String, required: false }
});

const TestCopro = mongoose.model('TestCopro', TestCoproSchema);

export { TestCopro };
