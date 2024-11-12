import React from "react";

import { Stop } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";

import styles from "./RecordVideo.module.css";

const RecordVideo = ({ isRecording, stopRecording, videoRef }) => {
  return (
    <Box
      sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <Box className={styles.videoDisplayContainer}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{ width: "100%", maxWidth: "400px", height: "auto" }}
        >
          <track src="" kind="captions" />
        </video>
      </Box>

      <Box className={styles.statusContainer}>
        <Typography className={styles.videoInputStatus}>
          {isRecording ? "Recording in Progress ..." : "Ready to Record"}
        </Typography>
      </Box>

      <IconButton
        onClick={stopRecording}
        sx={{ alignSelf: "center", color: "red" }}
        aria-label="stop"
      >
        <Stop sx={{ fontSize: "2rem" }} />
      </IconButton>
    </Box>
  );
};

export default RecordVideo;
