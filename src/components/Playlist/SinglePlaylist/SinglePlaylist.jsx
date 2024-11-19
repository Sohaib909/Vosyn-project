"use client";

import React from "react";

import useQueryParam from "@/hooks/useQueryParam";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import ShareIcon from "@mui/icons-material/Share";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Link,
  Typography,
} from "@mui/material";

const videos = [
  {
    id: 1,
    title: "Money heist",
    type: "Article",
    description: "Netflix | Spanish",
    date: "Saved in July 1, 2018",
    image:
      "https://i.pinimg.com/originals/89/3e/5b/893e5bdf0499d714ddf77def68510bf2.jpg",
  },
  {
    id: 2,
    title: "Money heist",
    type: "MP4 Video",
    description: "Netflix | Spanish",
    date: "Saved in December 1, 2019",
    image:
      "https://i.pinimg.com/originals/89/3e/5b/893e5bdf0499d714ddf77def68510bf2.jpg",
  },
  {
    id: 3,
    title: "Money heist",
    type: "MP3 Audio",
    description: "Netflix | Spanish",
    date: "Saved in December 1, 2019",
    image:
      "https://i.pinimg.com/originals/89/3e/5b/893e5bdf0499d714ddf77def68510bf2.jpg",
  },
  {
    id: 4,
    title: "Money heist",
    type: "PDF Document",
    description: "Netflix | Spanish",
    date: "Saved in December 1, 2019",
    image:
      "https://i.pinimg.com/originals/89/3e/5b/893e5bdf0499d714ddf77def68510bf2.jpg",
  },
];

// Grouping logic for sorting by type
const groupByType = (data) => {
  const grouped = {
    Videos: [],
    Audio: [],
    Text: [],
  };

  data.forEach((item) => {
    if (item.type.includes("Video")) {
      grouped.Videos.push(item);
    } else if (item.type.includes("Audio")) {
      grouped.Audio.push(item);
    } else {
      grouped.Text.push(item); // Articles and PDFs fall under Text
    }
  });

  return grouped;
};

const SinglePlaylist = ({ data = videos }) => {
  const groupedData = groupByType(data);

  const { getAllParams } = useQueryParam();
  const params = getAllParams();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "3vh" }}>
      {Object.entries(groupedData).map(([key, items]) => (
        <Box key={key}>
          {params.sort === "type" && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", textTransform: "capitalize", mb: 2 }}
              >
                {key}
              </Typography>

              <Link
                variant="p"
                sx={{ mb: 2, fontWeight: "bold" }}
                underline="always"
                color="inherit"
              >
                More
              </Link>
            </Box>
          )}

          {items.map((item) => (
            <Card
              key={item.id}
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
                  image={item.image}
                  sx={{
                    borderRadius: "16px",
                    maxWidth: "20rem",
                    "@media (max-width: 1400px)": {
                      maxWidth: "30rem",
                    },
                  }}
                />
                {(item.type === "MP4 Video" ||
                  item.type === "Video Playlist") && (
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
                    {item.title}
                  </Typography>
                  <Typography
                    variant="p"
                    sx={{ fontWeight: "bold", fontSize: "large" }}
                  >
                    {item.type}
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
                    {item.description}
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
                    {item.date}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default SinglePlaylist;
