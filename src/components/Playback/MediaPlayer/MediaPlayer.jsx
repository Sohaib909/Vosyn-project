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

import PlaybackStatus from "../PlaybackStatus/PlaybackStatus";

import styles from "./MediaPlayer.module.css";

const MediaPlayer = ({ showScreen = true }) => {
  const { playing, hasEnded, captionsEnabled, isBuffering, dubbedLanguage } =
    useSelector(selectPlayer);
  const mediaObj = useSelector(selectDashObject);
  const dispatch = useDispatch();
  const { togglePlayPause } = usePlaybackControls();
  const mediaRef = useMediaRef();

  // Initialize Dash.js when video ref is set and ready
  useEffect(() => {
    const player = dashjs.MediaPlayer().create();
    player.initialize(mediaRef.current, "/testVideo/example_dash1.mpd", false);

    player.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, () => {
      // Get all audio tracks
      const audioTracks = player.getTracksFor("audio");

      const selectedAudio = audioTracks.find((track) =>
        dubbedLanguage ? track.lang === dubbedLanguage : "en",
      );
      player.setCurrentTrack(selectedAudio);

      // Get all caption (text) tracks
      const textTracks = player.getTracksFor("text");
      console.log(textTracks, "textTracks");
      // const selectedTrack = textTracks.find((track) => track.lang === "fr");
      // player.setCurrentTrack(audioTracks[0]);
    });

    player.on(dashjs.MediaPlayer.events.ERROR, (e) => {
      console.error("Dash.js error:", e);
    });

    // Cleanup function to reset the player when unmounted
    return () => {
      player.reset();
      dispatch(setPlaying(false));
    };
  }, [mediaObj, mediaRef, dubbedLanguage]);

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
