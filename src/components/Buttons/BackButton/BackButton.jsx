"use client";

import React from "react";

import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

const BackButton = ({ onClick }) => {
  const router = useRouter();

  const handleClick = () => {
    if (!onClick) {
      // If no onClick function was passed, go back
      router.back();
    } else {
      // Otherwise, call the provided onClick function
      onClick();
    }
  };

  return (
    <Button
      variant="text"
      sx={{ color: "inherit", width: "fit-content" }}
      onClick={handleClick}
    >
      <ArrowBackIosNewRoundedIcon /> Back
    </Button>
  );
};

export default BackButton;
