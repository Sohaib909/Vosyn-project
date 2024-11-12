import React from "react";

import YouTubeIcon from "@mui/icons-material/YouTube";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid2,
  IconButton,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";

const VideoCard = ({ videoData }) => {
  const { titles, view_count, released_date, thumbnail_url, id } = videoData;

  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/video/${id}`);
  };

  const dateFormater = (timestamp) => {
    // Convert it to milliseconds by multiplying by 1000
    const date = new Date(timestamp * 1000);

    // Format to a human-readable date (just date)
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return formattedDate;
  };

  return (
    <Grid2
      size={{ xs: 12, sm: 6, md: 4 }}
      sx={{
        minHeight: "20rem",
      }}
      onClick={handleCardClick}
    >
      <Card
        sx={{
          borderRadius: "12px",
          position: "relative",
          height: "100%",
          "&:hover": {
            boxShadow: "0px 3px 6px var(--mui-palette-primary-550)",
          },
        }}
      >
        <CardActionArea sx={{ height: "100%" }}>
          <CardMedia
            sx={{ borderRadius: "12px", width: "100%", height: "100%" }}
            component="img"
            alt="thumbnail"
            image={thumbnail_url || "https://via.placeholder.com/140"}
          />

          <CardContent
            sx={{
              width: "100%",
              height: "4rem",
              position: "absolute",
              bottom: "0",
              padding: "0.5rem",
              borderRadius: "0 0px 12px 12px",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              backdropFilter: "blur(5px)",
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                textWrap: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {titles?.at(0)}
            </Typography>

            <Box sx={{ display: "flex", columnGap: "1rem" }}>
              <Typography variant="caption" sx={{ opacity: "60%" }}>
                {`${view_count} views`}
              </Typography>

              <Typography variant="caption" sx={{ opacity: "60%" }}>
                {dateFormater(released_date)}
              </Typography>
            </Box>
          </CardContent>

          <IconButton
            sx={{
              position: "absolute",
              top: "15px",
              right: "20px",
              padding: "4px",
            }}
          >
            <YouTubeIcon sx={{ fontSize: 40 }} />
          </IconButton>
        </CardActionArea>
      </Card>
    </Grid2>
  );
};

export default VideoCard;
