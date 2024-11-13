"use client";

import React, { useState } from "react";

import { Add } from "@mui/icons-material";
import { Box, Tab, Tabs } from "@mui/material";

const ScrollTab = () => {
  const [selectedTab, setSelectedTab] = useState("All");

  const handleSelectedTab = (event, tabName) => {
    setSelectedTab(tabName);
  };

  return (
    <Box
      sx={{
        width: "100%",
        mt: "1vh",
      }}
    >
      <Tabs
        value={selectedTab}
        variant="scrollable"
        TabIndicatorProps={{
          sx: {
            display: "none",
          },
        }}
        sx={{
          "& .MuiTabs-scrollButtons.Mui-disabled": {
            opacity: 0.3,
            cursor: "auto",
          },
          "& button": {
            py: "5px",
            mt: "5px",
            minHeight: "auto",
            height: "auto",
            borderRadius: "15px",
            fontWeight: "bold",
            bgcolor: "transparent",
            border: "1px solid var(--mui-palette-primary-main)",
          },
          "& button:hover": {
            bgcolor: "var(--mui-palette-primary-600)",
          },
          "& button.Mui-selected": {
            bgcolor: "var(--mui-palette-primary-main)",
            color: "white",
          },
        }}
        onChange={handleSelectedTab}
      >
        <Tab label="All" sx={{ mr: "0.5vw" }} value="All" />
        <Tab label="Watched" sx={{ mr: "0.5vw" }} value="Watched" />
        <Tab label="Latest" sx={{ mr: "0.5vw" }} value="Latest" />
        <Tab label="Community" sx={{ mr: "0.5vw" }} value="Community" />
        <Tab label="Friend list" sx={{ mr: "0.5vw" }} value="Friend list" />
        <Tab icon={<Add />} aria-label="Add Tab" value="Add Tab" />
      </Tabs>
    </Box>
  );
};

export default ScrollTab;
