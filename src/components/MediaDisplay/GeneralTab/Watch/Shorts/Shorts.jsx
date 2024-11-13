import React from "react";

import YouTubeIcon from "@mui/icons-material/YouTube";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

const shorts = [
  {
    title: "The Best Pasta Recipes",
    source: "@TastyFoodie",
    image:
      "https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?cs=srgb&dl=pexels-felixmittermeier-1459505.jpg&fm=jpg",
  },
  {
    title: "Quick & Easy Desserts",
    source: "@BakingQueen",
    image:
      "https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?cs=srgb&dl=pexels-felixmittermeier-1459505.jpg&fm=jpg",
  },
  {
    title: "Street Food Adventures",
    source: "@GlobalEats",
    image:
      "https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?cs=srgb&dl=pexels-felixmittermeier-1459505.jpg&fm=jpg",
  },
  {
    title: "Healthy Salad Ideas",
    source: "@GreenBites",
    image:
      "https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?cs=srgb&dl=pexels-felixmittermeier-1459505.jpg&fm=jpg",
  },
  {
    title: "Grilling Tips & Tricks",
    source: "@BBQMaster",
    image:
      "https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?cs=srgb&dl=pexels-felixmittermeier-1459505.jpg&fm=jpg",
  },
  {
    title: "Grilling Tips & Tricks",
    source: "@BBQMaster",
    image:
      "https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?cs=srgb&dl=pexels-felixmittermeier-1459505.jpg&fm=jpg",
  },
  {
    title: "Grilling Tips & Tricks",
    source: "@BBQMaster",
    image:
      "https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?cs=srgb&dl=pexels-felixmittermeier-1459505.jpg&fm=jpg",
  },
  {
    title: "Grilling Tips & Tricks",
    source: "@BBQMaster",
    image:
      "https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?cs=srgb&dl=pexels-felixmittermeier-1459505.jpg&fm=jpg",
  },
  {
    title: "Grilling Tips & Tricks",
    source: "@BBQMaster",
    image:
      "https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?cs=srgb&dl=pexels-felixmittermeier-1459505.jpg&fm=jpg",
  },
  {
    title: "Grilling Tips & Tricks",
    source: "@BBQMaster",
    image:
      "https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?cs=srgb&dl=pexels-felixmittermeier-1459505.jpg&fm=jpg",
  },
  {
    title: "Grilling Tips & Tricks",
    source: "@BBQMaster",
    image:
      "https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?cs=srgb&dl=pexels-felixmittermeier-1459505.jpg&fm=jpg",
  },
  {
    title: "Grilling Tips & Tricks",
    source: "@BBQMaster",
    image:
      "https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?cs=srgb&dl=pexels-felixmittermeier-1459505.jpg&fm=jpg",
  },
];

const ShortSection = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        overflow: "auto",
        gap: "1vw",
        pb: "3vh",
      }}
    >
      {shorts.map((short, index) => (
        <Card key={index} sx={{ minWidth: "12vw" }}>
          <CardMedia component="img" image={short.image} />
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography variant="subtitle1" component="div" color="white">
                {short.title}
              </Typography>
              <Typography variant="body2" color="White">
                {short.source}
              </Typography>
            </Box>
            <YouTubeIcon />
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default ShortSection;
