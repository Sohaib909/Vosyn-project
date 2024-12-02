"use client";

import React, { useEffect, useState } from "react";

import useQueryParam from "@/hooks/useQueryParam";
import { Box, Tab, Tabs } from "@mui/material";

const TabNavbar = () => {
  const { updateQueryParam, getAllParams } = useQueryParam();
  const params = getAllParams();
  const [selectedTab, setSelectedTab] = useState(params.tab || "featured");

  // when the user clicks on a tab, it should direct to that tab
  const handleSetSelectedTab = (event, tabName) => {
    updateQueryParam("tab", tabName.toLowerCase());
    setSelectedTab(tabName);
  };

  useEffect(() => {
    if (!params.tab) {
      updateQueryParam("tab", "featured");
      setSelectedTab("featured");
    } else {
      setSelectedTab(params.tab);
    }
  }, [params, updateQueryParam]);

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={selectedTab}
        variant="fullWidth"
        TabIndicatorProps={{
          sx: {
            backgroundColor: "var(--mui-palette-primary-main)",
            height: "6px",
            borderRadius: "20px",
          },
        }}
        sx={{
          "& .MuiTabs-flexContainer": {
            borderBottom: "6px solid var(--mui-palette-neutral-800)",
            mx: "1vw",
          },
          "& button": {
            mt: "2vh",
            mb: "3vh",
            borderRadius: "20px",
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
        onChange={handleSetSelectedTab}
      >
        <Tab label="Watch" sx={{ mr: "1vw" }} value="watch" />
        <Tab label="Listen" sx={{ mr: "1vw" }} value="listen" />
        <Tab label="Featured" sx={{ mr: "1vw" }} value="featured" />
        <Tab label="Read" sx={{ mr: "1vw" }} value="read" />
        <Tab label="My Channel" value="my channel" />
      </Tabs>
    </Box>
  );
};

export default TabNavbar;
