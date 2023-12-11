// actions.js
export const updateParameterTable = (fieldId, value) => ({
    type: 'UPDATE_INPUT_1',
    payload: { fieldId, value },
});


// export const updateParameterTableState = (fieldId, value) => ({
//     type: 'UPDATE_INPUT_2',
//     payload: { fieldId, value },
// });
export const resetParameter = () => ({
    type: "RESET_PARAMETER",
  });
// reducers.js
const initialState = {tableP:{}};

export const ParameterReducersave = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_INPUT_1':
            return {
                ...state,
                tableP: {
                    ...state.tableP,
                    [action.payload.fieldId]: action.payload.value
                  },
                
            };
            case "RESET_PARAMETER":
                return {
                  ...state,
                  tableP: {}, // Reset table1 to its initial or empty value
                };
        default:
            return state;
    }
};