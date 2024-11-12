"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";

import transcriptJson from "@/data/transcript.json";
import { selectDashObject } from "@/reduxSlices/dashObjectSlice";
import { selectPlayer } from "@/reduxSlices/playerSlice";
import { formatDate } from "@/utils/formatDate";
import { Box, Grid2, Typography } from "@mui/material";

import Transcript from "../../Transcript/Transcript";

const VideoAudioDescription = () => {
  const { mediaObj } = useSelector(selectDashObject);

  const [videoDescShowMore, setVideoDescShowMore] = useState(false);
  const [flaggedTranscripts, setFlaggedTranscripts] = useState([]);

  const { showTranscripts } = useSelector(selectPlayer);

  const toggleVideoDescShowMore = () => {
    setVideoDescShowMore(!videoDescShowMore);
  };

  const handleFlaggedTranscripts = (flaggedItems) => {
    setFlaggedTranscripts(flaggedItems);
  };

  return (
    <Grid2
      container
      size={12}
      spacing={2}
      sx={{
        backgroundColor: "var(--mui-palette-neutral-800)",
        padding: "1rem",
        borderRadius: "12px",
      }}
    >
      <Grid2
        size={12}
        container
        sx={{
          display: "flex",
          width: "inherit",
          columnGap: "3rem",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", columnGap: "1rem" }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: "bold", opacity: "60%" }}
          >
            {mediaObj?.view_count} Views
          </Typography>
          <Typography variant="body2" sx={{ opacity: "60%" }}>
            {formatDate(mediaObj?.updated_at)}
          </Typography>
        </Box>
      </Grid2>

      <Grid2 size={12}>
        {showTranscripts ? (
          <Transcript
            transcriptJson={transcriptJson}
            flaggedItems={flaggedTranscripts}
            onFlagChange={handleFlaggedTranscripts}
          />
        ) : (
          <Box
            sx={{
              display: "inline-block",
              flexDirection: "column",
              rowGap: "1rem",
            }}
          >
            <Typography variant="body1">
              {mediaObj?.description
                ? videoDescShowMore
                  ? mediaObj?.description
                  : `${mediaObj?.description?.substring(0, 172)}`
                : "NA"}
            </Typography>
            <Box
              component="span"
              sx={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={toggleVideoDescShowMore}
            >
              {videoDescShowMore ? "Show less" : "...more"}
            </Box>
          </Box>
        )}
      </Grid2>
    </Grid2>
  );
};

export default VideoAudioDescription;
