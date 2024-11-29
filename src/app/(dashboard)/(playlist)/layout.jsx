import React from "react";

import { Box } from "@mui/material";

import PlaylistNavbar from "@/components/Playlist/PlaylistNavbar/PlaylistNavbar";

const layout = ({ children }) => {
  return (
    <Box sx={{ padding: "2vw 5vw", width: "100%" }}>
      <PlaylistNavbar />
      {children}
    </Box>
  );
};

export default layout;
