"use client";

import React, { useEffect } from "react";

import useQueryParam from "@/hooks/useQueryParam";

import DisplayContent from "./DisplayContent/DisplayContent";
import TabNavbar from "./TabNavbar/TabNavbar";

const MediaDisplay = () => {
  const { updateQueryParam, getAllParams } = useQueryParam();

  const params = getAllParams();

  useEffect(() => {
    updateQueryParam("tab", params.tab);
  }, []);

  return (
    <>
      <TabNavbar />
      <DisplayContent />
    </>
  );
};

export default MediaDisplay;
