// PRACTICAL 8: Server-side validation middleware (Express middleware concept)

const validateRegister = (req, res, next) => {
  const { name, email, password, phone } = req.body;
  const errors = [];

  if (!name || name.trim() === "") errors.push("Name is required");

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailPattern.test(email)) errors.push("Valid email is required");

  if (!password || password.length < 6)
    errors.push("Password must be at least 6 characters");

  const phonePattern = /^[0-9]{10}$/;
  if (!phone || !phonePattern.test(phone))
    errors.push("Phone number must be exactly 10 digits");

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  next(); // pass control to the next middleware/controller
};

const validateAppointment = (req, res, next) => {
  const { service, date, time } = req.body;
  const errors = [];

  if (!service) errors.push("Service is required");
  if (!date) errors.push("Date is required");
  if (!time) errors.push("Time is required");

  // date must not be in the past
  if (date) {
    const today = new Date().toISOString().split("T")[0];
    if (date < today) errors.push("Date cannot be in the past");
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  next();
};

module.exports = { validateRegister, validateAppointment };
