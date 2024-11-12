import React from "react";

import { Grid2, Typography } from "@mui/material";

const AICard = ({ aiCardItem }) => {
  const { title, content } = aiCardItem;

  return (
    <Grid2
      item
      size={{ xs: 11, sm: 6, md: 6, lg: 4 }}
      sx={{
        border: "var(--mui-palette-neutral-300) solid 2px",
        borderRadius: "12px",
        minHeight: "6rem",
        padding: "1rem",
      }}
    >
      <Typography sx={{ fontWeight: "bold", marginBottom: "10px" }}>
        {title}
      </Typography>
      <Typography variant="body2" sx={{ opacity: "0.7" }}>
        {content}
      </Typography>
    </Grid2>
  );
};

export default AICard;
