"use client";

import React from "react";

import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Typography } from "@mui/material";

const Folder = ({ open, data }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        bgcolor: "var(--mui-palette-neutral-800)",
        py: "2vh",
        px: "0.5vw",
        borderRadius: "15px",
        cursor: "pointer",
      }}
      onClick={open}
    >
      <FolderOutlinedIcon />
      <Typography sx={{ px: "0.5vw" }}>{data.name}</Typography>
      <MoreVertIcon />
    </Box>
  );
};

export default Folder;
