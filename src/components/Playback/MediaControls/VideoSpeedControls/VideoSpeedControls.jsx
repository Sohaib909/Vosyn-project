import React, { useRef, useState } from "react";

import { useMediaRef } from "@/contextProviders/MediaRefProvider";
import { Box, Grid2, IconButton, Typography } from "@mui/material";

import styles from "../SettingsGear/SettingsGear.module.css";

const VideoSpeedControls = () => {
  const playbackSpeedRef = useRef(null);
  const playSpeedTimeout = useRef(null);

  const [showPlaybackSpeedMenu, setShowPlaybackSpeedMenu] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const mediaRef = useMediaRef();

  const handleSpeedChange = (speedValue) => {
    mediaRef.current.playbackRate = speedValue;
    setPlaybackSpeed(speedValue);
  };

  const handleMenuClose = () => {
    playSpeedTimeout.current = setTimeout(() => {
      setShowPlaybackSpeedMenu(false);
    });
  };

  const speedOptions = [
    { label: "1x", value: 1 },
    { label: "1.25x", value: 1.25 },
    { label: "1.5x", value: 1.5 },
    { label: "2x", value: 2 },
  ];

  return (
    <Grid2
      item
      size={3}
      sx={{ position: "relative", width: "fit-content" }}
      ref={playbackSpeedRef}
    >
      <IconButton
        onMouseOver={() => setShowPlaybackSpeedMenu(true)}
        onMouseLeave={handleMenuClose}
        style={{ cursor: "pointer" }}
        ref={playbackSpeedRef}
      >
        {/* Display current playback speed as text using Typography with fixed size and centered */}
        <Typography variant="body2">{`${playbackSpeed}x`}</Typography>
      </IconButton>

      {/* Playback Speed Menu */}
      {showPlaybackSpeedMenu && (
        <Box
          className={styles.itemsContainer}
          onMouseLeave={handleMenuClose}
          onMouseEnter={() => clearTimeout(playSpeedTimeout.current)}
        >
          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
            }}
          >
            Speed
          </Typography>
          {speedOptions.map((res) => (
            <Typography
              variant="caption"
              key={res?.value}
              onMouseLeave={handleMenuClose}
              onMouseEnter={() => clearTimeout(playSpeedTimeout.current)}
              onClick={() => {
                handleSpeedChange(res?.value);
                handleMenuClose();
              }}
              className={styles.item}
              sx={{
                justifyContent: "center",
                backgroundColor:
                  playbackSpeed === res?.value &&
                  "var(--mui-palette-neutral-700)",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "var(--mui-palette-neutral-600)",
                },
                padding: "8px",
                borderRadius: "4px",
              }}
            >
              {res?.value}
            </Typography>
          ))}
        </Box>
      )}
    </Grid2>
  );
};

export default VideoSpeedControls;
