import React from "react";

import { Grid2 } from "@mui/material";

import JumpIn from "@/components/MediaDisplay/ListenTab/JumpIn/JumpIn.jsx";

import HorizontalScrollDisplayContainer from "../../HorizontalScrollDisplayContainer/HorizontalScrollDisplayContainer";
import TrendingCarousel from "../../TrendingCarousel/TrendingCarousel";
import Built from "../Built/Built";
import SectionHeader from "../SectionHeader/SectionHeader";

const GeneralLayout = ({
  data,
  Component,
  handleSelection,
  handleBuilt,
  tab,
}) => {
  return (
    <Grid2
      container
      size={11}
      spacing={4}
      sx={{ paddingY: "3rem", px: "1rem", width: "100%" }}
    >
      <Grid2 spacing={2} container item size={12}>
        {/* <HomeFilter /> */}
        <SectionHeader
          heading="Jump In"
          subheading="Jump into where you left off on"
        />

        {/*Listen Tab should only show 6 cards with grid layout*/}
        {tab === "listen" ? (
          <JumpIn data={data} Component={Component} />
        ) : (
          <HorizontalScrollDisplayContainer data={data} Component={Component} />
        )}
      </Grid2>

      <Grid2 item container spacing={4}>
        <Grid2
          container
          item
          size={{ xs: 12, md: 6 }}
          spacing={2}
          sx={{ height: "40rem" }}
        >
          <SectionHeader
            heading="VosynVerse Selection"
            subheading="Daily selection powered by VosynVerse"
            handleClick={handleSelection}
          />

          <TrendingCarousel featuredMedia={data?.slice(0, 4)} />
        </Grid2>

        <Grid2 size={{ xs: 12, md: 6 }} sx={{ height: "40rem" }}>
          <Built data={data} Component={Component} handleClick={handleBuilt} />
        </Grid2>
      </Grid2>

      <Grid2 spacing={2} container item size={12}>
        <SectionHeader
          heading="Recommended content"
          subheading="Recommended based on your recent watch pattern"
          handleClick={() => {}}
        />
        {tab === "listen" ? (
          <JumpIn data={data} Component={Component} />
        ) : (
          <HorizontalScrollDisplayContainer data={data} Component={Component} />
        )}
      </Grid2>
    </Grid2>
  );
};

export default GeneralLayout;
