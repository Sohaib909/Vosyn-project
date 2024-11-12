import React from "react";

import { Grid2, IconButton } from "@mui/material";

import styles from "./PlaybackButtons.module.css";

const PlaybackButtons = ({ Icon, onClick, onMouseOver, onMouseLeave }) => {
  return (
    <Grid2 sx={12} item>
      <IconButton
        onClick={onClick}
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
        sx={{
          "&:hover": { color: "var(--mui-palette-secondary-main)" },
        }}
      >
        <Icon className={styles.icon} />
      </IconButton>
    </Grid2>
  );
};

export default PlaybackButtons;
