import authSlice from "@/reduxSlices/authSlice";
import statusNotificationSlice from "@/reduxSlices/statusNotificationSlice";
import userSlice from "@/reduxSlices/userSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import textObjectSlice from "./reduxSlices/textObjectSlice";

const combineReducer = combineReducers({
  statusNotification: statusNotificationSlice,
  user: userSlice,
  auth: authSlice,
  textObject: textObjectSlice,
});

const rootReducer = (state, action) => {
  if (action.type === "auth/logout") {
    state = undefined;
  }

  return combineReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
