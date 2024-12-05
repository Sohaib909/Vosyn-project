import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useMediaRef } from "@/contextProviders/MediaRefProvider";
import { selectPlayer, setVolume } from "@/reduxSlices/playerSlice";
import VolumeOffRoundedIcon from "@mui/icons-material/VolumeOffRounded";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import { Box, Grid2, Slider } from "@mui/material";

import PlaybackButtons from "../../PlaybackButtons/PlaybackButtons";

import styles from "./VolumeControl.module.css";

const VolumeControl = () => {
  const dispatch = useDispatch();

  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const { volume } = useSelector(selectPlayer);

  const mediaRef = useMediaRef();

  const volumeContainerRef = useRef(null);
  const sliderTimeout = useRef(null);
  const prevVolumeRef = useRef(1);

  // Update volume based on the slider value
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    dispatch(setVolume(newVolume));
    mediaRef.current.volume = newVolume;

    // Clear any existing timeout when user is interacting with the slider
    if (sliderTimeout.current) {
      clearTimeout(sliderTimeout.current);
    }
  };

  const handleMenuClose = () => {
    sliderTimeout.current = setTimeout(() => {
      setShowVolumeSlider(false);
    });
  };

  const handleScroll = (e) => {
    const delta = e.deltaY > 0 ? -0.05 : 0.05; // Increase or decrease volume
    const newVolume = Math.min(Math.max(volume + delta, 0), 1); // Clamp between 0 and 1
    dispatch(setVolume(newVolume));
    mediaRef.current.volume = newVolume;
  };

  const toggleMuteUnmute = () => {
    const currentVolume = mediaRef.current.volume;

    if (currentVolume !== 0) {
      prevVolumeRef.current = currentVolume;
      mediaRef.current.volume = 0;
    } else {
      mediaRef.current.volume = prevVolumeRef.current;
    }

    dispatch(setVolume(mediaRef.current.volume));
  };

  return (
    <Grid2
      item
      size={3}
      ref={volumeContainerRef}
      sx={{ position: "relative", width: "fit-content" }}
      onWheel={handleScroll}
    >
      <PlaybackButtons
        Icon={volume === 0 ? VolumeOffRoundedIcon : VolumeUpRoundedIcon}
        onClick={toggleMuteUnmute}
        onMouseOver={() => setShowVolumeSlider(true)}
        // onMouseLeave={handleMenuClose}
      />

      {/* Volume Menu */}
      {showVolumeSlider && (
        <Box
          className={styles.sliderContainer}
          onMouseLeave={handleMenuClose}
          onMouseEnter={() => clearTimeout(sliderTimeout.current)}
        >
          <Slider
            orientation="vertical"
            value={volume}
            min={0}
            max={1}
            step={0.05}
            onChange={handleVolumeChange}
            sx={{
              height: 100,
              "& .MuiSlider-thumb": {
                width: "12px",
                height: "12px",
                backgroundColor: "lightgrey",
              },
              "& .MuiSlider-track": {
                width: "8px",
                backgroundColor: "lightgrey",
              },
              "& .MuiSlider-rail": {
                width: "8px",
                backgroundColor: "white",
              },
            }}
          />
        </Box>
      )}
    </Grid2>
  );
};

export default VolumeControl;
