import { createAsyncThunk } from '@reduxjs/toolkit';


export const FETCH_RECIPE = 'FETCH_RECIPE';
export const RESET_RECIPE = 'RESET_RECIPE';

export function fetchRecipeSuccess(projectdata) {
  return {
    type: FETCH_RECIPE,
    payload: projectdata
  };  
}


export const resetRecipe = () => ({
  type: "RESET_RECIPE",
});

const initialState = {
    projectdata: []
  };

  function recipeReducer(state = initialState, action) {
    switch (action.type) {
      case FETCH_RECIPE:
        return { ...state, projectdata: action.payload };
      case RESET_RECIPE:
        return {
          ...state,
          projectdata: [], // Reset table1 to its initial or empty value
        };  
      default:
        return state;
    }
  }
  
  export default recipeReducer;