import React from "react";

import { Box, Typography } from "@mui/material";

const VideoAudioAISummary = () => {
  const dummyText =
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore, veniam totam libero, magni beatae expedita fugit asperiores excepturi nihil";
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between",
        padding: "1rem",
        borderRadius: "12px",
      }}
    >
      <Typography>{`${dummyText.substring(0, 60)}...`}</Typography>
      <Typography
        sx={{ width: "fit-content", opacity: "0.8" }}
        variant="caption"
      >
        AI generated
      </Typography>
    </Box>
  );
};

export default VideoAudioAISummary;
