// PlaylistTabs.jsx
import React from "react";

import { Tab, Tabs } from "@mui/material";

import styles from "./PlaylistTabs.module.css";

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
      className={styles.playlistTabs}
      sx={{
        "&.MuiTabs-root": { overflow: "visible" },
        "& .MuiTab-root": {
          textTransform: "none",
          "&.Mui-selected": {
            borderBottom: "2px solid var(--mui-palette-primary-200)", // Underline on active
          },
        },
      }}
      value={activeTab}
      onChange={(e, newValue) => handleTabClick(newValue)} // Handle tab change
    >
      <Tab
        label={`All (${allContent})`}
        value="all"
        className={`${styles.navItemBtn} ${activeTab === "all" ? styles.active : ""}`}
        disableRipple
      />
      <Tab
        label={`Bookmarks (${bookmarkedContent})`}
        value="bookmarks"
        className={`${styles.navItemBtn} ${activeTab === "bookmarks" ? styles.active : ""}`}
        disableRipple
      />
      <Tab
        label={`Offline Viewer (${downloadedContent})`}
        value="downloads"
        className={`${styles.navItemBtn} ${activeTab === "downloads" ? styles.active : ""}`}
        disableRipple
      />
      <Tab
        label={`Playlists (${playlistContent})`}
        value="playlists"
        className={`${styles.navItemBtn} ${activeTab === "playlists" ? styles.active : ""}`}
        disableRipple
      />
    </Tabs>
  );
};

export default PlaylistTabs;
