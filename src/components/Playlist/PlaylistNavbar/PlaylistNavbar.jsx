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
import FilterLayoutButtons from "./NavButtons/FilterLayoutButton";
import PlaylistTabs from "./PlaylistTabs/PlaylistTabs";

import styles from "./PlaylistNavbar.module.css";

const PlaylistHeader = ({ onFilterApply, openFolder, setOpenFolders }) => {
  const { updateQueryParam, getAllParams } = useQueryParam();
  const params = getAllParams();
  const [activeTab, setActiveTab] = useState(params.tab || "all"); // Initially, no active tab

  const handleTabClick = (tabName) => {
    //setOpenFolders(false);
    updateQueryParam("tab", tabName.toLowerCase());
    setActiveTab(tabName.toLowerCase()); // Set the clicked tab as active
  };

  useEffect(() => {
    if ((!params.tab, params.layout)) {
      updateQueryParam("tab", "all");
      setActiveTab("all");
      updateQueryParam("layout", "list");
      setLayouts("list");
    }
  }, [params, updateQueryParam]);

  //variables to handle the count on the tabs

  const allContent = 20;
  const downloadedContent = 7;
  const bookmarkedContent = 6;
  const playlistContent = 7;

  return (
    <Box className={styles.playlistHeader}>
      <Box className={styles.container}>
        <Box className={styles.playlistTitle}>
          <Typography variant="h2">Saved Content</Typography>
        </Box>
        <Box
          className={styles.navbar}
          sx={{
            overflowX: "scroll",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box className={styles.navbarList}>
            <PlaylistTabs
              activeTab={activeTab}
              handleTabClick={handleTabClick}
              allContent={allContent}
              bookmarkedContent={bookmarkedContent}
              downloadedContent={downloadedContent}
              playlistContent={playlistContent}
            />
            <Box className={styles.playlistSearchContainer}>
              {" "}
              <TextField
                className={styles.playlistSearch}
                type="text"
                variant="standard"
                sx={{
                  input: {
                    color: "white",
                    padding: "8px 0",
                  },
                  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {},
                  "& .MuiInput-underline:before": {},
                  "& .MuiInput-underline:after": {},
                }}
                slotProps={{
                  input: {
                    "&.MuiInputBase-input": {
                      height: "1.8rem",
                    },
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button className={styles.searchIcon}>
                          <SearchOutlinedIcon />
                        </Button>
                      </InputAdornment>
                    ),
                  },
                  htmlInput: {
                    "aria-label": "search bar",
                  },
                }}
              />
            </Box>
            <FilterLayoutButtons onFilterApply={onFilterApply} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PlaylistHeader;
