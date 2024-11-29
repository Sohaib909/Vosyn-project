import React, { useRef, useState } from "react";

import { useMediaRef } from "@/contextProviders/MediaRefProvider";
import { Box, IconButton, Typography } from "@mui/material";

const VideoSpeedControls = () => {
  const playbackSpeedRef = useRef(null);
  const [showPlaybackSpeedMenu, setShowPlaybackSpeedMenu] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [hoveredSpeed, setHoveredSpeed] = useState(null);

  const mediaRef = useMediaRef();

  const handleSpeedChange = (speedValue) => {
    mediaRef.current.playbackRate = speedValue;
    setPlaybackSpeed(speedValue);
    setShowPlaybackSpeedMenu(false);
  };

  const handleMouseEnterContainer = () => {
    setShowPlaybackSpeedMenu(true);
  };

  const handleMouseLeaveContainer = (e) => {
    const relatedTarget = e.relatedTarget;
    if (!playbackSpeedRef.current.contains(relatedTarget)) {
      setShowPlaybackSpeedMenu(false);
    }
  };

  const handleOptionMouseEnter = (speedValue) => {
    setHoveredSpeed(speedValue);
  };

  const handleOptionMouseLeave = () => {
    setHoveredSpeed(null);
  };

  const speedOptions = [
    { label: "1x", value: 1 },
    { label: "1.25x", value: 1.25 },
    { label: "1.5x", value: 1.5 },
    { label: "2x", value: 2 },
  ];

  return (
    <Box
      ref={playbackSpeedRef}
      onMouseEnter={handleMouseEnterContainer}
      onMouseLeave={handleMouseLeaveContainer}
      sx={{ position: "relative", display: "inline-block" }}
    >
      <IconButton>
        <Typography
          variant="body2"
          sx={{ color: "#fff" }}
        >{`${playbackSpeed}x`}</Typography>
      </IconButton>

      {showPlaybackSpeedMenu && (
        <Box
          sx={{
            position: "absolute",
            bottom: "100%",
            right: 0,
            backgroundColor: "#1a1a1a",
            color: "#fff",
            borderRadius: "8px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
            minWidth: "50px",
            zIndex: 10,
            padding: "8px 0",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              marginBottom: "8px",
              color: "#aaa",
              fontSize: "12px",
            }}
          >
            Speed
          </Typography>
          {speedOptions.map((option) => (
            <Typography
              key={option.value}
              onClick={() => handleSpeedChange(option.value)}
              onMouseEnter={() => handleOptionMouseEnter(option.value)}
              onMouseLeave={handleOptionMouseLeave}
              sx={{
                padding: "8px 12px",
                fontSize: "14px",
                cursor: "pointer",
                backgroundColor:
                  playbackSpeed === option.value
                    ? "#333"
                    : hoveredSpeed === option.value
                      ? "#444"
                      : "transparent",
                color: playbackSpeed === option.value ? "#fff" : "#aaa",
                "&:hover": {
                  backgroundColor: "#444",
                  color: "#fff",
                },
              }}
            >
              {option.label}
            </Typography>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default VideoSpeedControls;
