import { createAsyncThunk } from '@reduxjs/toolkit';


export const FETCH_PROJECT = 'FETCH_PROJECT';


export function fetchProjectSuccess(projectdata) {
  return {
    type: FETCH_PROJECT,
    payload: projectdata
  };
  
}

const initialState = {
    projectdata: []
  };

  function projectReducer(state = initialState, action) {
    switch (action.type) {
      case FETCH_PROJECT:
        return { ...state, projectdata: action.payload };
      default:
        return state;
    }
  }
  
  export default projectReducer;