import React from "react";

import { Box, Typography } from "@mui/material";
import Image from "next/image";

import styles from "./VABlobWithText.module.css";

/**
 *
 * @param {*} text - The text to display with the blob animation
 *
 * @returns - A blob animation with a text
 */
const VABlobWithText = ({ text = "" }) => {
  return (
    <Box className={styles.blobContainer}>
      <Box className={styles.imageContainer}>
        <Box sx={{ position: "relative", width: "60px", height: "60px" }}>
          <Image
            unoptimized
            src="/mediaFiles/Blob/blob-1-opacity-55.gif"
            width={60}
            height={60}
            alt="placeholder image"
            className={styles.blobImage}
          />
          <Image
            unoptimized
            src="/mediaFiles/Blob/blob-2-opacity-46.gif"
            width={60}
            height={60}
            alt="placeholder image"
            className={styles.blobImage}
          />
          <Image
            unoptimized
            src="/mediaFiles/Blob/blob-3-opacity-54.gif"
            width={60}
            height={60}
            alt="placeholder image"
            className={styles.blobImage}
          />
        </Box>
      </Box>
      <Typography
        sx={{
          color: "var(--mui-palette-netural-200)",
          fontSize: "larger",
          fontWeight: "bold",
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default VABlobWithText;
