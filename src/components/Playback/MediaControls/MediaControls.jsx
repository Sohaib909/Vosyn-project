import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { useMediaRef } from "@/contextProviders/MediaRefProvider";
import usePlaybackControls from "@/hooks/usePlaybackControls";
import {
  selectPlayer,
  setCurrentTime,
  setFullScreen,
  setHasEnded,
  setPlaying,
} from "@/reduxSlices/playerSlice";
import { formatTimeStamp } from "@/utils/formatTimeStamp";
import useKeyboardControls from "@/utils/useKeyboardControls";
import {
  PauseOutlined,
  PlayArrowOutlined,
  ReplayOutlined,
} from "@mui/icons-material";
import FullscreenExitRoundedIcon from "@mui/icons-material/FullscreenExitRounded";
import FullscreenRoundedIcon from "@mui/icons-material/FullscreenRounded";
import { Box, Grid2, Slider, Typography } from "@mui/material";

import PlaybackButtons from "../PlaybackButtons/PlaybackButtons";
import AutoDubbingSwitch from "./AutoDubbingSwitch/AutoDubbingSwitch";
import CaptionButton from "./CaptionButton/CaptionButton";
import SettingsGear from "./SettingsGear/SettingsGear";
import SkipButtons from "./SkipButtons/SkipButtons";
import VideoSpeedControls from "./VideoSpeedControls/VideoSpeedControls";
import VolumeControl from "./VolumeControl/VolumeControl";

import styles from "./MediaControls.module.css";

const MediaControls = ({ children, type }) => {
  const { playing, currentTime, isFullScreen, hasEnded } =
    useSelector(selectPlayer);
  const dispatch = useDispatch();
  const { togglePlayPause } = usePlaybackControls();

  const mediaRef = useMediaRef();

  const handleSliderChange = (value) => {
    if (hasEnded) {
      dispatch(setHasEnded(false));
      dispatch(setPlaying(true));
    }

    dispatch(setCurrentTime(value));

    if (mediaRef?.current && isFinite(value)) {
      mediaRef.current.currentTime = value;
    }
  };

  const handleFullscreen = async () => {
    const video = document?.querySelector("#playback");
    if (!video) return;

    if (isFullScreen) {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
      dispatch(setFullScreen(false));
    } else {
      if (video.requestFullscreen) {
        await video.requestFullscreen({ navigationUI: "hide" });
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
      }

      dispatch(setFullScreen(true));
    }
  };

  // const handleCaptionsToggle = () => {
  //   dispatch(setCaptionsEnabled(!captionsEnabled));
  // };

  useKeyboardControls(mediaRef, togglePlayPause, handleSliderChange);

  return (
    <Box
      className={`${type === "audio" && styles.audio} ${styles.controlsContainer}`}
    >
      <Box className={styles.timelineContainer}>
        <Slider
          aria-label="time-indicator"
          size="small"
          value={currentTime}
          min={0}
          step={1}
          max={mediaRef?.current?.duration || 0}
          onChange={(_, value) => handleSliderChange(value)}
          sx={(t) => ({
            color: "rgba(0,0,0,0.87)",
            height: 4,
            "& .MuiSlider-thumb": {
              width: 8,
              height: 8,
              transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
              "&::before": {
                boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
              },
              "&:hover, &.Mui-focusVisible": {
                boxShadow: `0px 0px 0px 8px ${"rgb(0 0 0 / 16%)"}`,
                ...t.applyStyles("dark", {
                  boxShadow: `0px 0px 0px 8px ${"rgb(255 255 255 / 16%)"}`,
                }),
              },
              "&.Mui-active": {
                width: 20,
                height: 20,
              },
            },
            "& .MuiSlider-rail": {
              opacity: 0.28,
            },
            ...t.applyStyles("dark", {
              color: "var(--mui-palette-secondary-main)",
            }),
          })}
        />
        <Typography>{formatTimeStamp(currentTime)}</Typography>
      </Box>

      <Grid2
        item
        container
        size={12}
        className={styles.bottomControlsContainer}
      >
        <Grid2 item size={4} sx={{ display: "flex", width: "fit-content" }}>
          <Grid2 item size={3} sx={{ width: "fit-content" }}>
            <PlaybackButtons
              onClick={() => togglePlayPause()}
              Icon={
                hasEnded
                  ? ReplayOutlined
                  : !playing
                    ? PlayArrowOutlined
                    : PauseOutlined
              }
            />
          </Grid2>

          <SkipButtons />

          <VolumeControl />
        </Grid2>

        {/* <Grid2 item size={2} className={styles.passedChildren}>// {children}{/* </Grid2> */}

        {console.log("Child componant", children)}

        <Grid2 item container size={6} sx={{ width: "fit-content" }}>
          <AutoDubbingSwitch />

          <Grid2 item size={3} sx={{ width: "fit-content" }}>
            <CaptionButton />
            {/* <PlaybackButtons
              onClick={handleCaptionsToggle}
              Icon={
                captionsEnabled
                  ? ClosedCaptionOffRoundedIcon
                  : ClosedCaptionOffOutlinedIcon
              }
            /> */}
          </Grid2>

          <VideoSpeedControls />

          <SettingsGear />

          <Grid2 item size={3} sx={{ width: "fit-content" }}>
            <PlaybackButtons
              onClick={handleFullscreen}
              Icon={
                isFullScreen ? FullscreenExitRoundedIcon : FullscreenRoundedIcon
              }
            />
          </Grid2>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default MediaControls;
