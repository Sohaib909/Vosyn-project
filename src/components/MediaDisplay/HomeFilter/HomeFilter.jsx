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
          backgroundColor: "#d9d9d9",
          borderRadius: "50%",
          padding: "8px",
          "&:hover": { backgroundColor: "#d9d9d9" },
        }}
        onClick={toggleFilters}
      >
        <TuneIcon sx={{ color: "black" }} />
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
              sx={{ fontSize: "1.25rem", color: "black", marginRight: "8px" }}
            >
              Filter:
            </Typography>
            <IconButton
              sx={{
                backgroundColor: "#d9d9d9",
                borderRadius: "50%",
                padding: "8px",
                "&:hover": { backgroundColor: "#d9d9d9" },
              }}
              onClick={toggleFilters}
            >
              <TuneIcon sx={{ color: "black" }} />
            </IconButton>
          </Box>

          {/* Source Platform Filter */}
          <Box className={styles.filterField}>
            <Typography
              sx={{
                fontSize: "1rem",
                color: "gray",
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
                    <Search sx={{ color: "#888" }} />
                  </InputAdornment>
                }
                renderValue={(selected) =>
                  selected ? (
                    <Typography
                      sx={{
                        fontSize: "18px",
                        color: "black",
                      }}
                    >
                      {selected}
                    </Typography>
                  ) : (
                    <Typography
                      sx={{
                        fontSize: "18px",
                        color: "#888",
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
                      backgroundColor: "white",
                      color: "black",
                      boxShadow: "none",
                      border: "1px solid black",
                    },
                  },
                }}
                sx={{
                  width: "350px",
                  borderRadius: "15px",
                  border: "1px solid black",
                  marginBottom: sourcePlatformOpen ? "200px" : "0",
                  "& .MuiSelect-icon": {
                    color: "#333",
                    fontSize: "24px",
                    visibility: "visible",
                  },
                }}
              >
                {SourcePlatformOptions.map((option, idx) => (
                  <MenuItem
                    sx={{
                      fontWeight: "bold",
                      "&:hover": { backgroundColor: "#f0f0f0" },
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
                color: "gray",
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
                    <Search sx={{ color: "#888" }} />
                  </InputAdornment>
                }
                renderValue={(selected) =>
                  selected ? (
                    <Typography
                      sx={{
                        fontSize: "18px",
                        color: "black",
                      }}
                    >
                      {selected}
                    </Typography>
                  ) : (
                    <Typography
                      sx={{
                        fontSize: "18px",
                        color: "#888",
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
                      backgroundColor: "white",
                      color: "black",
                      boxShadow: "none",
                      border: "1px solid black",
                    },
                  },
                }}
                sx={{
                  width: "350px",
                  borderRadius: "15px",
                  border: "1px solid black",
                  marginBottom: contentTypeOpen ? "250px" : "0",
                  "& .MuiSelect-icon": {
                    color: "#333",
                    fontSize: "24px",
                    visibility: "visible",
                  },
                }}
              >
                {ContentTypeOptions.map((option, idx) => (
                  <MenuItem
                    sx={{
                      fontWeight: "bold",
                      "&:hover": { backgroundColor: "#f0f0f0" },
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
                color: "gray",
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
                    <Search sx={{ color: "#888" }} />
                  </InputAdornment>
                }
                renderValue={(selected) =>
                  selected ? (
                    <Typography
                      sx={{
                        fontSize: "18px",
                        color: "black",
                      }}
                    >
                      {selected}
                    </Typography>
                  ) : (
                    <Typography
                      sx={{
                        fontSize: "18px",
                        color: "#888",
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
                      backgroundColor: "white",
                      color: "black",
                      boxShadow: "none",
                      border: "1px solid black",
                    },
                  },
                }}
                sx={{
                  width: "350px",
                  borderRadius: "15px",
                  border: "1px solid black",
                  "& .MuiSelect-icon": {
                    color: "#333",
                    fontSize: "24px",
                    visibility: "visible",
                  },
                }}
              >
                {GenreOptions.map((option, idx) => (
                  <MenuItem
                    sx={{
                      fontWeight: "bold",
                      backgroundColor: "white",
                      "&:hover": { backgroundColor: "#f0f0f0" },
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
