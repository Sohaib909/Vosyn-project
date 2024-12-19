import React, { useEffect, useRef, useState } from "react";
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

import Spinner from "@/components/Spinner/Spinner.jsx";

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
  const [loading, setLoading] = useState(true);
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

  const cleanupPlayer = () => {
    setLoading(true);
    if (playerRef.current) {
      playerRef.current.reset();
      playerRef.current = null;
    }
    if (mediaRef.current) {
      mediaRef.current.pause();
      mediaRef.current.src = "";
      mediaRef.current.removeAttribute("src");
      mediaRef.current.currentTime = 0;
      mediaRef.current.load();
    }
  };

  // Main initialization effect
  useEffect(() => {
    if (!mediaObj || !mediaObj.file_stream_cdn_url) {
      if (playerRef.current) {
        playerRef.current.reset();
        playerRef.current = null;
      }
      return;
    }

    const videoUrl = mediaObj.file_stream_cdn_url;
    if (playerRef.current && playerRef.current.getSource() === videoUrl) {
      return;
    }

    setLoading(true);
    cleanupPlayer();

    const player = dashjs.MediaPlayer().create();
    playerRef.current = player;
    mediaRef.current.style.visibility = "hidden";

    player.initialize(mediaRef.current, videoUrl, true);

    player.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, () => {
      setAudioTrack(player, dubbedLanguage);
      setCaptionTrack(player, captionLanguage);

      mediaRef.current.style.visibility = "visible";
      setLoading(false);
    });

    player.updateSettings({
      streaming: {
        abr: {
          autoSwitchBitrate: false,
        },
      },
    });

    // const savePlaybackTime = () => {
    //   if (playerRef.current) {
    //     localStorage.setItem("videoTime", playerRef.current.time());
    //   }
    // };
    //
    // window.addEventListener("beforeunload", savePlaybackTime);
    // document.addEventListener("visibilitychange", savePlaybackTime);

    // Only clean up when component is actually unmounting
    // return () => {
    //   savePlaybackTime();
    //   setCurrentTime(player.time());
    //
    //   window.removeEventListener("beforeunload", savePlaybackTime);
    //   document.removeEventListener("visibilitychange", savePlaybackTime);
    //   // dispatch(setPlaying(true));
    // };
  }, [mediaObj]);

  /** ---------- Handle Media Ref (State Persistence) ---------- */
  useEffect(() => {
    const savePlaybackState = () => {
      if (playerRef.current) {
        localStorage.setItem("videoTime", playerRef.current.time());
      }
    };

    window.addEventListener("beforeunload", savePlaybackState);
    document.addEventListener("visibilitychange", savePlaybackState);

    return () => {
      savePlaybackState();
      window.removeEventListener("beforeunload", savePlaybackState);
      document.removeEventListener("visibilitychange", savePlaybackState);
    };
  }, [dispatch, mediaRef]);

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

    setLoading(true);

    playerRef.current.attachSource(newVideoUrl);
    playerRef.current.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, () => {
      mediaRef.current.currentTime = currentTime;
      setAudioTrack(playerRef.current, dubbedLanguage);
      setCaptionTrack(playerRef.current, captionLanguage);
      if (wasPlaying) {
        mediaRef.current.play();
        dispatch(setPlaying(true));
        setLoading(false);
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
    <>
      {loading && <Spinner />}

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
    </>
  );
};

export default MediaPlayer;
