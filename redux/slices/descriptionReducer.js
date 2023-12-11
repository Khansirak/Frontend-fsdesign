// actions.js
export const updateDescription = ( value) => ({
    type: 'UPDATE_Descriptin',
    payload: value 
});


// reducers.js
const initialState = {};

export const DescriptionReducersave = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_Descriptin':
            return action.payload;
        default:
            return state;
    }
}