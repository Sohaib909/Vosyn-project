"use client";

import { useDispatch, useSelector } from "react-redux";

import { useMediaRef } from "@/contextProviders/MediaRefProvider";
import {
  selectPlayer,
  setHasEnded,
  setPlaying,
} from "@/reduxSlices/playerSlice";

const usePlaybackControls = () => {
  const dispatch = useDispatch();
  const { hasEnded } = useSelector(selectPlayer);
  const mediaRef = useMediaRef();

  const togglePlayPause = () => {
    const media = mediaRef?.current;

    if (!media) return;

    if (hasEnded) dispatch(setHasEnded(false));

    if (media.paused) {
      media.play();
      dispatch(setPlaying(true));
    } else {
      media.pause();
      dispatch(setPlaying(false));
    }
  };

  return { togglePlayPause };
};

export default usePlaybackControls;
