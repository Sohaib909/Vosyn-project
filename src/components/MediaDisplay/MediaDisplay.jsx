"use client";

import React, { useEffect } from "react";

import useQueryParam from "@/hooks/useQueryParam";
import { Box } from "@mui/material";

import Featured from "./Featured/Featured";
import Navbar from "./Navbar/Navbar";

function MediaDisplay() {
  const { updateQueryParam, getAllParams } = useQueryParam();

  const params = getAllParams();

  useEffect(() => {
    updateQueryParam("tab", "featured");
  }, []);

  const getMediaDisplay = () => {
    if (params.tab === "featured") {
      return <Featured />;
    } else if (params.tab === "video") {
      return <></>;
    } else if (params.tab === "audio") {
      return <></>;
    } else if (params.tab === "text") {
      return <></>;
    }
  };

  return (
    <Box sx={{ mx: "2vw", my: "2vh" }}>
      <Navbar />
      <Box>{getMediaDisplay()}</Box>
    </Box>
  );
}

export default MediaDisplay;
