import React from "react";

import BookmarkIcon from "@mui/icons-material/Bookmark";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import ShareIcon from "@mui/icons-material/Share";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

const PlaylistCard = ({
  itemID,
  itemImage,
  itemType,
  itemTitle,
  itemDescription,
  itemDate,
}) => {
  return (
    <Card
      key={itemID}
      sx={{
        borderRadius: "12px",
        maxWidth: "100%",
        cursor: "pointer",
        display: "flex",
        minWidth: "fit-content",
        alignItems: "center",
        gap: 0,
        mb: 2,
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          image={itemImage}
          sx={{
            borderRadius: "16px",
            maxWidth: "20rem",
            "@media (max-width: 1400px)": {
              maxWidth: "30rem",
            },
          }}
        />
        {(itemType === "MP4 Video" || itemType === "Video Playlist") && (
          <PlayArrowOutlinedIcon
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              borderRadius: "50%",
            }}
          />
        )}
      </Box>

      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          rowGap: "1rem",
          width: "100%",
        }}
      >
        <Box sx={{ position: "absolute", top: "5%", right: "2%" }}>
          <ShareIcon fontSize="small" sx={{ mr: "0.5vw" }} />
          <BookmarkIcon fontSize="small" sx={{ mr: "0.5vw" }} />
          <MoreVertIcon fontSize="small" />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            pr: "20%",
            pt: "2vh",
          }}
        >
          <Typography
            variant="p"
            sx={{ fontWeight: "bold", fontSize: "large" }}
          >
            {itemTitle}
          </Typography>
          <Typography
            variant="p"
            sx={{ fontWeight: "bold", fontSize: "large" }}
          >
            {itemType}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            pt: "1vh",
          }}
        >
          <Typography
            variant="caption"
            sx={{ opacity: "0.7", fontSize: "medium" }}
          >
            {itemDescription}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              opacity: "0.7",
              pr: "2%",
              pt: "2vh",
              fontSize: "medium",
            }}
          >
            {itemDate}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PlaylistCard;
