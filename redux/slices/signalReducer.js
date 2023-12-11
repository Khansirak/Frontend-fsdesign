// actions.js
export const updateSignalTable = (fieldId, value) => ({
    type: 'UPDATE_INPUT_1',
    payload: { fieldId, value },
});
export const resetSignals = () => ({
    type: "RESET_SIGNAL",
  });
// reducers.js
const initialState = {table1:{}};

export const SignalReducersave = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_INPUT_1':
            return {
                ...state,
                table1: {
                    ...state.table1,
                    [action.payload.fieldId]: action.payload.value
                  },
                
            };
            case "RESET_SIGNAL":
                return {
                  ...state,
                  table1: {}, // Reset table1 to its initial or empty value
                };
        default:
            return state;
    }
};