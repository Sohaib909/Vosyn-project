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
//const id = "764d3565-d0d2-451f-a426-937580c58e65";
const ID = {
  id: "764d3565-d0d2-451f-a426-937580c58e65",
  titles: [
    {
      title_text: "Python in 100 Seconds",
      language: "en",
      is_native: true,
    },
  ],
  categories: [],
  tags: ["tutorial", "webdev", "app development", "lesson"],
  hashtags: [],
  filestreams: [],
  qualities: [
    {
      id: 240,
      resolution: "1920x1080",
      quality: "1080",
      file_stream_cdn_url:
        "https://storage.googleapis.com/vv_backend_test/video_v2048_1080/dash/video_v2048_1080_dash_video_v2048_1080_hd.mpd",
      video: "764d3565-d0d2-451f-a426-937580c58e65",
    },
    {
      id: 241,
      resolution: "1440x720",
      quality: "720",
      file_stream_cdn_url:
        "https://storage.googleapis.com/vv_backend_test/video_v2048_1080/dash/video_v2048_1080_dash_video_v2048_1080_hd.mpd",
      video: "764d3565-d0d2-451f-a426-937580c58e65",
    },
    {
      id: 242,
      resolution: "960x480",
      quality: "480",
      file_stream_cdn_url:
        "https://storage.googleapis.com/vv_backend_test/video_v2048_1080/dash/video_v2048_1080_dash_video_v2048_1080_hd.mpd",
      video: "764d3565-d0d2-451f-a426-937580c58e65",
    },
  ],
  duration: "00:02:23.360000",
  description:
    "Python is arguably the world's most popular programming language. It is easy to learn, yet suitable in professional software like web applications, data science, and server-side scripts. https://fireship.io/tags/python/\n\n#python #programming #100SecondsOfCode\n\n🔗 Resources\n\nPython Docs https://docs.python.org/3/\nPython TIOBE Ranking https://www.infoworld.com/article/3636789/python-tops-tiobe-language-index.html\n\n🔥 Get More Content - Upgrade to PRO\n\nUpgrade to Fireship PRO at https://fireship.io/pro\nUse code lORhwXd2 for 25% off your first payment. \n\n🎨 My Editor Settings\n\n- Atom One Dark \n- vscode-icons\n- Fira Code Font\n\n🔖 Topics Covered\n\n- Is YouTube built with Python?\n- Is Python Strongly typed?\n- Python syntax and indentation rules\n- When was python released?",
  released_date: "2021-10-25",
  upload_country: "US",
  like_count: 108309,
  dislike_count: 0,
  view_count: 2684468,
  comment_count: 1730,
  created_at: "2024-12-10T06:46:08.232000Z",
  updated_at: "2024-12-10T06:46:08.288000Z",
  video_name: "Python in 100 Seconds",
  file_hash: "video_v2048_1080",
  is_uploaded: true,
  format: 0,
  youtube_video_id: "x7X9w_GIm1s",
  video_definition: "HD",
  has_caption: true,
  upload_status: null,
  privacy_status: null,
  is_licensed_content: true,
  license: "youtube",
  is_embeddable: true,
  are_stats_public: true,
  is_made_for_kids: false,
  is_self_declared_made_for_kids: false,
  file_stream_cdn_url:
    "https://storage.googleapis.com/vv_backend_test/video_v2048_1080/dash/video_v2048_1080_dash_video_v2048_1080_hd.mpd",
  vod_pipeline_job_id: null,
  is_available_in_cdn: false,
  file: null,
  original_language: "en",
  default_audio_language: "en",
  thumbnail: 240,
  channel_info: 240,
  localization: 240,
  like_status: 0,
};

const Playback = ({ type }) => {
  const mediaRef = useMediaRef();
  const dispatch = useDispatch();
  const { captionsEnabled, currentTime, subtitles } = useSelector(selectPlayer);
  const { mediaObj } = useSelector(selectDashObject);
  const { setStatus } = useStatusNotification();

  const { error } = useSWR(`/api/video/${ID.id}`, fetcher, {
    onSuccess: (newData) => {
      dispatch(setDashObject({ ...newData }));
      dispatch(setPlaying(false));
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

    if (track) {
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
  }, [handleWaiting, handlePlaying, mediaRef]);

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
