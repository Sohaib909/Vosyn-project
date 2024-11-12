import React, { useRef, useState } from "react";

import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { Box, Grid2, Typography } from "@mui/material";

import PlaybackButtons from "../../PlaybackButtons/PlaybackButtons";

import styles from "./SettingsGear.module.css";

const SettingsGear = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [resolution, setResolution] = useState("1080p");

  const settingsRef = useRef(null);
  const settingsTimeout = useRef(null);

  const handleMenuClose = () => {
    settingsTimeout.current = setTimeout(() => {
      setShowSettings(false);
    }, 2000);
  };

  const resolutions = ["1080p", "720p", "480p", "240p"];

  return (
    <Grid2
      item
      size={3}
      ref={settingsRef}
      sx={{ position: "relative", width: "fit-content" }}
    >
      <PlaybackButtons
        onMouseOver={() => setShowSettings(true)}
        onMouseLeave={handleMenuClose}
        Icon={SettingsRoundedIcon}
      />

      {/* Settings Menu */}
      {showSettings && (
        <Box
          className={styles.itemsContainer}
          onMouseLeave={handleMenuClose}
          onMouseEnter={() => clearTimeout(settingsTimeout.current)}
        >
          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
            }}
          >
            Quality
          </Typography>
          {resolutions.map((res) => (
            <Typography
              variant="caption"
              key={res}
              onMouseLeave={handleMenuClose}
              onMouseEnter={() => clearTimeout(settingsTimeout.current)}
              onClick={() => {
                setResolution(res);
                handleMenuClose();
              }}
              className={styles.item}
              sx={{
                justifyContent: "center",
                backgroundColor:
                  resolution === res && "var(--mui-palette-neutral-700)",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "var(--mui-palette-neutral-600)",
                },
                padding: "8px",
                borderRadius: "4px",
              }}
            >
              {res}
            </Typography>
          ))}
        </Box>
      )}
    </Grid2>
  );
};

export default SettingsGear;
