import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useMediaRef } from "@/contextProviders/MediaRefProvider";
import usePlaybackControls from "@/hooks/usePlaybackControls";
import { selectDashObject } from "@/reduxSlices/dashObjectSlice";
import {
  selectPlayer,
  setCurrentTime,
  setDuration,
  setHasEnded,
} from "@/reduxSlices/playerSlice";
import { Box } from "@mui/material";
import dashjs from "dashjs";

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

  const playerRef = useRef(null);

  // Initialize Dash.js when video ref is set and ready
  useEffect(() => {
    if (!mediaRef.current) return;

    if (!playerRef.current) {
      const player = dashjs.MediaPlayer().create();
      player.initialize(
        mediaRef.current,
        "/testVideo/example_dash1.mpd",
        false,
      );

      player.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, () => {
        console.log("Dash.js initialized");
      });

      player.on(dashjs.MediaPlayer.events.ERROR, (e) => {
        console.error("Dash.js error:", e);
      });

      playerRef.current = player;
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.reset();
        playerRef.current = null;
      }
    };
  }, [mediaRef]);

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;

    const textTracks = player.getTracksFor("text");
    const selectedTrack = textTracks.find((track) =>
      captionLanguage ? track.lang === captionLanguage : "en",
    );
    if (selectedTrack) {
      player.setCurrentTrack(selectedTrack);
    }

    const audioTracks = player.getTracksFor("audio");
    const selectedAudio = audioTracks.find((track) =>
      dubbedLanguage ? track?.lang === dubbedLanguage : "en",
    );
    if (selectedAudio) {
      player.setCurrentTrack(selectedAudio);
    }

    console.log("Updated captions and audio tracks");
  }, [captionLanguage, dubbedLanguage]);

  return (
    <Box
      className={`${captionsEnabled && !showScreen && styles.audio} ${styles.mediaPlayerContainer}`}
    >
      {/** Player */}
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
          {/** Media captions */}
          <track
            label="English"
            kind="captions"
            srcLang="en"
            src="/sampleCaptions/sampleCaptions.vtt"
            // default
          />
          {/** Media source */}
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
            // default
          />
          {/** Media source */}
          <source
            src={mediaObj ? mediaObj.file_stream_cdn_url : ""}
            type="application/dash+xml"
          />
          Your browser does not support the video tag.
        </audio>
      )}

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
