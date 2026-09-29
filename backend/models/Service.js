// PRACTICAL 9: Mongoose Schema & Model definition for Salon Service

const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Service", serviceSchema);
