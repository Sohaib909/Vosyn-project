import React from "react";

import styled from "@emotion/styled";
import { Switch } from "@mui/material";

const CustomSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  padding: 8,
  width: 67,
  height: 40,
  "& .MuiSwitch-track": {
    borderRadius: 20,
    position: "relative",
    backgroundColor: "#D9D9D9",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
    boxShadow: "inset 2px 2px 2px 0px rgba(0, 0, 0, 0.1)",
    "&::before, &::after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      fontSize: 8,
      fontWeight: 500,
      color: "#000000",
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 20,
    height: 20,
    margin: 1,
    backgroundColor: "#656565", // Default (unchecked) thumb color
  },
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#000000",
    transform: "translateX(28px)",
    "& + .MuiSwitch-track": {
      backgroundColor: "#BFCCDA",
      opacity: 1,
    },
    "& .MuiSwitch-thumb": {
      backgroundColor: "var(--mui-palette-neutral-800)", // Thumb color when checked
    },
  },
  "& .MuiSwitch-switchBase": {
    color: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.08)",
    },
  },
}));

export default CustomSwitch;
