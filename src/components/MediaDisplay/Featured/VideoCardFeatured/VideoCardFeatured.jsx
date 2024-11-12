import React from "react";

import YouTubeIcon from "@mui/icons-material/YouTube";
import { Box, Card, IconButton, Typography } from "@mui/material";

function VideoCardFeatured({ videoData, size }) {
  const { title_en, view_count, released_date, thumbnail_url } = videoData;

  return (
    <Card
      sx={{
        width: size === "large" ? "22rem" : "20rem",
        height: "100%",
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
        position: "relative",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          backgroundPosition: "center",
          backgroundSize: "cover",
          position: "relative",
          borderRadius: "10px 10px 0 0",
        }}
        style={{ backgroundImage: `url(${thumbnail_url})` }}
      >
        <IconButton
          sx={{
            position: "absolute",
            top: "15px",
            right: "20px",
            color: "white",
            padding: "4px",
            fontSize: "20px",
          }}
        >
          <YouTubeIcon sx={{ fontSize: 40 }} />
        </IconButton>
      </Box>

      <Box
        sx={{
          padding: "2vh",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          color: "white",
          position: "absolute",
          bottom: 0,
          width: "100%",
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "16px",
            maxWidth: "30ch",
            marginBottom: "4px",
            mr: "5vw",
            textAlign: "left",
          }}
          noWrap="true"
        >
          {title_en}
        </Typography>

        <Box
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            color: "#f1f1f1",
            fontSize: "12px",
            marginTop: "4px",
          }}
        >
          <Typography
            variant="caption"
            sx={{ marginRight: "1vw" }}
          >{`${view_count} views`}</Typography>
          <Typography variant="caption">{released_date}</Typography>
        </Box>
      </Box>
    </Card>
  );
}

export default VideoCardFeatured;
