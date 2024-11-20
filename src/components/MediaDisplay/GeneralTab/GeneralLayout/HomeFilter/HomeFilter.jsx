import React, { useState } from "react";
import { set } from "react-hook-form";

import TuneIcon from "@mui/icons-material/Tune";
import { Box, IconButton, Typography } from "@mui/material";

import HomeFilterMenuItem from "./HomeFilterMenuItem";

import styles from "./HomeFilter.module.css";

const FilterComponent = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const [sourcePlatform, setSourcePlatform] = useState("");
  const [contentType, setContentType] = useState("");
  const [genre, setGenre] = useState("");

  const [sourcePlatformOpen, setSourcePlatformOpen] = useState(false);
  const [contentTypeOpen, setContentTypeOpen] = useState(false);

  const SourcePlatformOptions = [
    "Spotify",
    "YouTube",
    "Netflix",
    "Amazon Prime",
    "Disney +",
  ];
  const ContentTypeOptions = [
    "Podcast",
    "Audiobooks",
    "Papers",
    "Movies",
    "TV Shows",
    "Shorts",
  ];
  const GenreOptions = ["Horror", "Comedy", "Romance", "Sports", "Action"];

  const toggleFilters = () => {
    if (showFilters) {
      setIsAnimating(true);
      setTimeout(() => {
        setShowFilters(false);
        setIsAnimating(false);
      }, 300);
    } else {
      setShowFilters(true);
    }
  };

  return (
    <Box className={styles.filterContainer}>
      {/* Filter Toggle Button */}
      <IconButton
        sx={{
          backgroundColor: "var(--mui-palette-background-paper)",
          borderRadius: "50%",
          padding: "8px",
          "&:hover": { backgroundColor: "var(--mui-palette-background-paper)" },
        }}
        onClick={toggleFilters}
      >
        <TuneIcon sx={{ color: "var(--mui-palette-text-primary)" }} />
      </IconButton>

      {showFilters && (
        <Box
          className={`${styles.filterOptions} ${isAnimating ? styles.hide : styles.show}`}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "50px",
            }}
          >
            <Typography
              sx={{
                fontSize: "1.25rem",
                color: "var(--mui-palette-text-primary)",
                marginRight: "8px",
              }}
            >
              Filter:
            </Typography>
            <IconButton
              sx={{
                backgroundColor: "var(--mui-palette-background-paper)",
                borderRadius: "50%",
                padding: "8px",
                "&:hover": {
                  backgroundColor: "var(--mui-palette-background-paper)",
                },
              }}
              onClick={toggleFilters}
            >
              <TuneIcon sx={{ color: "var(--mui-palette-text-primary)" }} />
            </IconButton>
          </Box>
          <Box sx={{ marginBottom: sourcePlatformOpen ? "-40px" : "0" }}>
            <HomeFilterMenuItem
              value={sourcePlatform}
              setValue={setSourcePlatform}
              options={SourcePlatformOptions}
              label="Source Platform"
              isOpen={sourcePlatformOpen}
              setIsOpen={setSourcePlatformOpen}
            />
          </Box>
          <HomeFilterMenuItem
            value={contentType}
            setValue={setContentType}
            options={ContentTypeOptions}
            label="Content Type"
            isOpen={contentTypeOpen}
            setIsOpen={setContentTypeOpen}
          />
          <HomeFilterMenuItem
            value={genre}
            setValue={setGenre}
            options={GenreOptions}
            label="Genre"
            isOpen={setGenre}
            setIsOpen={setGenre}
          />
        </Box>
      )}
    </Box>
  );
};

export default FilterComponent;
