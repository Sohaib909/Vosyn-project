import React, { useState } from "react";

import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { Box, IconButton, Typography } from "@mui/material";

import PlaybackButtons from "../../PlaybackButtons/PlaybackButtons";

import styles from "./SettingsGear.module.css";

const SettingsGear = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [resolution, setResolution] = useState("1080p");

  const handleResolutionChange = (res) => {
    setResolution(res);
    setShowSettings(false);
  };

  const resolutions = ["1080p", "720p", "480p", "240p"];

  return (
    <Box
      onMouseEnter={() => setShowSettings(true)}
      onMouseLeave={() => setShowSettings(false)}
      sx={{ position: "relative", display: "inline-block" }}
    >
      {/* Button to toggle settings */}
      <IconButton>
        <SettingsRoundedIcon sx={{ color: "#fff" }} />
      </IconButton>

      {/* Menu for resolution options */}
      {showSettings && (
        <Box
          sx={{
            position: "absolute",
            bottom: "100%",
            right: 0,
            backgroundColor: "#1a1a1a",
            borderRadius: "8px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
            zIndex: 10,
            minWidth: "40px",
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
            Quality
          </Typography>
          {resolutions.map((res) => (
            <Typography
              key={res}
              onClick={() => handleResolutionChange(res)}
              sx={{
                padding: "8px 12px",
                fontSize: "14px",
                cursor: "pointer",
                backgroundColor:
                  resolution === res
                    ? "var(--mui-palette-neutral-700)"
                    : "transparent",
                color: resolution === res ? "#fff" : "#aaa",
                "&:hover": {
                  backgroundColor: "var(--mui-palette-neutral-600)",
                  color: "#fff",
                },
                borderRadius: "4px",
                textAlign: "center",
              }}
            >
              {res}
            </Typography>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default SettingsGear;
