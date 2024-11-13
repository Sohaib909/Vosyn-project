import React from "react";

import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Typography,
} from "@mui/material";

const PrimaryComponent = ({ trending }) => {
  return (
    <Box>
      <Card
        sx={{
          width: "90%",
          borderRadius: "20px",
          position: "relative",
          backgroundColor: "transparent",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
          overflow: "hidden",
        }}
      >
        <CardActionArea sx={{ height: "100%" }}>
          <Box sx={{ position: "relative", height: "100%" }}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                bgcolor: "var(--mui-palette-neutral-800)",
                fontWeight: "bold",
                fontSize: "1.1rem",
                textAlign: "center",
                py: "3px",
                borderRadius: "20px",
                position: "absolute",
                top: "0",
                width: "100%",
              }}
            >
              Trending
            </Typography>
            <CardMedia
              component="img"
              height="100%"
              image={trending.image}
              alt={trending.title}
              sx={{ objectFit: "cover", height: "100%" }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                maxHeight: "100%",
                padding: "16px",
                pt: "22px",
                pb: "13px",
                boxSizing: "border-box",
                background:
                  "linear-gradient(to bottom, rgba(0, 0, 0, 0.2) , rgba(0, 0, 0, 0.6))",
              }}
            >
              <Typography
                variant="h5"
                component="div"
                sx={{
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              >
                {trending.title}
              </Typography>
            </Box>
          </Box>
        </CardActionArea>
      </Card>
      <Typography
        variant="h6"
        component="div"
        sx={{
          fontWeight: "bold",
          pt: "5vh",
        }}
      >
        About this episode
      </Typography>
      <Typography component="p">{trending.subtitle}</Typography>
      <Typography
        component="p"
        sx={{
          mt: "5px",
          opacity: "0.8",
        }}
      >
        {trending.title}
      </Typography>
      <Typography
        component="p"
        sx={{
          mt: "2vh",
          maxWidth: "60%",
        }}
      >
        {trending.description}
      </Typography>
      <Typography
        component="p"
        sx={{
          mt: "2vh",
          opacity: "0.8",
        }}
      >
        {trending.date}
      </Typography>
    </Box>
  );
};

export default PrimaryComponent;
