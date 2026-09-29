// PRACTICAL 9: Mongoose Schema & Model definition for Appointment
// Demonstrates references between collections (relationships in MongoDB)

const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    date: {
      type: String, // stored as YYYY-MM-DD for simplicity (beginner friendly)
      required: [true, "Appointment date is required"],
    },
    time: {
      type: String, // e.g. "10:30 AM"
      required: [true, "Appointment time is required"],
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
