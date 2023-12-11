// actions.js
export const updateLogic = (fieldId, value) => ({
    type: 'UPDATE_INPUT_1',
    payload: { fieldId, value },
});


// reducers.js
const initialState = {table1:{}};

export const LogicReducersave = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_INPUT_1':
            return {
                ...state,
                table1: {
                    ...state.table1,
                    [action.payload.fieldId]: action.payload.value
                  },
                
            };
        default:
            return state;
    }
};