import React, { useRef } from "react";
import { useEffect, useState } from "react";

import { Grid2, Stack } from "@mui/material";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";

const TrendingCarousel = ({ featuredMedia }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const imageIndexRef = useRef(imageIndex);
  const autoChangeRef = useRef(null); // Reference to the interval for automatic change

  const router = useRouter();

  useEffect(() => {
    autoChangeRef.current = setInterval(() => {
      imageIndexRef.current =
        (imageIndexRef.current + 1) % featuredMedia?.length;
      setImageIndex(imageIndexRef.current);
    }, 2000);

    return () => clearInterval(autoChangeRef.current);
  });

  const handleDotClick = (e, index) => {
    e.stopPropagation();

    setImageIndex(index);
    imageIndexRef.current = index; // Update reference to prevent automatic transition conflict

    // Clear and restart the automatic interval after a delay
    clearInterval(autoChangeRef.current);
  };

  const handleCardClick = () => {
    router.push(`/video/${featuredMedia?.at(imageIndex)?.document?.id}`);
  };

  return (
    <Grid2
      size={{ xs: 12, sm: 12, md: 8 }}
      sx={{ minHeight: "20rem", maxHeight: "25rem" }}
      key={featuredMedia?.at(imageIndex)?.document?.id}
      onClick={handleCardClick}
    >
      <Card
        sx={{
          position: "relative",
          "&:hover": {
            boxShadow: "0px 3px 6px var(--mui-palette-primary-550)",
          },
          borderRadius: "12px",
          height: "100%",
        }}
      >
        <CardActionArea sx={{ height: "100%" }}>
          <CardMedia
            image={
              featuredMedia?.at(imageIndex)?.document?.thumbnail_url ||
              "https://via.placeholder.com/140"
            }
            alt={featuredMedia?.at(imageIndex)?.document?.titles?.at(0)}
            component="img"
            sx={{ borderRadius: "12px", height: "100%" }}
          />
          <CardContent
            sx={{
              width: "inherit",
              position: "absolute",
              display: "flex",
              columnGap: "1rem",
              alignItems: "center",
              justifyContent: "space-between",
              px: "1rem",
              bottom: "0",
              borderRadius: "0 0px 12px 12px",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              backdropFilter: "blur(5px)",
            }}
          >
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{
                textWrap: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {featuredMedia?.at(imageIndex)?.document?.titles?.at(0)}
            </Typography>
            <Stack direction="row" spacing={1}>
              {featuredMedia?.map((_, i) => (
                <Box
                  key={i}
                  sx={{
                    width: imageIndex === i ? "16px" : "8px",
                    height: "8px",
                    backgroundColor: "#DFDFDF",
                    borderRadius: imageIndex === i ? "8px" : "50%",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                  onClick={(e) => handleDotClick(e, i)}
                />
              ))}
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid2>
  );
};

export default TrendingCarousel;
