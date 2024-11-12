import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentTime: 0,
  playing: false,
  hasEnded: false,
  isBuffering: false,
  isFullScreen: false,
  duration: 0,
  hovering: false,
  volume: 1,
  captionsEnabled: false,
  playbackSpeed: 1,
  pinnedLanguages: [],
  subtitles: [],
  currentSubtitle: "",
  showTranscripts: false,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setCurrentTime: (state, action) => {
      state.currentTime = action.payload;
    },
    setPlaying: (state, action) => {
      state.playing = action.payload;
    },
    setHasEnded: (state, action) => {
      state.hasEnded = action.payload;
    },
    setIsBuffering: (state, action) => {
      state.isBuffering = action.payload;
    },
    setFullScreen: (state, action) => {
      state.isFullScreen = action.payload;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    setHovering: (state, action) => {
      state.hovering = action.payload;
    },
    setVolume: (state, action) => {
      state.volume = action.payload;
    },
    setCaptionsEnabled: (state, action) => {
      state.captionsEnabled = action.payload;
    },
    setPlaybackSpeed: (state, action) => {
      state.playbackSpeed = action.payload;
    },
    setPinnedLanguage: (state, action) => {
      state.pinnedLanguages = action.payload;
    },
    setSubtitles: (state, action) => {
      state.subtitles = action.payload;
    },
    setCurrentSubtitle: (state, action) => {
      state.currentSubtitle = action.payload;
    },
    setShowTranscripts: (state, action) => {
      state.showTranscripts = action.payload;
    },
  },
});

export const {
  setCurrentTime,
  setPlaying,
  setHasEnded,
  setIsBuffering,
  setFullScreen,
  setDuration,
  setVolume,
  setHovering,
  setCaptionsEnabled,
  setPlaybackSpeed,
  setPinnedLanguages,
  setSubtitles,
  setCurrentSubtitle,
  setShowTranscripts,
} = playerSlice.actions;
export const selectPlayer = (state) => state.player;
export default playerSlice.reducer;
