"use client";

import React from "react";

import FormatQuoteOutlinedIcon from "@mui/icons-material/FormatQuoteOutlined";
import { Box, Button } from "@mui/material";

const CompareButton = ({ isActive, setIsActive }) => {
  const handleButton = () => {
    setIsActive(!isActive);
  };

  return (
    <Button
      onClick={handleButton}
      fontSize="1.5rem"
      variant={isActive ? "contained" : "outlined"}
      sx={{
        mt: ".5rem",
        ml: ".5rem",
        borderRadius: ".65rem",
        border: isActive ? "" : ".25px",
        borderColor: isActive ? "" : "var(--mui-palette-primary-100)",
        boxShadow: isActive
          ? ""
          : "inset 0px 0px 10px 0 var(--mui-palette-neutral-500)",
        color: isActive ? "" : "var(--mui-palette-neutral-25)",
        backgroundColor: isActive
          ? "var(--mui-palette-primary-main)"
          : "var(--mui-palette-neutral-700)",
        //ml: "2rem"
      }}
    >
      <FormatQuoteOutlinedIcon fontSize="medium" />
      <Box textTransform="none" fontSize="1.1rem" ml=".5rem">
        Compare
      </Box>
    </Button>
  );
};

export default CompareButton;
