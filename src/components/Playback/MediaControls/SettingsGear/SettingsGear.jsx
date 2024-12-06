import React, { useRef, useState } from "react";

import { useMediaRef } from "@/contextProviders/MediaRefProvider";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { Box, IconButton, Typography } from "@mui/material";

const SettingsGear = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [hoveredSpeed, setHoveredSpeed] = useState(null);

  const playbackSpeedRef = useRef(null);
  const mediaRef = useMediaRef();
  const speedOptions = [
    { label: "1x", value: 1 },
    { label: "1.25x", value: 1.25 },
    { label: "1.5x", value: 1.5 },
    { label: "2x", value: 2 },
  ];

  const handleSpeedChange = (speedValue) => {
    if (mediaRef.current) {
      mediaRef.current.playbackRate = speedValue;
    }
    setPlaybackSpeed(speedValue);
  };

  const handleMouseEnterContainer = () => {
    setShowSettings(true);
  };

  const handleMouseLeaveContainer = (e) => {
    const relatedTarget = e.relatedTarget;
    if (!playbackSpeedRef.current.contains(relatedTarget)) {
      setShowSettings(false);
    }
  };

  const handleOptionMouseEnter = (speedValue) => {
    setHoveredSpeed(speedValue);
  };

  const handleOptionMouseLeave = () => {
    setHoveredSpeed(null);
  };

  return (
    <Box
      onMouseEnter={handleMouseEnterContainer}
      onMouseLeave={handleMouseLeaveContainer}
      sx={{
        position: "relative",
        display: "inline-block",
        marginBottom: "3px",
      }}
    >
      {/* Button to toggle settings */}
      <IconButton
        sx={{
          border: "2px solid #fff",
          borderRadius: "4px",
          padding: "4px",
          width: "17px",
          height: "17px",
          position: "relative",
          "&:hover": {
            borderColor: "var(--mui-palette-secondary-main)",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <SettingsRoundedIcon
          sx={{
            color: "#fff",
            fontSize: "10px",
            "&:hover": { color: "var(--mui-palette-secondary-main)" },
          }}
        />
      </IconButton>

      {/* Menu for speed and resolution options */}
      {showSettings && (
        <Box
          ref={playbackSpeedRef}
          sx={{
            position: "absolute",
            bottom: "100%",
            right: 0,
            backgroundColor: "#1a1a1a",
            borderRadius: "6px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
            zIndex: 10,
            minWidth: "160px",
            padding: "8px 12px",
            display: "flex",
            flexDirection: "column",
            gap: "8px", // Reduced gap
          }}
        >
          {/* Speed Controls Section */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="body2"
              sx={{
                marginRight: "16px",
                color: "#aaa",
                fontSize: "12px",
                fontWeight: 500,
              }}
            >
              Speed:
            </Typography>
            <Box sx={{ display: "flex", gap: "8px" }}>
              {speedOptions.map((option) => (
                <Typography
                  key={option.value}
                  onClick={() => handleSpeedChange(option.value)}
                  onMouseEnter={() => handleOptionMouseEnter(option.value)}
                  onMouseLeave={handleOptionMouseLeave}
                  sx={{
                    padding: "4px 8px",
                    fontSize: "12px",
                    cursor: "pointer",
                    borderRadius: "4px",
                    backgroundColor:
                      hoveredSpeed === option.value ||
                      playbackSpeed === option.value
                        ? "#222"
                        : "transparent",
                    color:
                      hoveredSpeed === option.value ||
                      playbackSpeed === option.value
                        ? "#fff"
                        : "#aaa",
                    fontWeight: playbackSpeed === option.value ? 600 : 400,
                    "&:hover": {
                      backgroundColor: "#222",
                      color: "#fff",
                    },
                    transition: "background-color 0.2s ease, color 0.2s ease",
                  }}
                >
                  {option.label}
                </Typography>
              ))}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default SettingsGear;
