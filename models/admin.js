const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  aname: { type: String, required: true },
  pass: { type: String, required: true }
});

module.exports = mongoose.model('Admin', adminSchema);
