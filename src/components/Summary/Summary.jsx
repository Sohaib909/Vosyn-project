"use client";

import React from "react";

import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";

import CopyButton from "./CopyButton/CopyButton";
import FlagButton from "./FlagButton/FlagButton";

const Summary = ({ title, summary }) => {
  // const smry = textMockData[1].summary; // Need to remove after summary is fetch from API.

  return (
    <Card sx={{ padding: "1.25rem", pb: 0, borderRadius: "12px" }}>
      <CardHeader title={title} sx={{ paddingBottom: "0" }} />
      {/** Show collapsed content when expanded is true */}
      <CardContent>
        <Typography className="summary-container">{summary}</Typography>
        <Box sx={{ pt: "1rem" }}>
          <FlagButton />
          <CopyButton copyText={summary} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default Summary;
