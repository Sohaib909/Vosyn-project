"use client";

import React, { useEffect, useState } from "react";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

import useQueryParam from "../../../hooks/useQueryParam";
import FilterLayoutButtons from "./FilterLayoutButton/FilterLayoutButton";
import PlaylistTabs from "./PlaylistTabs/PlaylistTabs";

const PlaylistHeader = ({ filters }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { updateQueryParam, getAllParams } = useQueryParam();
  const params = getAllParams();
  const [activeTab, setActiveTab] = useState(params.tab || "all");

  const handleTabClick = (tabName) => {
    updateQueryParam("tab", tabName.toLowerCase());
    setActiveTab(tabName.toLowerCase());
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      updateQueryParam("playlist_query", searchTerm);
    }
  };
  const handleSearchClick = () => {};

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (!params.tab) {
      updateQueryParam("tab", "all");
    }
    if (!params.layout) {
      updateQueryParam("layout", "list");
    }
  }, [params, updateQueryParam]);

  const allContent = 20;
  const downloadedContent = 7;
  const bookmarkedContent = 6;
  const playlistContent = 7;

  return (
    <Box
      sx={{
        ".container": {
          top: 0,
          zIndex: -0.1,
          backgroundColor: "transparent",
        },
        ".playlistTitle": {
          color: "var(--mui-palette-neutral-100)",
        },
        ".playlistTitle h2": {
          fontSize: "40px",
        },
        ".navbar": {
          width: "inherit",
          padding: "10px 0",
          display: "flex",
          justifyContent: "space-evenly",
          gap: "10px",
          margin: "2rem 0",
          overflowX: "scroll",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
        ".navbarList": {
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "25px",
          padding: 0,
          margin: 0,
          paddingBottom: "10px",
        },
        ".playlistSearchContainer": {
          backgroundColor: "inherit",
          width: "70%",
        },
        ".playlistSearch": {
          color: "var(--mui-palette-neutral-25)",
          paddingBottom: "10px",
          width: "105%",
        },
        ".searchIcon": {
          justifyContent: "flex-end",
          paddingRight: 0,
          svg: {
            color: "var(--mui-palette-neutral-600)",
          },
        },
      }}
    >
      <Box className="container">
        <Box className="playlistTitle">
          <Typography variant="h2">Saved Content</Typography>
        </Box>
        <Box
          className="navbar"
          sx={{
            overflowX: "scroll",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box className="navbarList">
            <PlaylistTabs
              activeTab={activeTab}
              handleTabClick={handleTabClick}
              allContent={allContent}
              bookmarkedContent={bookmarkedContent}
              downloadedContent={downloadedContent}
              playlistContent={playlistContent}
            />
            <Box className="playlistSearchContainer">
              <TextField
                className="playlistSearch"
                type="text"
                variant="standard"
                value={searchTerm}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                sx={{
                  input: {
                    color: "white",
                    padding: "8px 0",
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        className="searchIcon"
                        onClick={handleSearchClick}
                      >
                        <SearchOutlinedIcon />
                      </Button>
                    </InputAdornment>
                  ),
                }}
                inputProps={{
                  "aria-label": "search bar",
                }}
              />
            </Box>
            <FilterLayoutButtons filters={filters} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PlaylistHeader;
