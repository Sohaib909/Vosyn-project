"use client";

import React from "react";

import { Box, Grid2, Typography } from "@mui/material";

import LandingSearch from "@/components/Landing/LandingSearch/LandingSearch";
import TextAnimation from "@/components/TextAnimation/TextAnimation.jsx";

const Landing = () => {
  return (
    <Grid2
      container
      size={{ xs: 12, sm: 12, md: 8, xl: 7.5 }}
      spacing={4}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "48vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          Access Global Content,&nbsp;
        </Typography>
        <Box
          sx={{
            width: "420px",
            textAlign: "center",
            display: "inline-block",
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", textAlign: "left" }}
          >
            <TextAnimation />
          </Typography>
        </Box>
      </Box>
      <LandingSearch />
    </Grid2>
  );
};

export default Landing;
