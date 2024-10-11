import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showStatusNotification: false,
  message: "",
  severity: "success",
};

const statusNotificationSlice = createSlice({
  name: "statusNotification",
  initialState,
  reducers: {
    setStatusNotification: (state, action) => {
      (state.showStatusNotification = action.payload.showStatusNotification),
        (state.message = action.payload.message),
        (state.severity = action.payload.severity);
    },
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
