import dashObjectSlice from "@/reduxSlices/dashObjectSlice";
import languageSlice from "@/reduxSlices/languageSlice";
import playerSlice from "@/reduxSlices/playerSlice";
import recordingSlice from "@/reduxSlices/recordingSlice";
import statusNotificationSlice from "@/reduxSlices/statusNotificationSlice";
import userSlice from "@/reduxSlices/userSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import textObjectSlice from "./reduxSlices/textObjectSlice";

const combineReducer = combineReducers({
  statusNotification: statusNotificationSlice,
  user: userSlice,
  textObject: textObjectSlice,
  player: playerSlice,
  dashObject: dashObjectSlice,
  languages: languageSlice,
  recorder: recordingSlice,
});

const rootReducer = (state, action) => {
  return combineReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
