import React from "react";

import { ThumbDownAltRounded, ThumbUpAltRounded } from "@mui/icons-material";
import { Box, Divider, IconButton, Typography } from "@mui/material";

const LikeAndDislikeBtn = ({
  likes,
  fontSize = "inherit",
  height = "1.6rem",
}) => {
  const formatLikesCount = (count) => {
    if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
    if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`;
    return count.toString();
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "var(--mui-palette-neutral-800)",
        borderRadius: "12px",
      }}
    >
      <IconButton>
        <ThumbUpAltRounded sx={{ fontSize: fontSize }} />
      </IconButton>
      <Typography sx={{ paddingRight: "10px" }}>
        {formatLikesCount(likes || 0)}
      </Typography>
      <Divider
        orientation="vertical"
        flexItem
        sx={{
          border: "0.5px solid var(--mui-palette-neutral-25)",
          height: height,
          alignSelf: "center",
        }}
      />
      <IconButton>
        <ThumbDownAltRounded sx={{ fontSize: fontSize }} />
      </IconButton>
    </Box>
  );
};

export default LikeAndDislikeBtn;
