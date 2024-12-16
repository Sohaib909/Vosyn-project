"use client";

import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useMediaRef } from "@/contextProviders/MediaRefProvider";
import useStatusNotification from "@/hooks/useStatusNotification";
import { selectDashObject, setDashObject } from "@/reduxSlices/dashObjectSlice";
import {
  selectPlayer,
  setCurrentSubtitle,
  setIsBuffering,
  setPlaying,
  setSubtitles,
} from "@/reduxSlices/playerSlice";
import axios from "axios";
import useSWR from "swr";

import AudioPlayback from "./AudioPlayback/AudioPlayback";
import VideoPlayback from "./VideoPlayback/VideoPlayback";

const fetcher = (url) => axios.get(url).then((res) => res?.data);

const Playback = ({ type, id }) => {
  const mediaRef = useMediaRef();
  const dispatch = useDispatch();
  const { captionsEnabled, currentTime, subtitles } = useSelector(selectPlayer);
  const { mediaObj } = useSelector(selectDashObject);
  const { setStatus } = useStatusNotification();

  // Clear the media object when the id changes
  useEffect(() => {
    dispatch(setDashObject(null)); // Reset media object before fetching new data
  }, [id, dispatch]);

  const { error } = useSWR(`/api/video/${id}`, fetcher, {
    onSuccess: (newData) => {
      dispatch(setDashObject({ ...newData }));
      dispatch(setPlaying(true));
    },
  });

  if (error) {
    console.log(error, "eror");
    setStatus(
      `${error?.response?.statusText}. Please try again later.`,
      "error",
    );
  }

  // Handle video buffering and subtitle updates
  const handleWaiting = useCallback(
    () => dispatch(setIsBuffering(true)),
    [dispatch],
  );
  const handlePlaying = useCallback(
    () => dispatch(setIsBuffering(false)),
    [dispatch],
  );

  const parseVTT = (vttText) => {
    const captions = [];
    [...vttText]?.map((caption) =>
      captions.push({
        start: caption?.startTime,
        end: caption?.endTime,
        text: caption?.text,
      }),
    );
    return captions;
  };

  /**
   * This should be run everytime user changes language in the future
   */
  useEffect(() => {
    const track = mediaRef?.current?.textTracks[0];

    if (captionsEnabled && track) {
      track.mode = "hidden";
      const parsedSubtitles = parseVTT(track?.cues);
      dispatch(setSubtitles(parsedSubtitles));
    }
  }, [captionsEnabled, dispatch, mediaRef]);

  useEffect(() => {
    const media = mediaRef?.current;

    if (media) {
      media?.addEventListener("waiting", handleWaiting);
      media?.addEventListener("playing", handlePlaying);
    }

    return () => {
      media?.removeEventListener("waiting", handleWaiting);
      media?.removeEventListener("playing", handlePlaying);
    };
  }, [handleWaiting, handlePlaying]);

  useEffect(() => {
    if (captionsEnabled) {
      const subtitle = subtitles.find(
        (subtitle) =>
          currentTime >= subtitle?.start && currentTime <= subtitle?.end,
      );

      if (subtitle) {
        dispatch(setCurrentSubtitle(subtitle?.text));
      } else {
        dispatch(setCurrentSubtitle(""));
      }
    }
  }, [currentTime, captionsEnabled, dispatch, subtitles]);

  return type === "video" ? (
    <VideoPlayback
      likes={mediaObj?.like_count}
      videoUrl={mediaObj?.file_stream_cdn_url}
    />
  ) : (
    <AudioPlayback likes={mediaObj?.like_count} />
  );
};

export default Playback;
