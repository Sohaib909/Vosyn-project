"use client";

import React, { useState } from "react";

import { textMockData } from "@/data/text";
import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";

import CompareButton from "./CompareButton/CompareButton";
import CopyButton from "./CopyButton/CopyButton";
import FlagButton from "./FlagButton/FlagButton";

const Summary = ({ title, summary }) => {
  const [isActive, setIsActive] = useState(false);
  const smry = textMockData[1].summary; // Need to remove after summary is fetch from API.

  return (
    <Card sx={{ padding: "1rem", pb: 0, borderRadius: "12px" }}>
      <Box display="flex" justifyContent="space-between">
        <CardHeader
          title={title ? title : "Summary"}
          sx={{ paddingBottom: ".6rem" }}
        />
        {title === "Translation" && (
          <CompareButton isActive={isActive} setIsActive={setIsActive} />
        )}
      </Box>
      <CardContent>
        <Typography className="summary-container">
          <Typography>{summary ? summary.en : smry}</Typography>
          {isActive && (
            <Typography fontWeight="bold">
              {" "}
              {summary.fr ? summary.fr : smry}{" "}
            </Typography>
          )}
        </Typography>
        <Box sx={{ pt: "1rem" }}>
          <FlagButton />
          <CopyButton copyText={summary} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default Summary;
