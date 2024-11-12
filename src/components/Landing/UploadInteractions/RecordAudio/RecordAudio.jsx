import React from "react";

import { MicNoneOutlined } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

import styles from "./RecordAudio.module.css";

const RecordAudio = () => {
  return (
    <Box>
      <Box className={styles.voiceInputIndicator}>
        <Box className={styles.voiceLine} />
        <MicNoneOutlined sx={{ fontSize: "2rem", margin: "0 1rem" }} />
        <Box className={styles.voiceLine} />
        <Box className={styles.voiceBgBlur} />
      </Box>
      <Box className={styles.statusContainer}>
        <Typography className={styles.voiceInputStatus}>Listening</Typography>
        <Box className={styles.dots}></Box>
      </Box>
    </Box>
  );
};

export default RecordAudio;
