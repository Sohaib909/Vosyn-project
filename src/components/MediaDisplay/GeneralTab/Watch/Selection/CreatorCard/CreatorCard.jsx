import React from "react";

import { Avatar, Box, Typography } from "@mui/material";

const CreatorCard = ({ creator }) => {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Avatar
        alt={creator.name}
        src={creator.image}
        sx={{ width: "8vw", height: "8vw", justifySelf: "center" }}
      />
      <Typography
        component="p"
        sx={{
          fontWeight: "bold",
          mt: "2vh",
          maxWidth: "8vw",
        }}
      >
        {creator.name}
      </Typography>
    </Box>
  );
};

export default CreatorCard;
