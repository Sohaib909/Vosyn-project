import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

// eslint-disable-next-line prettier/prettier
import { useMediaRef } from "@/contextProviders/MediaRefProvider";
// eslint-disable-next-line prettier/prettier, no-unused-vars
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

    const selectedTrack = audioTracks.find((track) => track.lang === language);

    if (selectedTrack) {
      player.setCurrentTrack(selectedTrack);
    } else {
      // needs to be removed later and added dynamically rendering for dubbing buttons
    }
  };

  const setCaptionTrack = (player, language) => {
    const videoElement = mediaRef.current;
    if (!captionsEnabled) {
      for (let i = 0; i < videoElement.textTracks.length; i++) {
        videoElement.textTracks[i].mode = "disabled";
      }
      return;
    }
    if (videoElement.textTracks.length > 0) {
      for (let i = 0; i < videoElement.textTracks.length; i++) {
        videoElement.textTracks[i].mode = "showing";
      }
    }
    const textTracks = player.getTracksFor("text");
    const currLang = language === "" ? "en" : language;
    const selectedTrack = textTracks.find((track) => track.lang === currLang);
    if (selectedTrack) {
      player.setCurrentTrack(selectedTrack);
    }
  };

  // Main initialization effect
  useEffect(() => {
    if (!mediaObj || !mediaObj.qualities || mediaObj.qualities.length === 0) {
      return;
    }

    if (playerRef.current) {
      return;
    }

    const player = dashjs.MediaPlayer().create();
    playerRef.current = player;

    const videoUrl = mediaObj.file_stream_cdn_url;

    player.initialize(mediaRef.current, videoUrl, true);

    player.updateSettings({
      streaming: {
        abr: {
          autoSwitchBitrate: false,
        },
      },
    });

    const savePlaybackTime = () => {
      if (playerRef.current) {
        localStorage.setItem("videoTime", playerRef.current.time());
      }
    };

    window.addEventListener("beforeunload", savePlaybackTime);
    document.addEventListener("visibilitychange", savePlaybackTime);

    player.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, () => {
      setAudioTrack(player, dubbedLanguage);
      setCaptionTrack(player, captionLanguage);
    });

    // Only clean up when component is actually unmounting
    return () => {
      savePlaybackTime();
      setCurrentTime(player.time());

      window.removeEventListener("beforeunload", savePlaybackTime);
      document.removeEventListener("visibilitychange", savePlaybackTime);
      // dispatch(setPlaying(true));
    };
  }, [mediaObj, mediaRef]);

  // A separate useEffect to control dubbedlanguage, avoiding reloading the page everytime when switched dubbed language, also the caption will be changed to the dubbed language
  useEffect(() => {
    const player = playerRef.current;
    if (player) {
      setAudioTrack(player, dubbedLanguage);
      setCaptionTrack(player, dubbedLanguage);
    }
  }, [dubbedLanguage]);

  // useEffect to change caption language
  useEffect(() => {
    const player = playerRef.current;
    if (player) {
      setCaptionTrack(player, captionLanguage);
    }
  }, [captionLanguage, captionsEnabled]);

  // useEffect to change quality and the video won't restart
  useEffect(() => {
    if (!playerRef.current || !mediaObj) return;

    const qualityUrls = {
      low: mediaObj.low_url,
      medium: mediaObj.medium_url,
      high: mediaObj.high_url,
    };

    const newVideoUrl =
      qualityUrls[videoQuality] || mediaObj.file_stream_cdn_url;
    const currentTime = mediaRef.current?.currentTime || 0;
    const wasPlaying = !mediaRef.current?.paused;

    playerRef.current.attachSource(newVideoUrl);
    playerRef.current.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, () => {
      mediaRef.current.currentTime = currentTime;
      setAudioTrack(playerRef.current, dubbedLanguage);
      setCaptionTrack(playerRef.current, captionLanguage);
      if (wasPlaying) {
        mediaRef.current.play();
        dispatch(setPlaying(true));
      }
    });
  }, [videoQuality]);

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
