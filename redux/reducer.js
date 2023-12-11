import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { DescriptionReducersave } from "./slices/descriptionReducer";
import ProjectReducer from "./slices/projectReducerGet";
import { ProjectReducersave } from "./slices/projectReducerSave";
import { ParameterReducersave } from "./slices/parameterReducerSave";
import { SignalReducersave } from "./slices/signalReducer";
import { AlarmPropsReducersave } from "./slices/alarmpropsReducer";
import { LogicReducersave } from "./slices/logicReducer";
import {ActionStepReducersave} from "./slices/actionStepReducer";
import recipeReducer from "./slices/recipeReducerget";

const mainReducer = combineReducers({
  project: ProjectReducer,
  projectsave: ProjectReducersave,
  descriptionsave: DescriptionReducersave,
  parametersave: ParameterReducersave,
  signalsave: SignalReducersave,
  alarmprops: AlarmPropsReducersave,
  logicsave: LogicReducersave,
  actionstep:ActionStepReducersave,
  recipe:recipeReducer
});

const store = configureStore({
  reducer: mainReducer,
  middleware: [thunk],
});

export default store;
