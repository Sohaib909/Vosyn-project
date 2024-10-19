import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userProfile: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userProfile = action.payload;
    },
    setOnboardingCompleted: (state, action) => {
      state.userProfile = {
        ...state.userProfile,
        has_finished_onboarding: action.payload,
      };
    },
  },
});

export const { setUserInfo, setOnboardingCompleted } = userSlice.actions;
export const selectUser = (state) => state.user;
export default userSlice.reducer;
