import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isRecording: false,
  recordedBlobs: {
    audio: null,
    video: null,
  },
  recordingType: "audio", // 'audio' or 'video'
};

const recordingSlice = createSlice({
  name: "recorder",
  initialState,
  reducers: {
    setRecording(state, action) {
      state.isRecording = action.payload;
    },
    setRecordedBlob(state, action) {
      const { blob, type } = action.payload;
      state.recordedBlobs[type] = blob;
    },
    setRecordingType(state, action) {
      state.recordingType = action.payload;
    },
    resetRecordingState(state) {
      state.isRecording = false;
      state.recordedBlobs = { audio: null, video: null };
      state.recordingType = "audio";
    },
  },
});

export const {
  setRecording,
  setRecordedBlob,
  setRecordingType,
  setAudioPermission,
  setVideoPermission,
  resetRecordingState,
} = recordingSlice.actions;

export const selectRecorder = (state) => state.recorder;
export default recordingSlice.reducer;
