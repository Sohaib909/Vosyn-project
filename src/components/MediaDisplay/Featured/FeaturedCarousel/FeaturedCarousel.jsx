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

const PrimaryComponent = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const imageIndexRef = useRef(imageIndex);
  const autoChangeRef = useRef(null); // Reference to the interval for automatic change

  useEffect(() => {
    autoChangeRef.current = setInterval(() => {
      imageIndexRef.current = (imageIndexRef.current + 1) % primeData.length;
      setImageIndex(imageIndexRef.current);
    }, 2000);

    return () => clearInterval(autoChangeRef.current);
  }, []);

  const handleDotClick = (index) => {
    setImageIndex(index);
    imageIndexRef.current = index; // Update reference to prevent automatic transition conflict

    // Clear and restart the automatic interval after a delay
    clearInterval(autoChangeRef.current);
    autoChangeRef.current = setInterval(() => {
      imageIndexRef.current = (imageIndexRef.current + 1) % primeData.length;
      setImageIndex(imageIndexRef.current);
    }, 2000);
  };

  return (
    <Box sx={{ maxWidth: "100%" }}>
      <Grid2
        sx={{ maxWidth: "100%" }}
        item
        xs={12}
        sm={6}
        md={4}
        key={primeData[imageIndex].id}
      >
        <Card
          sx={{
            maxWidth: "100%",
            minHeight: "40vh",
            borderRadius: 2,
            transition: "transform 0.2s, box-shadow 0.2s",
            position: "relative",
            backgroundColor: "transparent",
          }}
        >
          <CardActionArea sx={{ height: "auto" }}>
            <Box sx={{ position: "relative" }}>
              <CardMedia
                component="img"
                height="140"
                image={
                  primeData[imageIndex].image ||
                  "https://via.placeholder.com/140"
                }
                alt={primeData[imageIndex].title}
                sx={{ objectFit: "cover", height: "32vh" }}
              />
            </Box>
            <CardContent
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backdropFilter: "blur(5px)",
              }}
            >
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{
                  padding: "2px",
                  borderRadius: 2,
                  fontSize: 30,
                  marginBottom: "20px",
                  color: "white",
                }}
              >
                {primeData[imageIndex].title}
              </Typography>
              <Stack direction="row" spacing={1}>
                {primeData.map((image, i) => (
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
                    onClick={() => handleDotClick(i)}
                  />
                ))}
              </Stack>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid2>
    </Box>
  );
};

export default PrimaryComponent;
