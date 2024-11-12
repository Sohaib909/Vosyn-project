import React from "react";

import { MoreVert } from "@mui/icons-material";
import { Box, Grid2, Typography } from "@mui/material";
import Image from "next/image";

import styles from "./PlaylistCard.module.css";

const PlaylistCard = ({ playlistItem }) => {
  const { duration, released_date, video_name, thumbnail_detail } =
    playlistItem;

  // Convert Unix timestamp to the year
  const getYear = () => {
    const date = new Date(released_date * 1000); // Multiply by 1000 to convert seconds to milliseconds
    return date.getFullYear(); // Extracts the year from the Date object
  };

  // Convert seconds to "hh:mm:ss" format
  const getLength = () => {
    // Split the duration into [hours, minutes, seconds]
    const [h, m, s] = duration.split(":");

    // Format the time string, removing parts that are "00"
    const timeArray = [
      h !== "00" && `${h}h`,
      m !== "00" && `${m}m`,
      `${s}s`,
    ].filter(Boolean);

    // Join the parts with a colon
    return timeArray.join(" ");
  };

  return (
    <Grid2 item size={12} className={styles.playlistCard}>
      <Box className={styles.imageContainer}>
        <Image
          fill
          src={thumbnail_detail?.url}
          alt="thumbnail"
          className={styles.image}
        />
      </Box>

      <Box className={styles.content}>
        <Typography variant="body2">{`${video_name.substring(0, 10)}...`}</Typography>
        <Typography variant="caption" sx={{ opacity: "0.8" }}>
          {getYear()} · {getLength()}
        </Typography>
      </Box>

      <MoreVert />
    </Grid2>
  );
};

export default PlaylistCard;
