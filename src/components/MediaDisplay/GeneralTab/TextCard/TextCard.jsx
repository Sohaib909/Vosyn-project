import React from "react";

import { PictureAsPdf } from "@mui/icons-material";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

const TextCard = ({ item }) => {
  return (
    <Card
      sx={{
        borderRadius: "12px",
        width: "100%",
        cursor: "pointer",
        padding: "1rem",
      }}
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "content",
          }}
        >
          <Typography variant="p" sx={{ fontWeight: "bold" }}>
            {`${item.document.titles[0].slice(0, 20)}...`}
          </Typography>
          <PictureAsPdf />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "content",
          }}
        >
          <Typography variant="caption" sx={{ opacity: "0.7" }}>
            Author
          </Typography>
          <Typography variant="caption" sx={{ opacity: "0.7" }}>
            # pages
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TextCard;
