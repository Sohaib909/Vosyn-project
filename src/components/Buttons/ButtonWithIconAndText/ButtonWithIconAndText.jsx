import React from "react";

import { Button } from "@mui/material";

const ButtonWithIconAndText = ({
  text = "button",
  icon,
  method,
  variant = "contained",
  size = "small",
  height = "fit-content",
  sx,
}) => {
  return (
    <Button
      onClick={method}
      variant={variant}
      size={size}
      sx={{
        background: "var(--mui-palette-neutral-700)",
        width: "fit-content",
        padding: "0.4rem 1.5rem",
        display: "flex",
        columnGap: "0.5rem",
        whiteSpace: "nowrap",
        textTransform: "none",
        height: height,
        color: " var(--mui-palette-primary-25)",
        borderRadius: "0.5rem",
        fontSize: "0.875rem",
        fontWeight: "500",
        border: "0.06rem solid var(--mui-palette-neutral-750)",
        boxShadow: "inset 0 0 1.25rem 0 var(--mui-palette-boxShadowColor)",
        ...sx,
      }}
    >
      {icon} {text}
    </Button>
  );
};

export default ButtonWithIconAndText;
