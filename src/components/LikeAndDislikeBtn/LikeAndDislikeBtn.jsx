import { useState } from "react";

import { ThumbDownAltRounded, ThumbUpAltRounded } from "@mui/icons-material";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import axios from "axios";

const LikeAndDislikeBtn = ({
  likes,
  commentId,
  fontSize = "inherit",
  height = "1.6rem",
}) => {
  const [liked, setLiked] = useState(false);

  const formatLikesCount = (count) => {
    if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
    if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`;
    return count.toString();
  };

  const actionHandler = async (action) => {
    console.log("action", action);
    try {
      const res = await axios.post(`/api/comments/${commentId}/${action}`);
      if (res.status === 200) {
        setLiked(!liked);
      }
    } catch (err) {
      console.log(action, "=====>Failed");
    }
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
      <IconButton onClick={() => actionHandler("like")}>
        <ThumbUpAltRounded sx={{ fontSize: fontSize }} />
      </IconButton>
      <Typography sx={{ paddingRight: "10px" }}>
        {liked
          ? formatLikesCount(likes + 1 || 0)
          : formatLikesCount(likes || 0)}
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
      <IconButton onClick={() => actionHandler("dislike")}>
        <ThumbDownAltRounded sx={{ fontSize: fontSize }} />
      </IconButton>
    </Box>
  );
};

export default LikeAndDislikeBtn;
