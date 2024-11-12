import React from "react";

import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";

import TrendingCarousel from "../TrendingCarousel/TrendingCarousel";
import VideoCardFeatured from "../VideoCard/VideoCard";
import CardsFeatured from "./CardsFeatured/CardsFeatured";

const primeData = [
  {
    id: 1,
    image:
      "https://i.pinimg.com/originals/89/3e/5b/893e5bdf0499d714ddf77def68510bf2.jpg", // You can add image URL here
    title: "Video Title 1",
    description: "This is the description for Video 1.",
  },
  {
    id: 1,
    image: "https://i.ytimg.com/vi/g2F5RO6vNSs/hqdefault.jpg", // You can add image URL here
    title: "Video Title 2",
    description: "This is the description for Video 2.",
  },
  {
    id: 1,
    image:
      "https://i.pinimg.com/originals/89/3e/5b/893e5bdf0499d714ddf77def68510bf2.jpg", // You can add image URL here
    title: "Video Title 3",
    description: "This is the description for Video 3.",
  },
];

const VideoDatas = {
  thumbnail_url:
    "https://i.pinimg.com/originals/89/3e/5b/893e5bdf0499d714ddf77def68510bf2.jpg", // Dummy image
  title_en:
    "Fall in Love with Nature in an IslandFall in Love with Nature in an IslandFall in Love with Nature in an IslandFall in Love with Nature in an Island",
  view_count: 553000,
  released_date: "6 months ago",
  channelName: "Nature Channel",
};

const audioData = [
  {
    id: 1,
    image: "https://wallpapercave.com/wp/wp9050041.png",
    title: "Top 10 Must-Watch Anime on Crunchyroll for Every Fan",
    description: "Lorem ipsum dolor sit amet",
    logo: "/assets/AudioCardsImages/AnimeLogo.png",
  },
  {
    id: 2,
    image: "https://wallpapercave.com/wp/wp9050041.png",
    title: "Chill Vibes: Your Perfect Mood Booster",
    description: "Lorem ipsum dolor sit amet consectetur. Donec lectus.",
    logo: "/assets/AudioCardsImages/SpotifyLogo.png",
  },
  {
    id: 3,
    image: "https://wallpapercave.com/wp/wp9050041.png",
    title: "Exploring the Serenity of Forests: A Journey Into Nature's Heart",
    description: "Lorem ipsum dolor sit amet consectetur. Donec lectus.",
    logo: "/assets/AudioCardsImages/YoutubeLogo.png",
  },
  {
    id: 4,
    image: "https://wallpapercave.com/wp/wp9050041.png",
    title: "Mindful Conversations: Exploring Life, Growth, and Inspiration",
    description: "Lorem ipsum dolor sit amet consectetur. Donec lectus.",
    logo: "/assets/AudioCardsImages/logo.png",
  },
];

const FeaturedTab = () => {
  return (
    <Box sx={{ flexGrow: 1, margin: 3, borderRadius: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "stretch",
          py: "5vh",
          gap: 8,
          width: "100%",
          flexDirection: "row",
          margin: "0 auto",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <TrendingCarousel primeData={primeData} />
        </Box>

        <Grid container row={12} column={1} spacing={8}>
          {/* <VideoCardFeatured videoData={VideoDatas} size="large" /> */}
        </Grid>
      </Box>

      {/* <Box
        sx={{
          width: "100%",
          hgeight: "10vh",
          display: "flex",
          flexDirection: "row",
          margin: "0 auto",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <VideoCardFeatured videoData={VideoDatas} size="large" />
        <VideoCardFeatured videoData={VideoDatas} size="large" />
        <CardsFeatured cardsData={audioData} />
      </Box> */}
      <Grid container spacing={2} sx={{ width: "100%", height: "50vh" }}>
        <Grid
          item
          size={{ xs: 12, xl: 3, md: 6 }}
          sx={{ height: "100%", justifyItems: "center" }}
        >
          <VideoCardFeatured videoData={VideoDatas} size="large" />
        </Grid>
        <Grid
          item
          size={{ xs: 12, xl: 3, md: 6 }}
          sx={{ height: "100%", justifyItems: "center" }}
        >
          <VideoCardFeatured videoData={VideoDatas} size="large" />
        </Grid>
        <Grid
          item
          size={{ xs: 12, xl: 6, md: 12 }}
          sx={{ height: "100%", justifyItems: "center" }}
        >
          <CardsFeatured cardsData={audioData} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default FeaturedTab;
