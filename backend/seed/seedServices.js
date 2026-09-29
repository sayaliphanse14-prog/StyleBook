// Helper script to insert the initial 8 salon services into MongoDB
// Run once with: node seed/seedServices.js

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Service = require("../models/Service");

dotenv.config();

const services = [
  { name: "Haircut", price: 300, description: "Professional haircut styling" },
  { name: "Hair Styling", price: 500, description: "Creative hair styling for any occasion" },
  { name: "Hair Spa", price: 800, description: "Relaxing hair spa treatment" },
  { name: "Facial", price: 700, description: "Skin-refreshing facial treatment" },
  { name: "Manicure", price: 400, description: "Nail and hand care" },
  { name: "Pedicure", price: 500, description: "Foot and nail care" },
  { name: "Bridal Makeup", price: 5000, description: "Complete bridal makeup package" },
  { name: "Hair Coloring", price: 1500, description: "Professional hair coloring" },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for seeding...");

    await Service.deleteMany(); // clear existing services
    await Service.insertMany(services); // insert fresh data

    console.log("Services seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding data:", error.message);
    process.exit(1);
  }
};

seedDB();
