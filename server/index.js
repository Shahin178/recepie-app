const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();

const app = express();
const PORT = 8080;
const host = "localhost";

// Import your database connection code
require("./db");

// Use CORS middleware
app.use(cors());

// Use bodyParser middleware for parsing requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const userRoute = require("./routes/userRoutes");
const recipeRoute = require("./routes/recipeRoutes");
app.use(userRoute);
app.use(recipeRoute);

// Start the server
app.listen(PORT, () => console.log(`Listening at http://${host}:${PORT}`));
