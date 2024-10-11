import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showStatusNotification: false,
  message: "",
  severity: "success",
};

const statusNotificationSlice = createSlice({
  name: "showStatusNotification",
  initialState,
  reducers: {
    setStatusNotification: (state, action) => {
      (state.showStatusNotification = action.payload.showStatusNotification),
        (state.message = action.payload.message),
        (state.severity = action.payload.severity);
    },
  },
});

export const { setStatusNotification } = statusNotificationSlice.actions;
export default statusNotificationSlice.reducer;
