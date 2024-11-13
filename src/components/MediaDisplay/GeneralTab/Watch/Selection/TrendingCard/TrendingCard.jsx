import React from "react";

import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Typography,
} from "@mui/material";

const TrendingCard = ({ data }) => {
  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: "20px",
        position: "relative",
        backgroundColor: "transparent",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
        overflow: "hidden",
        mt: "2vh",
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
              borderTopLeftRadius: "20px",
              borderTopRighttRadius: "20px",
              position: "absolute",
              top: "0",
              width: "100%",
            }}
          >
            {data.heading}
          </Typography>
          <CardMedia
            component="img"
            height="100%"
            image={data.image}
            alt={data.title}
            sx={{ objectFit: "cover", height: "100%" }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              maxHeight: "100%",
              color: "white",
              padding: "16px",
              py: "10px",
              boxSizing: "border-box",
              background:
                "linear-gradient(to bottom, rgba(0, 0, 0, 0.3) , rgba(0, 0, 0, 0.7))",
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              {data.title}
            </Typography>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default TrendingCard;
