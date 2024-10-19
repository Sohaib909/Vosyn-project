import authSlice from "@/reduxSlices/authSlice";
import statusNotificationSlice from "@/reduxSlices/statusNotificationSlice";
import userSlice from "@/reduxSlices/userSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const combineReducer = combineReducers({
  statusNotification: statusNotificationSlice,
  user: userSlice,
  auth: authSlice,
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
