import React from "react";

import YouTubeIcon from "@mui/icons-material/YouTube";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

const short = {
  title: "The Best Pasta Recipes",
  source: "@TastyFoodie",
  image:
    "https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?cs=srgb&dl=pexels-felixmittermeier-1459505.jpg&fm=jpg",
};

const ShortSection = () => {
  return (
    <Card sx={{ width: "12vw" }}>
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
  );
};

export default ShortSection;
