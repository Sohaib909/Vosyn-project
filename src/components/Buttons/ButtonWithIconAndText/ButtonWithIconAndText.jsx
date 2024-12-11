import React from "react";

import { Button } from "@mui/material";

const ButtonWithIconAndText = ({
  text = "button",
  icon,
  method,
  variant = "contained",
  size = "small",
  height = "fit-content",
}) => {
  return (
    <Button
      onClick={method}
      variant={variant}
      size={size}
      disabled={text === "Subscribe"}
      sx={{
        background: "var(--mui-palette-neutral-700)",
        width: "fit-content",
        paddingX: "1rem",
        fontSize: "12px",
        display: "flex",
        columnGap: "8px",
        whiteSpace: "nowrap",
        textTransform: "none",
        height: height,
        "&:hover": {
          background: "var(--mui-palette-primary-600)",
        },
      }}
    >
      {icon} {text}
    </Button>
  );
};

export default ButtonWithIconAndText;
