import React from "react";

import { Box } from "@mui/material";

import ComingSoon from "@/components/ComingSoon/ComingSoon";
import PlaylistNavbar from "@/components/Playlist/PlaylistNavbar/PlaylistNavbar";

const layout = ({ children }) => {
  return (
    <Box sx={{ width: "100%", overflowY: "hidden" }}>
      <ComingSoon ht={false} />

      <Box sx={{ padding: "2vw 5vw", width: "100%" }}>
        <PlaylistNavbar />
        {children}
      </Box>
    </Box>
  );
};

export default layout;
