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
      sx={{
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
        },
        "&:hover .child": {
          filter: "grayscale(0%)",
        },
      }}
      className={styles.recommendedCard}
      onClick={() => onClick(id)}
    >
      <Box
        className="child"
        sx={{
          position: "relative",
          width: "100%",
          height: "18rem",
          filter: "grayscale(50%)",
        }}
      >
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
