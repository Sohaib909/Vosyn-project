import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { selectPlayer } from "@/reduxSlices/playerSlice";
import { Box } from "@mui/material";

import Dialogue from "./Dialouge/Dialouge";

import "./Transcript.module.css";

const Transcript = ({ transcriptJson }) => {
  const containerRef = useRef(null);
  const [transcripts, setTranscripts] = useState(transcriptJson);

  const { hasEnded } = useSelector(selectPlayer);

  //  convert a duration string into seconds
  const parseDurationToSeconds = (durationString) => {
    const [hours, minutes, seconds] = durationString.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  useEffect(() => {
    const mappedTranscripts = transcripts.map((transcript, index) => {
      if (index !== 0) {
        return {
          ...transcript,
          startTime:
            parseDurationToSeconds(transcripts[index - 1].timestamp) + 1,
        };
      } else {
        return { ...transcript, startTime: 0 };
      }
    });
    setTranscripts(mappedTranscripts);
  }, [transcripts]);

  const flagItem = (timestamp) => {
    const copiedTranscript = [...transcripts];
    const filteredElIndex = copiedTranscript.findIndex(
      (transcript) => transcript.timestamp === timestamp,
    );
    copiedTranscript[filteredElIndex].flagged =
      !transcripts[filteredElIndex].flagged;
    setTranscripts(copiedTranscript);
  };

  return !hasEnded ? (
    <Box
      ref={containerRef}
      sx={{
        maxHeight: "20rem",
        position: "relative",
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        rowGap: "1rem",
      }}
    >
      {transcripts.map((transcript, index) => (
        <Dialogue
          key={transcript.timestamp}
          transcript={transcript}
          containerRef={containerRef}
          nextTimestamp={transcripts[index + 1]?.timestamp}
          flagItem={flagItem}
          showFlagAndTime={true}
        />
      ))}
    </Box>
  ) : (
    transcripts.map((transcript, index) => {
      if (transcript.flagged) {
        return (
          <Dialogue
            key={transcript.timestamp}
            transcript={transcript}
            containerRef={containerRef}
            nextTimestamp={transcripts[index + 1]?.timestamp}
            flagItem={flagItem}
            showFlagAndTime={true}
          />
        );
      }
    })
  );
};

export default Transcript;
