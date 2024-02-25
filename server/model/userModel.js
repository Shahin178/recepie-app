const mongoose = require("mongoose");

// Define the schema for users
const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5, // Corrected from min: 2
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", schema);
