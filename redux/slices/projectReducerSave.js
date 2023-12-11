// actions.js
export const updateInput = (fieldId, value) => ({
    type: 'UPDATE_INPUT',
    payload: { fieldId, value },
});


// reducers.js
const initialState = {};

export const ProjectReducersave = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_INPUT':
            return {
                ...state,
                [action.payload.fieldId]: action.payload.value,
            };
        default:
            return state;
    }
};