import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSnackBar: false,
  message: "",
  type: "green",
};

/** This displays an error message when something unintended occurs
 * @param {bool} showShackBar
 * @param {string} type - Color of the div background
 */
const snackbarSlice = createSlice({
  name: "showToast",
  initialState,
  reducers: {
    setToast: (state, action) => {
      state.showSnackBar = action.payload.showSnackBar;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
  },
});

export const { setToast } = snackbarSlice.actions;

export default snackbarSlice.reducer;
