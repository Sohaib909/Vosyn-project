// PlaylistTabs.jsx
import React from "react";

import { Tab, Tabs } from "@mui/material";

const PlaylistTabs = ({
  activeTab,
  handleTabClick,
  allContent,
  bookmarkedContent,
  downloadedContent,
  playlistContent,
}) => {
  return (
    <Tabs
      sx={{
        display: "flex",
        justifyContent: "space-between",
        position: "relative",
        gap: "10px",
        backgroundColor: "var(--joy-palette-neutral-800, #302f2f3e)",
        zIndex: 1,
        width: "100%",
        "&.MuiTabs-root": { overflow: "visible" },
        "& .MuiTab-root": {
          paddingBottom: "10px", // Space for underline
          textTransform: "none",
          flexGrow: 1,
          cursor: "pointer",
          color: "var(--mui-palette-neutral-400)",
          fontSize: "13px",
          fontWeight: 400,
          whiteSpace: "nowrap",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "&:hover": {
            color: "var(--mui-palette-primary-200)",
          },
          "&.Mui-selected": {
            color: "var(--mui-palette-neutral-25)",
            borderBottom: "2px solid var(--mui-palette-primary-200)",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: "-1px",
              left: 0,
              right: 0,
              height: "2px",
              backgroundColor: "var(--mui-palette-neutral-600)",
              zIndex: 2,
            },
            "&:hover::after": {
              backgroundColor: "var(--mui-palette-primary-200)",
            },
          },
        },
      }}
      value={activeTab}
      onChange={(e, newValue) => handleTabClick(newValue)} // Handle tab change
    >
      <Tab label={`All (${allContent})`} value="all" disableRipple />
      <Tab
        label={`Bookmarks (${bookmarkedContent})`}
        value="bookmarks"
        disableRipple
      />
      <Tab
        label={`Offline Viewer (${downloadedContent})`}
        value="downloads"
        disableRipple
      />
      <Tab
        label={`Playlists (${playlistContent})`}
        value="playlists"
        disableRipple
      />
    </Tabs>
  );
};

export default PlaylistTabs;
