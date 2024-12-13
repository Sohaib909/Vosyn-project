import { ThumbDownAltRounded, ThumbUpAltRounded } from "@mui/icons-material";
import { Box, Divider, IconButton, Typography } from "@mui/material";

// import axios from "axios";

const LikeAndDislikeBtn = ({
  stats,
  fontSize = "inherit",
  height = "1.6rem",
  ToggleLike,
  ToggleDislike,
  // commentId,
  // triggerRerender = null,
}) => {
  const formatLikesCount = (count) => {
    if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
    if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`;
    return count.toString();
  };

  // const actionHandler = async (action) => {
  //   try {
  //     const res = await axios.post(`/api/comments/${commentId}/${action}`);
  //     if (res.status === 200) {
  //       triggerRerender();
  //     }
  //   } catch (err) {
  //     console.log(action, "=====>Failed");
  //   }
  // };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "var(--mui-palette-neutral-800)",
        borderRadius: "12px",
      }}
    >
      <IconButton onClick={ToggleLike}>
        <ThumbUpAltRounded
          sx={{
            fontSize: fontSize,
            color:
              stats?.likeStatus == 1
                ? "var(--mui-palette-primary-main)"
                : "inherit",
          }}
        />
      </IconButton>
      <Typography sx={{ paddingRight: "10px" }}>
        {formatLikesCount(stats?.likeCount || 0)}
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
      <IconButton onClick={ToggleDislike}>
        <ThumbDownAltRounded
          sx={{
            fontSize: fontSize,
            color:
              stats?.likeStatus === -1
                ? "var(--mui-palette-error-main)"
                : "inherit",
          }}
        />
      </IconButton>
    </Box>
  );
};

export default LikeAndDislikeBtn;
