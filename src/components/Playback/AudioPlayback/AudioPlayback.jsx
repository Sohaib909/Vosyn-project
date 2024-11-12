import React from "react";
import { useSelector } from "react-redux";

import { selectPlayer } from "@/reduxSlices/playerSlice";
import { ChatBubbleRounded } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import Image from "next/image";

import LikeAndDislikeBtn from "@/components/LikeAndDislikeBtn/LikeAndDislikeBtn";

import MediaControls from "../MediaControls/MediaControls";
import MediaPlayer from "../MediaPlayer/MediaPlayer";
import MediaPlayerHeaderIcons from "../MediaPlayerHeaderIcons/MediaPlayerHeaderIcons";

import styles from "./AudioPlayback.module.css";

const AudioPlayback = ({ mediaRef, likes }) => {
  const { captionsEnabled, currentSubtitle } = useSelector(selectPlayer);
  return (
    <Box className={styles.playback} id="playback">
      <Box className={styles.screenContainer}>
        {/* Media player header */}
        <MediaPlayerHeaderIcons />
        {/* MediaPlayer */}
        <MediaPlayer mediaRef={mediaRef} showScreen={false} />
        <Image
          fill
          alt="audio background"
          src="/mediaFiles/AudioPlayback/audioBackground.jpg"
          className={`${captionsEnabled && styles.enabledCaptions} ${styles.image}`}
        />

        {/* Subtitle display */}
        {captionsEnabled && currentSubtitle && (
          <Box className={styles.captionsContainer}>
            <Typography className={styles.captions} variant="caption">
              {currentSubtitle}
            </Typography>
          </Box>
        )}
      </Box>

      {/* Controls overlay */}
      <MediaControls mediaRef={mediaRef} type="audio">
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

export default AudioPlayback;
