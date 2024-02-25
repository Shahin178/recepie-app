const mongoose = require("mongoose");

// Define the schema for users
const schema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("recipe", schema);
