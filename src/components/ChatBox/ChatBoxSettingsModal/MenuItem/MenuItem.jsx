import React from "react";

import { ArrowForwardIosRounded } from "@mui/icons-material";
import { Box, FormControlLabel, Radio, Typography } from "@mui/material";

export const ChatMenuItem = ({ menuItem }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        cursor: "pointer",
      }}
    >
      <Typography variant="body2">{menuItem}</Typography>
      <ArrowForwardIosRounded sx={{ fontSize: "1rem" }} />
    </Box>
  );
};

export const CallMenuItems = ({ menuItem }) => {
  return (
    <FormControlLabel value={menuItem} control={<Radio />} label={menuItem} />
  );
};
