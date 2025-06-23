const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  case: { type: mongoose.Schema.Types.ObjectId, ref: 'Case', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true }, // e.g., 'lab', 'image'
  path: { type: String, required: true },
  originalName: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('File', fileSchema);
