import React from "react";

import Grid from "@mui/material/Grid2";

import CardFeatured from "./CardFeatured/CardFeatured";

const AudioCardsGrid = ({ cardsData }) => {
  return (
    <Grid
      container
      spacing={2}
      sx={{ height: "100%", alignContent: "space-around" }}
    >
      {cardsData.map((cardData, i) => {
        return (
          <Grid
            size={{ xs: 12, md: 6 }}
            sx={{ justifyItems: "center" }}
            key={i}
          >
            <CardFeatured cardData={cardData} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default AudioCardsGrid;
