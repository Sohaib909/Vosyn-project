"use client";

import YouTubeIcon from "@mui/icons-material/YouTube";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

function WatchCard({ item }) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/video/${item.document.id}`);
  };

  return (
    <Card
      sx={{
        borderRadius: "12px",
        width: "100%",
        cursor: "pointer",
        padding: "1rem",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
        },
        "&:hover .child": {
          filter: "grayscale(0%)",
        },
      }}
      onClick={handleCardClick}
    >
      <CardMedia
        component="img"
        image={item.document.thumbnail_url}
        className="child"
        sx={{
          borderRadius: "4px",
          maxHeight: "25vh",
          padding: "0",
          filter: "grayscale(50%)",
          transition: "filter 0.3s ease",
        }}
      />

      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          rowGap: "1rem",
          textAlign: "left",
        }}
      >
        <Typography variant="p" sx={{ fontWeight: "bold" }}>
          {`${item.document.titles[0].slice(0, 20)}...`}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "content",
          }}
        >
          <Typography variant="p">{`${item.document.description.slice(0, 25)}...`}</Typography>
          <YouTubeIcon />
        </Box>
      </CardContent>
    </Card>
  );
}

export default WatchCard;
