// actions.js
export const updateActionStepTable = (fieldId, value) => ({
  type: "UPDATE_INPUT_1",
  payload: { fieldId, value },
});

export const resetTable = () => ({
  type: "RESET_TABLE",
});

// actions.js
export const updateActionStepIdTable = (value) => ({
  type: "UPDATE_INPUT_2",
  payload: { value },
});
// reducers.js
const initialState = { id: "", table: {} };

export const ActionStepReducersave = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_INPUT_1":
      return {
        ...state,
        table: {
          ...state.table,
          [action.payload.fieldId]: action.payload.value,
        },
      };
    case "UPDATE_INPUT_2":
      return {
        ...state,
        id: action.payload.value,
      };
    case "RESET_TABLE":
      return { ...state, table: {} }; // Reset the 'table' to an empty object

    default:
      return state;
  }
};
