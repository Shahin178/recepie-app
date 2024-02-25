const { mongo } = require("mongoose");
const recipeModel = require("../model/recipeModel");

const RecipeSave = async (req, res) => {
  try {
    console.log(req.body);
    const { id, title, image } = req.body;

    // Create a new recipe instance
    const newRecipe = new recipeModel({
      id,
      title,
      image,
    });

    // Save the new recipe to the database
    await newRecipe.save();

    res.status(200).json({
      message: "Recipe saved successfully",
      recipe: newRecipe,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error saving recipe",
    });
  }
};

const GetAllRecipes = async (req, res) => {
  try {
    const recipes = await recipeModel.find();
    res.status(200).json({
      message: "Recipes fetched successfully",
      recipes: recipes,
    });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({
      message: "Error fetching recipes",
    });
  }
};

module.exports = {
  RecipeSave,
  GetAllRecipes,
};
