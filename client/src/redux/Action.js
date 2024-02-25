export const SET_SEARCHED_RECIPES = "SET_SEARCHED_RECIPES";

export const setSearchedRecipes = (recipes) => ({
  type: SET_SEARCHED_RECIPES,
  payload: recipes,
});
