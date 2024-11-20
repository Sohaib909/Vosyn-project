import React, { useState } from "react";

import { Search } from "@mui/icons-material";
import TuneIcon from "@mui/icons-material/Tune";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

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
    "Youtube",
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

          {/* Source Platform Filter */}
          <Box className={styles.filterField}>
            <Typography
              sx={{
                fontSize: "1rem",
                color: "var(--mui-palette-text-secondary)",
                marginBottom: "10px",
                fontWeight: 500,
              }}
            >
              Source Platform:
            </Typography>
            <FormControl fullWidth>
              <Select
                value={sourcePlatform}
                onChange={(e) => setSourcePlatform(e.target.value)}
                onOpen={() => setSourcePlatformOpen(true)}
                onClose={() => setSourcePlatformOpen(false)}
                displayEmpty
                startAdornment={
                  <InputAdornment position="start">
                    <Search
                      sx={{ color: "var(--mui-palette-text-disabled)" }}
                    />
                  </InputAdornment>
                }
                renderValue={(selected) =>
                  selected ? (
                    <Typography
                      sx={{
                        fontSize: "18px",
                        color: "var(--mui-palette-text-primary)",
                      }}
                    >
                      {selected}
                    </Typography>
                  ) : (
                    <Typography
                      sx={{
                        fontSize: "18px",
                        color: "var(--mui-palette-text-disabled)",
                        textAlign: "center",
                        width: "100%",
                        paddingRight: "25px",
                      }}
                    >
                      Search Filters
                    </Typography>
                  )
                }
                MenuProps={{
                  PaperProps: {
                    sx: {
                      backgroundColor: "var(--mui-palette-background-paper)",
                      color: "var(--mui-palette-text-primary)",
                      boxShadow: "none",
                      border: "1px solid var(--mui-palette-divider)",
                    },
                  },
                }}
                sx={{
                  width: "350px",
                  borderRadius: "15px",
                  border: "1px solid var(--mui-palette-divider)",
                  marginBottom: sourcePlatformOpen ? "200px" : "0",
                  "& .MuiSelect-icon": {
                    color: "var(--mui-palette-text-primary)",
                    fontSize: "24px",
                    visibility: "visible",
                  },
                }}
              >
                {SourcePlatformOptions.map((option, idx) => (
                  <MenuItem
                    sx={{
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "var(--mui-palette-action-hover)",
                      },
                    }}
                    key={idx}
                    value={option}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Content Type Filter */}
          <Box className={styles.filterField}>
            <Typography
              sx={{
                fontSize: "1rem",
                color: "var(--mui-palette-text-secondary)",
                marginBottom: "10px",
                fontWeight: 500,
              }}
            >
              Content Type:
            </Typography>
            <FormControl fullWidth>
              <Select
                value={contentType}
                onChange={(e) => setContentType(e.target.value)}
                onOpen={() => setContentTypeOpen(true)}
                onClose={() => setContentTypeOpen(false)}
                displayEmpty
                startAdornment={
                  <InputAdornment position="start">
                    <Search
                      sx={{ color: "var(--mui-palette-text-disabled)" }}
                    />
                  </InputAdornment>
                }
                renderValue={(selected) =>
                  selected ? (
                    <Typography
                      sx={{
                        fontSize: "18px",
                        color: "var(--mui-palette-text-primary)",
                      }}
                    >
                      {selected}
                    </Typography>
                  ) : (
                    <Typography
                      sx={{
                        fontSize: "18px",
                        color: "var(--mui-palette-text-disabled)",
                        textAlign: "center",
                        width: "100%",
                        paddingRight: "25px",
                      }}
                    >
                      Search Filters
                    </Typography>
                  )
                }
                MenuProps={{
                  PaperProps: {
                    sx: {
                      backgroundColor: "var(--mui-palette-background-paper)",
                      color: "var(--mui-palette-text-primary)",
                      boxShadow: "none",
                      border: "1px solid var(--mui-palette-divider)",
                    },
                  },
                }}
                sx={{
                  width: "350px",
                  borderRadius: "15px",
                  border: "1px solid var(--mui-palette-divider)",
                  marginBottom: contentTypeOpen ? "250px" : "0",
                  "& .MuiSelect-icon": {
                    color: "var(--mui-palette-text-primary)",
                    fontSize: "24px",
                    visibility: "visible",
                  },
                }}
              >
                {ContentTypeOptions.map((option, idx) => (
                  <MenuItem
                    sx={{
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "var(--mui-palette-action-hover)",
                      },
                    }}
                    key={idx}
                    value={option}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Genre Filter */}
          <Box className={styles.filterField}>
            <Typography
              sx={{
                fontSize: "1rem",
                color: "var(--mui-palette-text-secondary)",
                marginBottom: "10px",
                fontWeight: 500,
              }}
            >
              Genre:
            </Typography>
            <FormControl fullWidth>
              <Select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                displayEmpty
                startAdornment={
                  <InputAdornment position="start">
                    <Search
                      sx={{ color: "var(--mui-palette-text-disabled)" }}
                    />
                  </InputAdornment>
                }
                renderValue={(selected) =>
                  selected ? (
                    <Typography
                      sx={{
                        fontSize: "18px",
                        color: "var(--mui-palette-text-primary)",
                      }}
                    >
                      {selected}
                    </Typography>
                  ) : (
                    <Typography
                      sx={{
                        fontSize: "18px",
                        color: "var(--mui-palette-text-disabled)",
                        textAlign: "center",
                        width: "100%",
                        paddingRight: "25px",
                      }}
                    >
                      Search Filters
                    </Typography>
                  )
                }
                MenuProps={{
                  PaperProps: {
                    sx: {
                      backgroundColor: "var(--mui-palette-background-paper)",
                      color: "var(--mui-palette-text-primary)",
                      boxShadow: "none",
                      border: "1px solid var(--mui-palette-divider)",
                    },
                  },
                }}
                sx={{
                  width: "350px",
                  borderRadius: "15px",
                  border: "1px solid var(--mui-palette-divider)",
                  "& .MuiSelect-icon": {
                    color: "var(--mui-palette-text-primary)",
                    fontSize: "24px",
                    visibility: "visible",
                  },
                }}
              >
                {GenreOptions.map((option, idx) => (
                  <MenuItem
                    sx={{
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "var(--mui-palette-action-hover)",
                      },
                    }}
                    key={idx}
                    value={option}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default FilterComponent;
