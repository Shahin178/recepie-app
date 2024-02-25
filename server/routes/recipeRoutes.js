const express = require("express");
const { VerifyToken } = require("../middleware/jsonAuth");
const router = express.Router();
const {
  RecipeSave,
  GetAllRecipes,
} = require("../controllers/recipeController");

router.get("/save", GetAllRecipes);
router.post("/recipe", RecipeSave);

module.exports = router;
