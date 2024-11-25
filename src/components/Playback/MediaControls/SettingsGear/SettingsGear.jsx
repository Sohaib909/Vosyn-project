import React, { useRef, useState } from "react";

import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { Box, Grid2, Typography } from "@mui/material";

import PlaybackButtons from "../../PlaybackButtons/PlaybackButtons";

import styles from "./SettingsGear.module.css";

const SettingsGear = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [resolution, setResolution] = useState("1080p");

  const handleMenuToggle = () => {
    setShowSettings(!showSettings); // Toggle the menu visibility
  };

  const handleResolutionChange = (res) => {
    setResolution(res);
    setShowSettings(false); // Close the menu after selection
  };

  const resolutions = ["1080p", "720p", "480p", "240p"];

  return (
    <Grid2 item size={3} sx={{ position: "relative", width: "fit-content" }}>
      <PlaybackButtons onClick={handleMenuToggle} Icon={SettingsRoundedIcon} />

      {showSettings && (
        <Box className={styles.itemsContainer}>
          <Typography variant="body2" sx={{ textAlign: "center" }}>
            Quality
          </Typography>
          {resolutions.map((res) => (
            <Typography
              variant="caption"
              key={res}
              onClick={() => handleResolutionChange(res)}
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