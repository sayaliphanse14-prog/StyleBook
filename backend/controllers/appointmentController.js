// PRACTICAL 8 & 9: REST API + CRUD for Appointments + Mongoose population (joins)

const Appointment = require("../models/Appointment");

// @route  POST /api/appointments   - CREATE (book an appointment)
const createAppointment = async (req, res) => {
  try {
    const { service, date, time } = req.body;

    const appointment = await Appointment.create({
      user: req.user.id, // comes from the auth middleware (logged in user)
      service,
      date,
      time,
    });

    res.status(201).json({ success: true, data: appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route  GET /api/appointments/my   - READ appointments of logged-in user
const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user.id })
      .populate("service", "name price") // join with Service collection
      .sort({ date: 1 });

    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route  GET /api/appointments   - READ all (admin/demo view)
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("user", "name email")
      .populate("service", "name price")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route  PUT /api/appointments/:id   - UPDATE (reschedule / change status)
const updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    // only the owner of the appointment can update it
    if (appointment.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    const updated = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route  DELETE /api/appointments/:id   - DELETE (cancel)
const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    if (appointment.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    await Appointment.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Appointment cancelled" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createAppointment,
  getMyAppointments,
  getAllAppointments,
  updateAppointment,
  deleteAppointment,
};
