import React from "react";

import { Box, Grid2, Typography } from "@mui/material";
import Image from "next/image";

import styles from "./RecommendedCard.module.css";

const RecommendedCard = ({ recommendedItem, onClick }) => {
  const { id, thumbnail_url, titles } = recommendedItem;

  return (
    <Grid2
      item
      size={12}
      className={styles.recommendedCard}
      onClick={() => onClick(id)}
    >
      <Box className={styles.imageContainer}>
        <Image
          fill
          src={thumbnail_url}
          alt="thumbnail"
          className={styles.image}
        />
      </Box>

      <Typography>{`${titles[0].substring(0, 20)}...`}</Typography>
    </Grid2>
  );
};

export default RecommendedCard;
