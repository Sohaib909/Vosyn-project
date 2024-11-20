import React from "react";
import { Grid2 } from "@mui/material";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import useQueryParam from "@/hooks/useQueryParam";

const TrendingCarousel = ({ featuredMedia }) => {
  const router = useRouter();
  const { getAllParams } = useQueryParam();
  const params = getAllParams();

  // Click handler for navigating to the relevant link
  const handleCardClick = () => {
    router.push(
      `/${params.tab}/${featuredMedia?.[0]?.document?.id}`
    );
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
            boxShadow: "0px 3px 6px var(--mui-palette-primary-550)",
          },
          borderRadius: "12px",
          height: "100%",
        }}
      >
        <CardActionArea sx={{ height: "100%" }}>
          <CardMedia
            // image={
            //   featuredMedia?.[0]?.document?.thumbnail_url ||
            //   "https://via.placeholder.com/140"
            // }
            image={
                "https://i.pinimg.com/originals/89/3e/5b/893e5bdf0499d714ddf77def68510bf2.jpg" ||
                 "https://via.placeholder.com/140"
               }
            alt={featuredMedia?.[0]?.document?.titles?.[0]}
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
              {featuredMedia?.[0]?.document?.titles?.[0]}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid2>
  );
};

export default TrendingCarousel;
