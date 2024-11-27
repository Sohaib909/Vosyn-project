"use client";

import React from "react";

import useQueryParam from "@/hooks/useQueryParam";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Grid2, Link, Typography } from "@mui/material";

import PlaylistCard from "./PlaylistCard/PlaylistCard";

const videos = [
  {
    id: 1,
    title: "Money heist",
    type: "Article",
    description: "Netflix | English",
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
    savedType: "offline",
    description: "Netflix | Spanish",
    date: "Saved in December 1, 2019",
    image:
      "https://i.pinimg.com/originals/89/3e/5b/893e5bdf0499d714ddf77def68510bf2.jpg",
  },
  {
    id: 4,
    title: "Money heist",
    type: "PDF Document",
    savedType: "offline",
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

const SinglePlaylist = ({ data = videos, icons = true, filters }) => {
  const { updateQueryParam, getAllParams } = useQueryParam();

  const params = getAllParams();
  const { type, language, date } = filters;

  const isFilterApplied = type || language || date;

  // Filter data based on applied filters
  const filterData = (data) => {
    return data.filter((item) => {
      const matchesType = filters.type
        ? item.type.toLowerCase().includes(filters.type.toLowerCase())
        : true;
      const matchesLanguage = filters.language
        ? item.description
            .toLowerCase()
            .includes(filters.language.toLowerCase())
        : true;
      const matchesDate = filters.date
        ? (filters.date === "today" &&
            new Date(item.date).toDateString() === new Date().toDateString()) ||
          (filters.date === "this_week" &&
            new Date(item.date) >
              new Date(new Date() - 7 * 24 * 60 * 60 * 1000)) ||
          (filters.date === "this_month" &&
            new Date(item.date).getMonth() === new Date().getMonth())
        : true;
      return matchesType && matchesLanguage && matchesDate;
    });
  };

  const filteredVideos = filterData(videos);
  // Determine sorting strategy
  const sortedData =
    params.sort === "savedDate"
      ? [...data].sort((a, b) => parseDate(b.date) - parseDate(a.date)) // Sort by date
      : groupByType(data); // Group by type

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "3vh" }}>
      <Grid2 container>
        <Grid2 item xs={12}>
          {/* Conditionally rendered the filter close button here */}
          {isFilterApplied && (
            <>
              {["type", "language", "date"].map(
                (key) =>
                  filters[key] && (
                    <Button
                      key={key}
                      sx={{
                        marginBottom: "30px",
                        marginRight: "30px",
                        color: "#fff",
                        backgroundColor: "dimgray",
                      }}
                      className={`${key}-filter-button`}
                      variant="contained"
                      onClick={() => updateQueryParam(key, undefined)}
                      endIcon={<CloseIcon />}
                    >
                      <Typography variant="body1">
                        {key === "date"
                          ? filters[key]
                              .replace("_", " ")
                              .charAt(0)
                              .toUpperCase() +
                            filters[key].replace("_", " ").slice(1)
                          : filters[key].charAt(0).toUpperCase() +
                            filters[key].slice(1)}
                      </Typography>
                    </Button>
                  ),
              )}
            </>
          )}
        </Grid2>
      </Grid2>

      {(() => {
        // Determine the data to render based on sort and filters
        let renderData;
        if (params.sort === "savedDate") {
          renderData = [...filteredVideos].sort(
            (a, b) => parseDate(b.date) - parseDate(a.date),
          );
        } else if (params.sort === "type") {
          return Object.entries(groupByType(filteredVideos)).map(
            ([key, items]) => (
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
                    sx={{
                      fontWeight: "bold",
                      textTransform: "capitalize",
                      mb: 2,
                    }}
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
            ),
          );
        } else {
          renderData = filteredVideos;
        }

        return renderData.map((item) => {
          if (
            !(!(item.savedType === "offline") && params.tab === "downloads")
          ) {
            return (
              <PlaylistCard
                key={item.id}
                itemID={item.id}
                itemImage={item.image}
                itemType={item.type}
                itemSavedType={item.savedType}
                itemTitle={item.title}
                itemDate={item.date}
                itemDescription={item.description}
                icons={icons}
              />
            );
          }
        });
      })()}
    </Box>
  );
};

export default SinglePlaylist;
