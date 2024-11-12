import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mediaObj: {},
};

const dashObjectSlice = createSlice({
  name: "dashObject",
  initialState,
  reducers: {
    setDashObject: (state, action) => {
      state.mediaObj = action.payload;
    },
  },
});

export const { setDashObject } = dashObjectSlice.actions;
export const selectDashObject = (state) => state.dashObject;
export default dashObjectSlice.reducer;
