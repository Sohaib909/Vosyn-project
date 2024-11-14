"use client";

import React, { useEffect, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SortByAlphaOutlinedIcon from "@mui/icons-material/SortByAlphaOutlined";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";

import useQueryParam from "../../../hooks/useQueryParam";

import styles from "./PlaylistNavbar.module.css";

const PlaylistHeader = ({ onFilterApply, openFolder, setOpenFolders }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAlphaOpen, setIsAlphaOpen] = useState(false);

  const handleSortClick = (event) => {
    setAnchorEl(event.currentTarget);
    setIsAlphaOpen(true);
  };

  const handleSortClose = () => {
    setAnchorEl(null);
    setIsAlphaOpen(false);
  };

  const { updateQueryParam, getAllParams } = useQueryParam();

  const params = getAllParams();

  const [layouts, setLayouts] = useState(params.tab || "list");

  const [activeTab, setActiveTab] = useState(params.tab || "all"); // Initially, no active tab

  const handleTabClick = (tabName) => {
    setOpenFolders(false);
    updateQueryParam("tab", tabName.toLowerCase());
    setActiveTab(tabName.toLowerCase()); // Set the clicked tab as active
  };

  useEffect(() => {
    if (!params.tab) {
      updateQueryParam("tab", "all");
      setActiveTab("all");
    }
  }, [params, updateQueryParam]);

  const handleLayoutChange = (_event, layout) => {
    console.log(layout);
    updateQueryParam("layout", layout);
    setLayouts(layout);
  };

  useEffect(() => {
    if (!params.layout) {
      updateQueryParam("layout", "list");
      setLayouts("list");
    }
  }, [params, updateQueryParam]);

  useEffect(() => {
    if (!params.layout) {
      updateQueryParam("layout", "list");
      setLayouts("list");
    }
  }, [params, updateQueryParam]);

  //variables to handle the count on the tabs

  const allContent = 20;
  const downloadedContent = 7;
  const bookmarkedContent = 6;
  const playlistContent = 7;

  const [open, setOpen] = useState(false); // State for modal visibility
  const [type, setType] = useState("");
  const [language, setLanguage] = useState("");
  const [date, setDate] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
    setIsMenuOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setIsMenuOpen(false);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    if (name === "type") setType(value);
    if (name === "language") setLanguage(value);
    if (name === "date") setDate(value);
    setType(event.target.value);
  };

  const handleApplyFilter = () => {
    onFilterApply(type);
    handleClose();
  };

  return (
    <Box className={styles.playlistHeader}>
      <Box className={styles.container}>
        <Box className={styles.playlistTitle}>
          <Typography variant="h2">Saved Content</Typography>
        </Box>
        <Box
          className={styles.navbar}
          display="flex"
          justifyContent="space-between"
          sx={{ overflowX: "scroll" }}
        >
          <Box className={styles.navbarList}>
            <Tabs
              className={styles.playlistTabs}
              sx={{ "&.MuiTabs-root": { overflow: "visible" } }}
            >
              <Tab
                label={`All (${allContent})`}
                className={`${styles.navItemBtn} ${activeTab === "all" ? "styles.active" : ""}`}
                onClick={() => handleTabClick("all")}
              ></Tab>
              <Tab
                label={`Bookmarks (${bookmarkedContent})`}
                className={`${styles.navItemBtn} ${activeTab === "bookmarks" ? "styles.active" : ""}`}
                onClick={() => handleTabClick("bookmarks")}
                disableTouchRipple
              ></Tab>
              <Tab
                label={`Offline Viewer (${downloadedContent})`}
                className={`${styles.navItemBtn} ${activeTab === "downloads" ? "styles.active" : ""}`}
                onClick={() => handleTabClick("downloads")}
                disableTouchRipple
              ></Tab>
              <Tab
                label={`Playlists (${playlistContent})`}
                className={`${styles.navItemBtn} ${activeTab === "playlists" ? "styles.active" : ""}`}
                onClick={() => handleTabClick("playlists")}
                disableTouchRipple
              ></Tab>
            </Tabs>
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
                  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                  },
                  "& .MuiInput-underline:before": {
                  },
                  "& .MuiInput-underline:after": {
                  },
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
            <Button
              className={styles.filterPlaylist}
              onClick={handleClickOpen}
              style={{
                backgroundColor: isMenuOpen ? "#fff" : "", // Change the background when menu is open
                margin: "0px 10px 0 10px",
              }}
            >
              <FilterListOutlinedIcon fontSize="large" />
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              maxWidth="xs" // Compact size
              fullWidth
              PaperProps={{
                sx: {
                  maxWidth: "600px",
                  padding: "16px",
                  position: "absolute", // Make it absolute
                  top: 245, // Position it aligned with the button (adjust as necessary)
                  right: 260, // Slight adjustment for spacing,
                  "& .MuiDialogContent-root": {
                    overflow: "hidden !important",
                    overflowY: "hidden !important",
                    padding: 2,
                  },
                  // Adding multiple levels of specificity
                  "& .MuiDialog-paper .MuiDialogContent-root": {
                    overflow: "hidden !important",
                    overflowY: "hidden !important",
                  },
                }, // Reduce the width
              }}
            >
              <Box className={styles.filterModal}>
                <Box className={styles.filterModalHeader}>
                  <Typography>Filter by</Typography>
                  <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                      position: "absolute",
                      right: 8,
                      top: 8,
                      color: (theme) => theme.palette.grey[500],
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
                <DialogContent className={styles.filterModalContent}>
                  <Box className={styles.filterModalOptions}>
                    {/* Type Filter */}
                    <Box item xs={12} sm={6} md={4}>
                      {" "}
                      {/* Reduce width to fit better */}
                      <FormControl fullWidth size="medium">
                        <InputLabel size="normal">Type</InputLabel>
                        <Select
                          value={type}
                          onChange={handleFilterChange}
                          name="type"
                          label="Type"
                          sx={{ width: "170px" }}
                        >
                          <MenuItem value={"video"}>Video</MenuItem>
                          <MenuItem value={"audio"}>Audio</MenuItem>
                          <MenuItem value={"text"}>Text</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>

                    {/* Language Filter */}
                    <Grid item xs={12} sm={6} md={4}>
                      <FormControl fullWidth>
                        <InputLabel>Language</InputLabel>
                        <Select
                          value={language}
                          onChange={handleFilterChange}
                          name="language"
                          label="Language"
                          sx={{ width: "150px" }}
                        >
                          <MenuItem value={"english"}>English</MenuItem>
                          <MenuItem value={"spanish"}>Spanish</MenuItem>
                          <MenuItem value={"french"}>French</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    {/* Date Filter */}
                    <Box item xs={8}>
                      <FormControl fullWidth>
                        <InputLabel>Date</InputLabel>
                        <Select
                          value={date}
                          onChange={handleFilterChange}
                          name="date"
                          label="Date"
                          sx={{ width: "170px" }}
                        >
                          <MenuItem value={"today"}>Today</MenuItem>
                          <MenuItem value={"this_week"}>This Week</MenuItem>
                          <MenuItem value={"this_month"}>This Month</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                </DialogContent>
              </Box>
              <DialogActions>
                <Button onClick={handleApplyFilter} color="primary">
                  Apply
                </Button>
              </DialogActions>
            </Dialog>
            <Box className={styles.filterButtons}>
              <ToggleButtonGroup
                className={styles.layout}
                aria-label="playlists layout"
                value={layouts}
                onChange={handleLayoutChange}
                exclusive
              >
                <ToggleButton
                  className={`${styles.toggle} ${layouts === "list" ? "styles.active" : ""}`}
                  value={"list"}
                  aria-label="list layout"
                  disableTouchRipple
                >
                  <ListAltOutlinedIcon />
                </ToggleButton>
                <ToggleButton
                  className={`${styles.toggle} ${layouts === "grid" ? "styles.active" : ""}`}
                  value={"grid"}
                  aria-label="grid layout"
                  disableTouchRipple
                >
                  <DashboardOutlinedIcon />
                </ToggleButton>
              </ToggleButtonGroup>
              <Button
                className={styles.sortAlpha}
                onClick={handleSortClick}
                style={{
                  backgroundColor: isAlphaOpen ? "#fff" : "", // Change the background when menu is open
                  margin: "0px 10px 0 10px",
                  Padding: "9px",
                  width: "50px", // Set a fixed width if needed
                  height: "50px", // Set a fixed height if needed
                }}
              >
                <SortByAlphaOutlinedIcon />
              </Button>
              <Menu
                sx={{
                  margin: "16px 0 0 0",
                  display: "flex",
                  justifyContent: "center",
                }}
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleSortClose}
                disableScrollLock={true}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center ",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <MenuItem dividers onClick={handleSortClose}>
                  By Bookmarked Date
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleSortClose}>By Upload Date</MenuItem>
                <Divider />
                <MenuItem onClick={handleSortClose}>Most Watched</MenuItem>
                <Divider />
                <MenuItem onClick={handleSortClose}>By Type</MenuItem>
              </Menu>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PlaylistHeader;
