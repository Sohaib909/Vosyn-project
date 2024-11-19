"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";

import transcriptJson from "@/data/transcript.json";
import { selectPlayer } from "@/reduxSlices/playerSlice";
import ChromeReaderModeOutlinedIcon from "@mui/icons-material/ChromeReaderModeOutlined";
import { Box, Typography } from "@mui/material";

import Transcript from "@/components/Transcript/Transcript";

import ButtonWithIconAndText from "../../Buttons/ButtonWithIconAndText/ButtonWithIconAndText";

import "./UploadAudioVideoTranscriptPanel.scoped.css";

const UploadAudioVideoTranscriptPanel = ({
  originalTranscript,
  translatedTranscript,
}) => {
  const { showTranscripts } = useSelector(selectPlayer);
  const [showCompare] = useState(false);

  //will be un commented once we get dummyscript data
  //   const handleCompareClick = () => {
  //     setShowCompare(!showCompare);
  //   };

  return (
    <>
      {showTranscripts && (
        <Box
          component="section"
          bgcolor="var(--mui-palette-neutral-800)"
          borderRadius="0.5rem"
          p="1rem"
          data-testid="translation-menu-video-upload"
          sx={{ width: "100%" }}
        >
          <Box
            data-testid="menu-1"
            display="flex"
            flexWrap="wrap"
            justifyContent="flex-end"
            alignItems="center"
            mb="1rem"
          >
            <Box component="div" display="flex" gap="0.5rem" my="1rem">
              <ButtonWithIconAndText
                text="Compare"
                icon={<ChromeReaderModeOutlinedIcon />}
                variant="contained"
                // commenting this out as right  now we dont have dummy script data
                // method={handleCompareClick}
                data-testid="compareBtn"
              />
            </Box>
          </Box>

          {/* Content Display When Not Comparing */}
          {!showCompare && (
            <Box m={2}>
              <Box mb={2} className="transcript-panel">
                <Transcript transcriptJson={transcriptJson} />
              </Box>
            </Box>
          )}

          {/* Conditional Compare Section */}
          {showCompare && (
            <Box>
              <Box display="flex" justifyContent="space-between">
                <Box flex={1} mr={2} className="transcript-panel">
                  <Typography variant="body1" component="div">
                    <Transcript transcriptJson={originalTranscript} />
                  </Typography>
                </Box>
                <Box flex={1} ml={2} className="transcript-panel">
                  <Typography variant="body1" component="div">
                    <Transcript transcriptJson={translatedTranscript} />
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

export default UploadAudioVideoTranscriptPanel;
