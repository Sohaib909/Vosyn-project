import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useMediaRef } from "@/contextProviders/MediaRefProvider";
import usePlaybackControls from "@/hooks/usePlaybackControls";
import { selectDashObject } from "@/reduxSlices/dashObjectSlice";
import {
  selectPlayer,
  setCurrentTime,
  setDuration,
  setHasEnded,
  setPlaying,
} from "@/reduxSlices/playerSlice";
import { Box } from "@mui/material";
import dashjs from "dashjs";

import SettingsGear from "../MediaControls/SettingsGear/SettingsGear";
import PlaybackStatus from "../PlaybackStatus/PlaybackStatus";

import styles from "./MediaPlayer.module.css";

const MediaPlayer = ({ showScreen = true }) => {
  const {
    playing,
    hasEnded,
    captionsEnabled,
    isBuffering,
    dubbedLanguage,
    captionLanguage,
  } = useSelector(selectPlayer);
  const mediaObj = useSelector(selectDashObject);
  const dispatch = useDispatch();
  const { togglePlayPause } = usePlaybackControls();
  const mediaRef = useMediaRef();

  const video = {
    id: "764d3565-d0d2-451f-a426-937580c58e65",
    qualities: [
      {
        id: 240,
        resolution: "1920x1080",
        quality: "1080",
        file_stream_cdn_url:
          "https://storage.googleapis.com/vv_backend_test/video_v2048_1080/dash/video_v2048_1080_uhd.mpd",
        video: "764d3565-d0d2-451f-a426-937580c58e65",
      },
      {
        id: 241,
        resolution: "1440x720",
        quality: "720",
        file_stream_cdn_url:
          "https://storage.googleapis.com/vv_backend_test/video_v2048_1080/dash/video_v2048_1080_hd.mpd",
        video: "764d3565-d0d2-451f-a426-937580c58e65",
      },
      {
        id: 242,
        resolution: "960x480",
        quality: "480",
        file_stream_cdn_url:
          "https://storage.googleapis.com/vv_backend_test/video_v2048_1080/dash/video_v2048_1080_sd.mpd",
        video: "764d3565-d0d2-451f-a426-937580c58e65",
      },
    ],
  };

  // Initialize Dash.js when video ref is set and ready
  useEffect(() => {
    const player = dashjs.MediaPlayer().create();
    player.initialize(
      mediaRef.current,
      video.qualities[0].file_stream_cdn_url,
      false,
    );

    const DEFAULT_QUALITY_INDEX = 0;
    player.updateSettings({
      streaming: {
        abr: {
          autoSwitchBitrate: false,
        },
      },
    });
    player.setQualityFor("video", DEFAULT_QUALITY_INDEX);
    player.setQualityFor("audio", DEFAULT_QUALITY_INDEX);

    player.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, () => {
      const audioTracks = player.getTracksFor("audio");
      const selectedAudio = audioTracks.find((track) =>
        track && dubbedLanguage ? track?.lang === dubbedLanguage : "en",
      );
      player.setCurrentTrack(selectedAudio);

      const textTracks = player.getTracksFor("text");
      const selectedTrack = textTracks.find((track) =>
        track && captionLanguage ? track.lang === captionLanguage : "en",
      );
      player.setCurrentTrack(selectedTrack);
    });

    player.on(dashjs.MediaPlayer.events.ERROR, (e) => {
      console.error("Dash.js error:", e);
    });

    return () => {
      player.reset();
      dispatch(setPlaying(false));
    };
  }, [mediaObj, mediaRef, dubbedLanguage, captionLanguage]);

  const handleQualityChange = (newResolution) => {
    const qualityIndex = video.qualities.findIndex(
      (quality) => quality.resolution === newResolution,
    );
    if (qualityIndex !== -1) {
      mediaRef.current.src = video.qualities[qualityIndex].file_stream_cdn_url;
    }
  };

  return (
    <Box
      className={`${captionsEnabled && !showScreen && styles.audio} ${styles.mediaPlayerContainer}`}
    >
      {showScreen ? (
        <video
          ref={mediaRef} // Attach ref to video element
          className={styles.player}
          onClick={() => togglePlayPause(mediaRef)}
          onTimeUpdate={(e) => dispatch(setCurrentTime(e.target.currentTime))}
          autoPlay={false}
          onEnded={() => dispatch(setHasEnded(true))}
          onLoadedMetadata={() => {
            if (mediaRef.current) {
              dispatch(setDuration(mediaRef.current.duration || 0));
            }
          }}
        >
          <track
            label="English"
            kind="captions"
            srcLang="en"
            src="/sampleCaptions/sampleCaptions.vtt"
          />
          <source
            src={mediaObj ? mediaObj.file_stream_cdn_url : ""}
            type="application/dash+xml"
          />
          Your browser does not support the video tag.
        </video>
      ) : (
        <audio
          ref={mediaRef} // Attach ref to video element
          className={styles.player}
          onClick={() => togglePlayPause(mediaRef)}
          onTimeUpdate={(e) => dispatch(setCurrentTime(e.target.currentTime))}
          autoPlay={false}
          onEnded={() => dispatch(setHasEnded(true))}
          onLoadedMetadata={() => {
            if (mediaRef.current) {
              dispatch(setDuration(mediaRef.current.duration || 0));
            }
          }}
        >
          <track
            label="English"
            kind="captions"
            srcLang="en"
            src="/sampleCaptions/sampleCaptions.vtt"
          />
          <source
            src={mediaObj ? mediaObj.file_stream_cdn_url : ""}
            type="application/dash+xml"
          />
          Your browser does not support the video tag.
        </audio>
      )}
      {/* Settings Gear with resolution selection */}
      <SettingsGear
        onQualityChange={handleQualityChange}
        hideButtonInMediaPlayer={true}
      />
      {/* Playback status */}
      <PlaybackStatus
        playing={playing}
        isBuffering={isBuffering}
        hasEnded={hasEnded}
        togglePlayPause={() => togglePlayPause(mediaRef)}
      />
    </Box>
  );
};

export default MediaPlayer;
