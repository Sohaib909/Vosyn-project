import React from "react";
import { Grid2 } from "@mui/material";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";
import { YouTube } from "@mui/icons-material"; // Import YouTube icon
import { useRouter } from "next/navigation";
import useQueryParam from "@/hooks/useQueryParam";

const TrendingCarousel = ({ featuredMedia }) => {
  const router = useRouter();
  const { getAllParams } = useQueryParam();
  const params = getAllParams();

  // Click handler for navigating to the relevant link
  const handleCardClick = () => {
    router.push(`/${params.tab}/${featuredMedia?.[0]?.document?.id}`);
  };

  return (
    <Grid2
      size={12}
      sx={{ minHeight: "20rem", maxHeight: "25rem" }}
      key={featuredMedia?.[0]?.document?.id}
      onClick={handleCardClick}
    >
      <Card
        sx={{
          position: "relative",
          "&:hover": {
            boxShadow: "0rem 0.1875rem 0.375rem var(--mui-palette-primary-550)", // Converted 3px, 6px
          },
          borderRadius: "0.75rem", // Converted 12px
          height: "100%",
        }}
      >
        <CardActionArea sx={{ height: "100%" }}>
          <CardMedia
            image={
              "https://i.pinimg.com/originals/89/3e/5b/893e5bdf0499d714ddf77def68510bf2.jpg" ||
              "https://via.placeholder.com/140"
            }
            alt={featuredMedia?.[0]?.document?.titles?.[0]}
            component="img"
            sx={{ borderRadius: "0.75rem", height: "100%" }} // Converted 12px
          />
          <CardContent
            sx={{
              width: "inherit",
              position: "absolute",
              display: "flex",
              flexDirection: "row", // Align title and icon horizontally
              justifyContent: "space-between", // Space out elements
              alignItems: "center", // Vertically center the items
              px: "1rem", // Converted 16px
              bottom: "0", // Position the content at the bottom
              borderRadius: "0 0 0.75rem 0.75rem", // Converted 12px
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              backdropFilter: "blur(0.3125rem)", // Converted 5px
              paddingBottom: "0.3125rem", // Converted 5px
              gap: "0.3125rem", // Converted 5px
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
                textAlign: "left", // Align title to the left
                flexGrow: 1, // Allow title to take available space
                margin: 0, // Remove margin for tighter spacing
              }}
            >
              {featuredMedia?.[0]?.document?.titles?.[0]}
            </Typography>
            <IconButton
              aria-label="YouTube"
              color="inherit"
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering card click
                console.log("YouTube icon clicked");
              }}
              sx={{
                color: "#FF0000",
                padding: "0.1875rem", // Converted 3px
                marginLeft: "0.3125rem", // Converted 5px
              }}
            >
              <YouTube />
            </IconButton>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid2>
  );
};

export default TrendingCarousel;
