import React from "react";

import { Box, Typography } from "@mui/material";
import Image from "next/image";

const VABlobWithText = ({ text }) => {
  return (
    <Box sx={{ display: "flex", columnGap: "2rem" }}>
      <Image
        src={"https://placehold.co/60x60.png"}
        width={60}
        height={60}
        alt="placeholder image"
      />
      <Typography
        sx={{
          color: "var(--mui-palette-netural-200)",
          fontSize: "larger",
          fontWeight: "bold",
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default VABlobWithText;
