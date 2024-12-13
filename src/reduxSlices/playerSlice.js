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
  dubbedLanguage: "",
  captionLanguage: "",
  subtitles: [],
  currentSubtitle: "",
  showTranscripts: false,
  showTranslatedTranscript: false,
  videoQuality: "1080",
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
    setDubbedLanguage: (state, action) => {
      state.dubbedLanguage = action.payload;
    },
    setCaptionLanguage: (state, action) => {
      state.captionLanguage = action.payload;
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
    setShowTranslatedTranscript: (state, action) => {
      state.showTranslatedTranscript = action.payload;
    },
    setVideoQuality: (state, action) => {
      state.videoQuality = action.payload;
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
  setPinnedLanguage,
  setDubbedLanguage,
  setCaptionLanguage,
  setSubtitles,
  setCurrentSubtitle,
  setShowTranscripts,
  setShowTranslatedTranscript,
  setVideoQuality,
} = playerSlice.actions;
export const selectPlayer = (state) => state.player;
export default playerSlice.reducer;
