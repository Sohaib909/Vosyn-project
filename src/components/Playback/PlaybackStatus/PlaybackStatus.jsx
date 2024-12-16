import React, { memo } from "react";

import { PlayArrowOutlined, ReplayOutlined } from "@mui/icons-material";
import { Box, CircularProgress, IconButton } from "@mui/material";

import styles from "./PlaybackStatus.module.css";

const PlaybackStatus = ({
  playing,
  isBuffering,
  hasEnded,
  togglePlayPause,
}) => {
  // console.log("IN PLAYBACK: ", playing);
  return (
    <Box
      className={styles.backdrop}
      onClick={togglePlayPause}
      sx={{
        backgroundColor:
          isBuffering || !playing || hasEnded
            ? "rgba(0, 0, 0, 0.5)"
            : "transparent", // Semi-transparent backdrop
      }}
    >
      {/* Loading Spinner for Buffering */}
      {isBuffering ? (
        <CircularProgress color="secondary" />
      ) : (
        // Play/Pause/Replay Controls
        <IconButton
          sx={{
            zIndex: 2, // Ensure it's on top of the backdrop
          }}
          // onClick={togglePlayPause}
          onClick={(e) => {
            e.stopPropagation(); // Preventing the parent box onClick from trigerring
            togglePlayPause();
          }}
        >
          {hasEnded ? (
            <ReplayOutlined sx={{ fontSize: "5rem" }} color="secondary" />
          ) : (
            !playing && (
              <PlayArrowOutlined sx={{ fontSize: "5rem" }} color="secondary" />
            )
          )}
        </IconButton>
      )}
    </Box>
  );
};

export default memo(PlaybackStatus);
