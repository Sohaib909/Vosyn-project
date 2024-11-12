import React from "react";
import { useSelector } from "react-redux";

import { selectPlayer } from "@/reduxSlices/playerSlice";
import { ChatBubbleRounded } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";

import LikeAndDislikeBtn from "@/components/LikeAndDislikeBtn/LikeAndDislikeBtn";

import MediaControls from "../MediaControls/MediaControls";
import MediaPlayer from "../MediaPlayer/MediaPlayer";
import MediaPlayerHeaderIcons from "../MediaPlayerHeaderIcons/MediaPlayerHeaderIcons";

import styles from "./VideoPlayback.module.css";

const VideoPlayback = ({ likes }) => {
  const { captionsEnabled, currentSubtitle } = useSelector(selectPlayer);

  return (
    <Box className={styles.playback} id="playback">
      {/* Media player header */}
      <MediaPlayerHeaderIcons />

      {/* MediaPlayer */}
      <MediaPlayer />

      {/* Subtitle display */}
      {captionsEnabled && currentSubtitle && (
        <Box className={styles.captionsContainer}>
          <Typography className={styles.captions} variant="caption">
            {currentSubtitle}
          </Typography>
        </Box>
      )}

      {/* Controls overlay */}
      <MediaControls>
        <Box sx={{ display: "flex" }}>
          <LikeAndDislikeBtn likes={likes} />

          <IconButton>
            <ChatBubbleRounded />
          </IconButton>
        </Box>
      </MediaControls>
    </Box>
  );
};

export default VideoPlayback;
