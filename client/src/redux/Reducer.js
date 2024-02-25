import { SET_SEARCHED_RECIPES } from "./Action";

const initialState = {
  searchedRecipes: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCHED_RECIPES:
      return {
        ...state,
        searchedRecipes: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
