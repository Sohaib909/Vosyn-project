import React from "react";

import YouTubeIcon from "@mui/icons-material/YouTube";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

import styles from "./CardFeatured.module.css";

const CardFeatured = ({ cardData }) => {
  const router = useRouter();

  const handleAudioCardNavigate = (id) => () => {
    router.push(`/video/${id}`);
  };

  return (
    <Card
      className={styles.card}
      sx={{
        backgroundImage: `url(${
          cardData.image || "https://via.placeholder.com/336x200"
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      data-testid="audioBackground"
      onClick={handleAudioCardNavigate(cardData.id)}
    >
      <Box className={styles.icon} data-testid="audioIcon">
        <YouTubeIcon sx={{ color: "#fff", fontSize: 20 }} />
      </Box>
      <Box
        sx={{
          padding: "0px",
          px: "1vw",
          mt: "35%",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
        }}
      >
        <CardContent sx={{ padding: 0, pt: "1vh" }}>
          <Typography
            variant="subtitle1"
            nowrap
            sx={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              marginRight: "3vw",
              fontWeight: 600,
              fontSize: "12px",
              lineHeight: 1.2,
              color: "#ffffff",
            }}
          >
            {cardData.title}
          </Typography>
          <Typography variant="body2" className={styles.description}>
            {cardData.description}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};
export default CardFeatured;
