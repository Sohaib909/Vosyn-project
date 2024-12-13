import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// eslint-disable-next-line prettier/prettier
import { useMediaRef } from "@/contextProviders/MediaRefProvider";
// eslint-disable-next-line prettier/prettier, no-unused-vars
import usePlaybackControls from "@/hooks/usePlaybackControls";
import { selectDashObject } from "@/reduxSlices/dashObjectSlice";
import { setPlaying } from "@/reduxSlices/playerSlice";
import {
  selectPlayer,
  setCurrentTime,
  setDuration,
  setHasEnded,
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
    captionLanguage,
    videoQuality,
  } = useSelector(selectPlayer);
  const { mediaObj } = useSelector(selectDashObject);
  const dispatch = useDispatch();
  const [videoUrl, setVideoUrl] = useState("");
  //const { togglePlayPause } = usePlaybackControls();
  const mediaRef = useMediaRef();
  const playerRef = useRef(null);

  useEffect(() => {
    if (!mediaObj || !mediaObj.qualities || mediaObj.qualities.length === 0) {
      console.error("Invalid video data! No video URL available.");
      return;
    }
    const player = dashjs.MediaPlayer().create();

    player.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, () => {
      const textTracks = player.getTracksFor("text");
      const selectedTrack = textTracks.find(
        (track) => captionLanguage && track.lang === captionLanguage,
      );
      player.setCurrentTrack(selectedTrack);
    });

    player.on(dashjs.MediaPlayer.events.ERROR, (e) => {
      console.error("Dash.js error:", e);
    });
    console.log("QUALITY", videoQuality);

    const qualityIndex = mediaObj.qualities.find(
      (quality) => quality.quality === videoQuality,
    );
    setVideoUrl(qualityIndex.file_stream_cdn_url);
    playerRef.current = player;
    player.initialize(
      mediaRef.current,
      mediaObj.qualities[2].file_stream_cdn_url,
      false,
    );

    player.updateSettings({
      streaming: {
        abr: {
          autoSwitchBitrate: false,
        },
      },
    });

    player.setQualityFor("video", 2, true);
    console.log(videoQuality, "CHECK", qualityIndex.file_stream_cdn_url);
    if (qualityIndex !== -1) {
      playerRef.current.setQualityFor("video", qualityIndex);
    }

    return () => {
      player.reset();
      dispatch(setPlaying(false));
    };
  }, [mediaObj, mediaRef, captionLanguage, dispatch, videoQuality]);

  console.log(videoUrl, "CHECKING THE VIDEO DATA", mediaObj.qualities);

  const handlePlayPause = () => {
    if (playing) {
      mediaRef.current.pause();
      dispatch(setPlaying(false));
    } else {
      mediaRef.current.play();
      dispatch(setPlaying(true));
    }
  };

  return (
    <Box
      className={`${captionsEnabled && !showScreen && styles.audio} ${styles.mediaPlayerContainer}`}
    >
      {showScreen ? (
        <video
          ref={mediaRef}
          className={styles.player}
          onClick={handlePlayPause}
          onTimeUpdate={(e) => dispatch(setCurrentTime(e.target.currentTime))}
          autoPlay={true}
          muted={true}
          onEnded={() => dispatch(setHasEnded(true))}
          onLoadedMetadata={() => {
            if (mediaRef.current) {
              dispatch(setDuration(mediaRef.current.duration || 0));
            }
          }}
        >
          <source src={videoUrl} type="application/dash+xml" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <audio
          ref={mediaRef}
          className={styles.player}
          onClick={handlePlayPause}
          onTimeUpdate={(e) => dispatch(setCurrentTime(e.target.currentTime))}
          autoPlay={true}
          muted={true}
          onEnded={() => dispatch(setHasEnded(true))}
          onLoadedMetadata={() => {
            if (mediaRef.current) {
              dispatch(setDuration(mediaRef.current.duration || 0));
            }
          }}
        >
          <source src={videoUrl} type="application/dash+xml" />
          Your browser does not support the audio tag.
        </audio>
      )}
      <SettingsGear hideButtonInMediaPlayer />
      <PlaybackStatus
        playing={playing}
        isBuffering={isBuffering}
        hasEnded={hasEnded}
        togglePlayPause={handlePlayPause}
      />
    </Box>
  );
};

export default MediaPlayer;
