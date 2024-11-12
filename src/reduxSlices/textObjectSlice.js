import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  textUrlPdf: "",
  textUrlWord: "",

  //when we will get the api end point
  // title: "",
  // id: 1,
  // description: "",
};

const textObjectSlice = createSlice({
  name: "textObject",
  initialState,
  reducers: {
    setTextObject: (state, action) => {
      return {
        ...state,
        textUrlPdf: action.payload.textUrlPdf,
        textUrlWord: action.payload.textUrlWord,
        //when we will get the api end point

        // title: action.payload.title,
        // id: action.payload.id,
        // description: action.payload.description,
      };
    },
  },
});

export const { setTextObject } = textObjectSlice.actions;
export default textObjectSlice.reducer;
