"use client";

import React from "react";

import { textMockData } from "@/data/text";
import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";

import CopyButton from "./CopyButton/CopyButton";
import FlagButton from "./FlagButton/FlagButton";

const Summary = () => {
  const smry = textMockData[1].summary; // Need to remove after summary is fetch from API.

  return (
    <Card sx={{ padding: "1.25rem", pb: 0, borderRadius: "12px" }}>
      <CardHeader title={"Summary"} sx={{ paddingBottom: "0" }} />
      {/** Show collapsed content when expanded is true */}
      <CardContent>
        <Typography className="summary-container">{smry}</Typography>
        <Box sx={{ pt: "1rem" }}>
          <FlagButton />
          <CopyButton copyText={smry} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default Summary;
