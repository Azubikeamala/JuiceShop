const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  studentid: { type: String, required: true },
  studentname: { type: String, required: true },
  mjuice: { type: Number, required: true },
  bjuice: { type: Number, required: true },
  ajuice: { type: Number, required: true },
  subtotal: { type: Number, required: true },
  tax: { type: Number, required: true },
  total: { type: Number, required: true }
});

module.exports = mongoose.model('Order', orderSchema);


