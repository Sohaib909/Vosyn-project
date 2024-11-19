"use client";

import React from "react";

import PodcastsIcon from "@mui/icons-material/Podcasts";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const ListenCard = ({ item }) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/audio/${item.document.id}`);
  };

  return (
    <Card
      sx={{
        borderRadius: "12px",
        maxWidth: "100%",
        cursor: "pointer",
        padding: "1rem",
        display: "flex",
        minWidth: "fit-content",
        alignItems: "center",
      }}
      onClick={handleCardClick}
    >
      <CardMedia
        component="img"
        image={item.document.thumbnail_url}
        sx={{
          borderRadius: "4px",
          maxHeight: "10rem",
          maxWidth: "10rem",
          padding: "0",
        }}
      />

      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          rowGap: "1rem",
          width: "100%",
          height: "fit-content",
          minWidth: "20rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "content",
          }}
        >
          <Typography variant="p" sx={{ fontWeight: "bold" }}>
            {`${item.document.titles[0].slice(0, 20)}...`}
          </Typography>
          <PodcastsIcon />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "content",
          }}
        >
          <Typography variant="caption" sx={{ opacity: "0.7" }}>
            Secondary Information
          </Typography>
          <Typography variant="caption" sx={{ opacity: "0.7" }}>
            Amount of time left
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ListenCard;
