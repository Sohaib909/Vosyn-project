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
      }}
      onClick={handleCardClick}
    >
      <CardMedia
        component="img"
        image={item.document.thumbnail_url}
        sx={{ borderRadius: "4px", maxHeight: "25vh", padding: "0" }}
      />

      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          rowGap: "1rem",
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
          <Typography variant="p">Author</Typography>
          <YouTubeIcon />
        </Box>
      </CardContent>
    </Card>
  );
}

export default WatchCard;
