const mongoose = require('mongoose');

const WorkshopSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  desc: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Workshop', WorkshopSchema);
