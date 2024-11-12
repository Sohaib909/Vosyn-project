import React from "react";

import { Grid2, Typography } from "@mui/material";

import ProfileImage from "../ProfileImage/ProfileImage";
import AICard from "./AICard/AICard";
import LandingSearch from "./LandingSearch/LandingSearch";

const dummyCardData = [
  {
    id: 1,
    title: "Discover & Enjoy Content",
    content: "Best action movie from India.",
  },
  {
    id: 2,
    title: "Upload a Photo",
    content: "What does this sign say?",
  },
  {
    id: 3,
    title: "Global Research",
    content: "Show me trending studies from Japan.",
  },
];

const Landing = () => {
  return (
    <Grid2
      container
      size={{ xs: 12, sm: 12, md: 8, xl: 6 }}
      spacing={4}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "78vh",
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "center" }}>
        Access Global Content, in your Language.
      </Typography>
      <LandingSearch />

      <Grid2
        container
        size={12}
        spacing={2}
        sx={{ display: "flex", px: "2rem" }}
      >
        <Grid2 item size={{ xs: 2, sm: 1 }}>
          <ProfileImage width="2.5rem" />
        </Grid2>

        <Grid2
          container
          item
          size={{ xs: 12, sm: 11 }}
          spacing={2}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          {dummyCardData?.map((item) => (
            <AICard key={item?.id} aiCardItem={item} />
          ))}
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default Landing;
