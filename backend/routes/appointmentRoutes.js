// PRACTICAL 8 & 10: Express Router + REST API for Appointments (protected routes)

const express = require("express");
const router = express.Router();
const {
  createAppointment,
  getMyAppointments,
  getAllAppointments,
  updateAppointment,
  deleteAppointment,
} = require("../controllers/appointmentController");
const protect = require("../middleware/auth");
const { validateAppointment } = require("../middleware/validate");

// All appointment routes require the user to be logged in (JWT protected)
router.post("/", protect, validateAppointment, createAppointment);
router.get("/my", protect, getMyAppointments);
router.get("/", protect, getAllAppointments);
router.put("/:id", protect, updateAppointment);
router.delete("/:id", protect, deleteAppointment);

module.exports = router;
