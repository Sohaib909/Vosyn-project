import React, { useEffect, useRef } from "react";
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
    dubbedLanguage,
    videoQuality,
  } = useSelector(selectPlayer);
  const { mediaObj } = useSelector(selectDashObject);
  const dispatch = useDispatch();
  //const { togglePlayPause } = usePlaybackControls();
  const mediaRef = useMediaRef();
  const playerRef = useRef(null);

  // logic handle dubbing languages switch
  const setAudioTrack = (player, language) => {
    const audioTracks = player.getTracksFor("audio");
    console.log("available audio tracks ==>", audioTracks);

    const selectedTrack = audioTracks.find((track) => track.lang === language);

    if (selectedTrack) {
      player.setCurrentTrack(selectedTrack);
      console.log(`Switched to audio track ==> ${language}`);
    } else {
      console.log(`Audio track for language ${language} not found`);
    }
  };

  useEffect(() => {
    if (!mediaObj || !mediaObj.qualities || mediaObj.qualities.length === 0) {
      console.error("Invalid video data! No video URL available.");
      return;
    }

    const player = dashjs.MediaPlayer().create();

    player.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, () => {
      console.log("Dashjs initialized..");
      setAudioTrack(player, dubbedLanguage);
      const textTracks = player.getTracksFor("text");
      const selectedTrack = textTracks.find(
        (track) => captionLanguage && track.lang === captionLanguage,
      );
      captionsEnabled && player.setCurrentTrack(selectedTrack);
    });

    playerRef.current = player;

    // Finding the matching object and video URL for the specific quality.

    const qualityIndex = mediaObj.qualities.find(
      (quality) => quality.quality === videoQuality,
    );
    playerRef.current = player;
    player.initialize(
      mediaRef.current,
      qualityIndex
        ? qualityIndex.file_stream_cdn_url
        : mediaObj.file_stream_cdn_url,
      true,
    );

    player.updateSettings({
      streaming: {
        abr: {
          autoSwitchBitrate: false,
        },
      },
    });

    // player.setQualityFor("video", 2, true); // Not sure if this is required or not.

    if (qualityIndex !== -1) {
      playerRef.current.setQualityFor("video", qualityIndex);
    }

    return () => {
      player.reset();
      dispatch(setPlaying(true));
    };
  }, [mediaObj, mediaRef, captionLanguage, dispatch, videoQuality]);

  // A separate useEffect to control dubbedlanguage, avoiding reloading the page everytime when switched dubbed language
  useEffect(() => {
    const player = playerRef.current;
    if (player) {
      setAudioTrack(player, dubbedLanguage);
    }
  }, [dubbedLanguage]);

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
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video
          ref={mediaRef}
          className={styles.player}
          onClick={handlePlayPause}
          onTimeUpdate={(e) => dispatch(setCurrentTime(e.target.currentTime))}
          autoPlay={false}
          muted={false}
          onEnded={() => dispatch(setHasEnded(true))}
          onLoadedMetadata={() => {
            if (mediaRef.current) {
              dispatch(setDuration(mediaRef.current.duration || 0));
            }
          }}
        >
          <source type="application/dash+xml" />
          Your browser does not support the video tag.
        </video>
      ) : (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <audio
          ref={mediaRef}
          className={styles.player}
          onClick={handlePlayPause}
          onTimeUpdate={(e) => dispatch(setCurrentTime(e.target.currentTime))}
          autoPlay={false}
          muted={false}
          onEnded={() => dispatch(setHasEnded(true))}
          onLoadedMetadata={() => {
            if (mediaRef.current) {
              dispatch(setDuration(mediaRef.current.duration || 0));
            }
          }}
        >
          <source type="application/dash+xml" />
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
