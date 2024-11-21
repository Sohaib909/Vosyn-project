"use client";

import React from "react";

import useQueryParam from "@/hooks/useQueryParam";
import { Box, Link, Typography } from "@mui/material";

import PlaylistCard from "./PlaylistCard/PlaylistCard";

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
    date: "Saved in December 1, 2021",
    image:
      "https://i.pinimg.com/originals/89/3e/5b/893e5bdf0499d714ddf77def68510bf2.jpg",
  },
  {
    id: 5,
    title: "R&B Vibe",
    type: "Audio Playlist",
    description: "5 Songs",
    date: "Saved in February 1, 2021",
    image:
      "https://i.pinimg.com/originals/89/3e/5b/893e5bdf0499d714ddf77def68510bf2.jpg",
  },
  {
    id: 6,
    title: "Best business trend in 2024",
    type: "Video Playlist",
    description: "17 videos",
    date: "Saved in November 2, 2023",
    image: [
      "https://i.pinimg.com/originals/89/3e/5b/893e5bdf0499d714ddf77def68510bf2.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThlFHY1VWpNbjK2tPbbX9f7v7pLGjbUn6yVQ&s",
      "https://i.pinimg.com/originals/89/3e/5b/893e5bdf0499d714ddf77def68510bf2.jpg",
    ],
  },
];

// Helper to parse date strings
const parseDate = (dateStr) => {
  const match = dateStr.match(/Saved in (.+)/);
  return match ? new Date(match[1]) : null;
};

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

const SinglePlaylist = ({ data = videos, icons = true }) => {
  const { getAllParams } = useQueryParam();
  const params = getAllParams();

  // Determine sorting strategy
  const sortedData =
    params.sort === "savedDate"
      ? [...data].sort((a, b) => parseDate(b.date) - parseDate(a.date)) // Sort by date
      : groupByType(data); // Group by type

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "3vh" }}>
      {params.sort === "type" &&
        Object.entries(sortedData).map(([key, items]) => (
          <Box key={key}>
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
                more
              </Link>
            </Box>

            {items.map((item) => (
              <PlaylistCard
                key={item.id}
                itemID={item.id}
                itemImage={item.image}
                itemType={item.type}
                itemTitle={item.title}
                itemDate={item.date}
                itemDescription={item.description}
                icons={icons}
              />
            ))}
          </Box>
        ))}

      {params.sort === "savedDate" &&
        sortedData.map((item) => (
          <PlaylistCard
            key={item.id}
            itemID={item.id}
            itemImage={item.image}
            itemType={item.type}
            itemTitle={item.title}
            itemDate={item.date}
            itemDescription={item.description}
            icons={icons}
          />
        ))}

      {!params.sort &&
        data.map((item) => (
          <PlaylistCard
            icons={icons}
            key={item.id}
            itemID={item.id}
            itemImage={item.image}
            itemType={item.type}
            itemTitle={item.title}
            itemDate={item.date}
            itemDescription={item.description}
          />
        ))}
    </Box>
  );
};

export default SinglePlaylist;
