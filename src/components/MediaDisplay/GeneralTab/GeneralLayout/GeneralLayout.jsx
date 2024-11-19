import React from "react";

import useQueryParam from "@/hooks/useQueryParam";
import { Grid2 } from "@mui/material";

import JumpIn from "@/components/MediaDisplay/ListenTab/JumpIn/JumpIn.jsx";
import YouMightAlsoLike from "@/components/MediaDisplay/ListenTab/YouMightAlsoLike/YouMightAlsoLike.jsx";

import HorizontalScrollDisplayContainer from "../../HorizontalScrollDisplayContainer/HorizontalScrollDisplayContainer";
import TrendingCarousel from "../../TrendingCarousel/TrendingCarousel";
import Built from "../Built/Built";
import SectionHeader from "../SectionHeader/SectionHeader";

const GeneralLayout = ({
  data,
  Component,
  OptionalComponent,
  handleSelection,
  handleBuilt,
  handleRecomend,
  tab,
}) => {
  const { getAllParams } = useQueryParam();
  const params = getAllParams();

  return (
    <Grid2
      container
      size={11}
      spacing={4}
      sx={{ paddingY: "3rem", width: "90vw" }}
    >
      <Grid2 spacing={2} container item size={12}>
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
          sx={{ height: "fit-content" }}
        >
          <SectionHeader
            heading="VosynVerse Selection"
            subheading="Daily selection powered by VosynVerse"
            handleClick={handleSelection}
          />

          <TrendingCarousel featuredMedia={data?.slice(0, 4)} />
        </Grid2>

        <Grid2 size={{ xs: 12, md: 6 }} sx={{ height: "30rem" }}>
          <Built data={data} Component={Component} handleClick={handleBuilt} />
        </Grid2>
      </Grid2>

      <Grid2 spacing={2} container item size={12}>
        {params.tab === "video" ? (
          <SectionHeader
            heading="Shorts"
            subheading="Recommended based on your recent watch pattern"
            handleClick={handleRecomend}
          />
        ) : params.tab == "text" ? (
          <SectionHeader
            heading="Entertainment & Media"
            subheading="Based on your interest"
            handleClick={handleRecomend}
          />
        ) : (
          <SectionHeader
            heading="You might also like: Society & Culture"
            subheading="Based on your interest"
            handleClick={handleRecomend}
          />
        )}

        {/*For Listen Tab, it shouldn't be a scroll bar and only should show 6 cards*/}
        {tab === "listen" ? (
          <YouMightAlsoLike data={data} Component={Component} />
        ) : (
          <HorizontalScrollDisplayContainer
            data={data}
            Component={OptionalComponent ? OptionalComponent : Component}
          />
        )}
      </Grid2>
    </Grid2>
  );
};

export default GeneralLayout;
