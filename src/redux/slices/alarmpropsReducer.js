// actions.js
export const updateAlarmPropsTable = (fieldId, value) => ({
  type: "UPDATE_INPUT_1",
  payload: { fieldId, value },
});

export const resetAlarmProps = () => ({
  type: "RESET_ALARM_PROPS",
});

// reducers.js
const initialState = { table: {} };

export const AlarmPropsReducersave = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_INPUT_1":
      return {
        ...state,
        table: {
          ...state.table,
          [action.payload.fieldId]: action.payload.value,
        },
      };
      case "RESET_ALARM_PROPS":
        return {
          ...state,
          table: {}, // Reset table1 to its initial or empty value
        };
    default:
      return state;
  }
};
