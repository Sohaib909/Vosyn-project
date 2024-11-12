import React from "react";

import { Box, Typography } from "@mui/material";

const SocialIcon = ({ social }) => {
  const { iconClass, name, shareUrl, testID } = social;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        rowGap: "1rem",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        width: "fit-content",
      }}
      aria-label={testID}
      onClick={() =>
        window.open(
          shareUrl + window.location.href,
          "_blank",
          "noopener noreferrer",
        )
      }
    >
      <Box
        sx={{
          boxShadow: "0 0 8px 1px var(--mui-palette-neutral-600)",
          backgroundColor: "var(--mui-palette-neutral-900)",
          borderRadius: "12px",
          width: "2.6rem",
          height: "2.6rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "&:hover": {
            boxShadow: "0 0 8px 1px var(--mui-palette-primary-main)",
          },
        }}
      >
        {iconClass}
      </Box>

      <Typography variant="caption">{name}</Typography>
    </Box>
  );
};

export default SocialIcon;
