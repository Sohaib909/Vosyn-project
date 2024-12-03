import React from "react";

import { Box, Grid2 } from "@mui/material";
import Grid from "@mui/material/Grid2";

import ComingSoon from "@/components/ComingSoon/ComingSoon";

import TrendingCarousel from "../TrendingCarousel/TrendingCarousel";
import VideoCardFeatured from "./VideoCardFeatured/VideoCardFeatured";

const VideoDatas = {
  thumbnail_url:
    "https://i.pinimg.com/originals/89/3e/5b/893e5bdf0499d714ddf77def68510bf2.jpg", // Dummy image
  title_en:
    "Fall in Love with Nature in an IslandFall in Love with Nature in an IslandFall in Love with Nature in an IslandFall in Love with Nature in an Island",
  view_count: 553000,
  released_date: "6 months ago",
  channelName: "Nature Channel",
};

const FeaturedTab = () => {
  return (
    <Box sx={{ position: "relative", width: "100%", justifyItems: "center" }}>
      <ComingSoon />
      <Grid2 container size={11} spacing={4} sx={{ paddingY: "3rem" }}>
        <Grid container item size={12} spacing={2}>
          <Grid2 container item size={9} spacing={2}>
            <TrendingCarousel />
          </Grid2>
          <Grid2 item container size={3}>
            <VideoCardFeatured videoData={VideoDatas} />
          </Grid2>
        </Grid>
        <Grid container item size={12} spacing={2}>
          <Grid2 container item size={3} spacing={2} sx={{ height: "25rem" }}>
            <VideoCardFeatured videoData={VideoDatas} />
          </Grid2>
          <Grid2 item container size={3}>
            <VideoCardFeatured videoData={VideoDatas} />
          </Grid2>

          <Grid2 container item size={6}>
            <Grid2 container item size={12} sx={{ height: "12" }}>
              <Grid2 container item size={6} spacing={2}>
                <VideoCardFeatured videoData={VideoDatas} />
              </Grid2>
              <Grid2 item container size={6}>
                <VideoCardFeatured videoData={VideoDatas} />
              </Grid2>
            </Grid2>
            <Grid2 container item size={12} sx={{ height: "12" }}>
              <Grid2 container item size={6} spacing={2}>
                <VideoCardFeatured videoData={VideoDatas} />
              </Grid2>
              <Grid2 item container size={6}>
                <VideoCardFeatured videoData={VideoDatas} />
              </Grid2>
            </Grid2>
          </Grid2>
        </Grid>
      </Grid2>
    </Box>
  );
};
export default FeaturedTab;
