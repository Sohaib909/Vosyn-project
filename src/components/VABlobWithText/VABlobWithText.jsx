import React from "react";

import { Box, Typography } from "@mui/material";
import Image from "next/image";

import blob1 from "@/components/VABlobWithText/blob-1-opacity-55.gif";
import blob2 from "@/components/VABlobWithText/blob-2-opacity-46.gif";
import blob3 from "@/components/VABlobWithText/blob-3-opacity-54.gif";

import styles from "./VABlobWithText.module.css";

const VABlobWithText = ({ text }) => {
  return (
    <Box sx={{ display: "flex", columnGap: "2rem" }}>
      <Box sx={{ position: "relative", width: "60px", height: "60px" }}>
        <Image
          src={blob1}
          width={60}
          height={60}
          alt="placeholder image"
          className={styles.blobImage}
        />
        <Image
          src={blob2}
          width={60}
          height={60}
          alt="placeholder image"
          className={styles.blobImage}
        />
        <Image
          src={blob3}
          width={60}
          height={60}
          alt="placeholder image"
          className={styles.blobImage}
        />
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
