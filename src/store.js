import statusNotificationSlice from "@/reduxSlices/statusNotificationSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const combineReducer = combineReducers({
  statusNotification: statusNotificationSlice,
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
