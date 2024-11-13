import React from "react";

import { Box, Grid2, Typography } from "@mui/material";

const SectionHeader = ({ heading, subheading }) => {
  return (
    <Grid2 size={12} sx={{ height: "fit-content" }}>
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        {heading}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          opacity: "0.7",
        }}
      >
        <Typography variant="subtitle1">{subheading}</Typography>
        <Typography
          variant="subtitle1"
          sx={{ textDecoration: "underline", cursor: "pointer" }}
        >
          more
        </Typography>
      </Box>
    </Grid2>
  );
};

export default SectionHeader;
