import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedTranslatedLanguage: "CA",
  selectedOriginalLanguage: "FR",
  selectedFile: "Filename.png",
};

export const languageSlice = createSlice({
  name: "languages",
  initialState,
  reducers: {
    setTranslatedLanguage: (state, action) => {
      state.selectedTranslatedLanguage = action.payload;
    },
    setOriginalLanguage: (state, action) => {
      state.selectedOriginalLanguage = action.payload;
    },
    setSelectedFile: (state, action) => {
      state.selectedFile = action.payload;
    },
  },
});

export const { setTranslatedLanguage, setOriginalLanguage, setSelectedFile } =
  languageSlice.actions;
export const selectLanguage = (state) => state.languages;
export default languageSlice.reducer;
