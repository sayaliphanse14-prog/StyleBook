// PRACTICAL 6, 7 & 8: Node.js + Express server setup
// Demonstrates: npm packages, Express app, middleware, REST API routing

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config(); // load environment variables from .env

connectDB(); // connect to MongoDB (Practical 9)

const app = express();

// ---------- MIDDLEWARE ----------
app.use(cors()); // allow frontend (React) to call this backend
app.use(express.json()); // parse incoming JSON request bodies

// simple custom logging middleware (demonstrates Express middleware concept)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toLocaleTimeString()}`);
  next();
});

// ---------- ROUTES ----------
app.get("/", (req, res) => {
  res.send("StyleBook Salon API is running...");
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/services", require("./routes/serviceRoutes"));
app.use("/api/appointments", require("./routes/appointmentRoutes"));

// ---------- 404 HANDLER ----------
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ---------- GLOBAL ERROR HANDLER ----------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`StyleBook backend server running on http://localhost:${PORT}`);
});
