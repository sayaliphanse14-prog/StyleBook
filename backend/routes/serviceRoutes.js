// PRACTICAL 8: Express Router + REST API endpoints for Services (CRUD)

const express = require("express");
const router = express.Router();
const {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} = require("../controllers/serviceController");

router.get("/", getServices);           // READ all
router.get("/:id", getServiceById);     // READ one
router.post("/", createService);        // CREATE
router.put("/:id", updateService);      // UPDATE
router.delete("/:id", deleteService);   // DELETE

module.exports = router;
