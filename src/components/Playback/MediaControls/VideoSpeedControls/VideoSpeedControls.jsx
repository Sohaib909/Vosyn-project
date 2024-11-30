import React, { useRef, useState } from "react";

import { useMediaRef } from "@/contextProviders/MediaRefProvider";
import { Box, Grid2, IconButton, Typography } from "@mui/material";

import styles from "../SettingsGear/SettingsGear.module.css";

const VideoSpeedControls = () => {
  const playbackSpeedRef = useRef(null);
  const [showPlaybackSpeedMenu, setShowPlaybackSpeedMenu] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const mediaRef = useMediaRef();

  const handleSpeedChange = (speedValue) => {
    mediaRef.current.playbackRate = speedValue;
    setPlaybackSpeed(speedValue);
    setShowPlaybackSpeedMenu(false);
  };

  const handleClick = () => {
    setShowPlaybackSpeedMenu(!showPlaybackSpeedMenu);
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
      <IconButton onClick={handleClick} style={{ cursor: "pointer" }}>
        <Typography variant="body2">{`${playbackSpeed}x`}</Typography>
      </IconButton>

      {showPlaybackSpeedMenu && (
        <Box className={styles.itemsContainer}>
          <Typography variant="body2" sx={{ textAlign: "center" }}>
            Speed
          </Typography>
          {speedOptions.map((option) => (
            <Typography
              variant="caption"
              key={option.value}
              onClick={() => handleSpeedChange(option.value)}
              className={styles.item}
              sx={{
                justifyContent: "center",
                backgroundColor:
                  playbackSpeed === option.value &&
                  "var(--mui-palette-neutral-700)",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "var(--mui-palette-neutral-600)",
                },
                padding: "8px",
                borderRadius: "4px",
              }}
            >
              {option.label}
            </Typography>
          ))}
        </Box>
      )}
    </Grid2>
  );
};

export default VideoSpeedControls;
