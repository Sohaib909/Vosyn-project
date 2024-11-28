import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showStatusNotification: false,
  message: "",
  severity: "success",
  timeout: 2000,
};

const statusNotificationSlice = createSlice({
  name: "statusNotification",
  initialState,
  reducers: {
    // Set notification
    setStatusNotification: (state, action) => {
      state.showStatusNotification = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity;
      state.timeout = action.payload.timeout;
    },
    // Hide notification
    hideStatusNotification: (state) => {
      state.showStatusNotification = false;
      state.message = "";
      state.severity = "success";
    },
  },
});

export const { setStatusNotification, hideStatusNotification } =
  statusNotificationSlice.actions;
export const selectStatusNotification = (state) => state.statusNotification;
export default statusNotificationSlice.reducer;
