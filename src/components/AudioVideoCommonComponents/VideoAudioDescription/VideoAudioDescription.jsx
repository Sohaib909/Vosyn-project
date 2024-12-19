"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import transcriptJson from "@/data/transcript.json";
import { selectDashObject } from "@/reduxSlices/dashObjectSlice";
import {
  selectPlayer,
  setShowTranslatedTranscript,
} from "@/reduxSlices/playerSlice";
import { formatDate } from "@/utils/formatDate";
import { Box, Grid2, Typography } from "@mui/material";

import ButtonWithIconAndText from "@/components/Buttons/ButtonWithIconAndText/ButtonWithIconAndText";

import Transcript from "../../Transcript/Transcript";

const VideoAudioDescription = () => {
  const { mediaObj } = useSelector(selectDashObject);

  const [videoDescShowMore, setVideoDescShowMore] = useState(false);
  const [flaggedTranscripts, setFlaggedTranscripts] = useState([]);

  const { showTranscripts, showTranslatedTranscript } =
    useSelector(selectPlayer);

  const dispatch = useDispatch();

  const toggleVideoDescShowMore = () => {
    setVideoDescShowMore(!videoDescShowMore);
  };

  const handleFlaggedTranscripts = (flaggedItems) => {
    setFlaggedTranscripts(flaggedItems);
  };

  const handleCompareClick = () => {
    dispatch(setShowTranslatedTranscript(!showTranslatedTranscript));
  };

  const formatDescription = (videoDescription) => {
    const sentences = videoDescription.split(/(?<=[.!?])\s+/);
    return sentences.map((sentence, index) => (
      <React.Fragment key={index}>
        {sentence}
        <br />
      </React.Fragment>
    ));
  };

  function formatViewCount(count) {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (count >= 1000) {
      return (count / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return count;
  }

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
            {formatViewCount(mediaObj?.view_count)} Views
          </Typography>
          <Typography variant="body2" sx={{ opacity: "60%" }}>
            {formatDate(mediaObj?.updated_at)}
          </Typography>
        </Box>

        {showTranscripts && (
          <ButtonWithIconAndText text="Compare" method={handleCompareClick} />
        )}
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
              {mediaObj?.description ? (
                videoDescShowMore ? (
                  <>{formatDescription(mediaObj.description)}</>
                ) : (
                  `${mediaObj?.description?.substring(0, 172)}...`
                )
              ) : (
                "NA"
              )}
            </Typography>
            <Typography
              variant="caption"
              color="textSecondary"
              onClick={toggleVideoDescShowMore}
              sx={{ cursor: "pointer", textDecoration: "underline" }}
            >
              {videoDescShowMore ? "Show Less" : "Show More"}
            </Typography>
          </Box>
        )}
      </Grid2>
    </Grid2>
  );
};

export default VideoAudioDescription;
