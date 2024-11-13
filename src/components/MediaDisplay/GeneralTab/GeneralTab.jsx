import React from "react";

import { Grid2 } from "@mui/material";

import HorizontalScrollDisplayContainer from "../HorizontalScrollDisplayContainer/HorizontalScrollDisplayContainer";
import TrendingCarousel from "../TrendingCarousel/TrendingCarousel";
import Built from "./Built/Built";
import SectionHeader from "./SectionHeader/SectionHeader";

const GeneralTab = ({ data, Component }) => {
  return (
    <Grid2 container size={11} spacing={4} sx={{ paddingY: "3rem" }}>
      <Grid2 spacing={2} container item size={12}>
        <SectionHeader
          heading="Jump In"
          subheading="Jump into where you left off on"
        />

        <HorizontalScrollDisplayContainer data={data} Component={Component} />
      </Grid2>

      <Grid2 item container spacing={4}>
        <Grid2
          container
          item
          size={{ xs: 12, md: 6 }}
          spacing={2}
          sx={{ height: "fit-content" }}
        >
          <SectionHeader
            heading="VosynVerse Selection"
            subheading="Daily selection powered by VosynVerse"
          />

          <TrendingCarousel featuredMedia={data?.slice(0, 4)} />
        </Grid2>

        <Grid2 size={{ xs: 12, md: 6 }} sx={{ height: "30rem" }}>
          <Built data={data} Component={Component} />
        </Grid2>
      </Grid2>

      <Grid2 spacing={2} container item size={12}>
        <SectionHeader
          heading="Shorts"
          subheading="Recommended based on your recent watch pattern"
        />

        <HorizontalScrollDisplayContainer data={data} Component={Component} />
      </Grid2>
    </Grid2>
  );
};

export default GeneralTab;
