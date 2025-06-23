const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    patientId: { type: String, required: true },
    summary: { type: String, required: true },
    files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }],
}, { timestamps: true });

module.exports = mongoose.model('Case', caseSchema);
