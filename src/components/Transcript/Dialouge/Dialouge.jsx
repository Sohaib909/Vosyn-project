import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useMediaRef } from "@/contextProviders/MediaRefProvider";
import { selectLanguage } from "@/reduxSlices/languageSlice";
import { selectPlayer, setCurrentTime } from "@/reduxSlices/playerSlice";
import CheckIcon from "@mui/icons-material/Check";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import FlagIcon from "@mui/icons-material/Flag";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import { Box, Button, IconButton, Typography } from "@mui/material";

import "./Dialouge.module.css";

const Dialogue = ({ transcript, containerRef, nextTimestamp, flagItem }) => {
  const listItem = useRef();
  const [showSuggestionTextbox, setShowSuggestionTextbox] = useState(false);
  const [suggestionText, setSuggestionText] = useState("");
  const { hasEnded, currentTime } = useSelector(selectPlayer);

  const { selectedTranslatedLanguage, selectedOriginalLanguage } =
    useSelector(selectLanguage);

  const { showTranslatedTranscript } = useSelector(selectPlayer);

  const mediaRef = useMediaRef();

  const formatDuration = (value) => {
    const [hours, minutes, seconds] = value.toString().split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  const dispatch = useDispatch();

  // Smooth auto-scrolling only within the transcript container
  useEffect(() => {
    if (Math.floor(currentTime) === formatDuration(transcript.timestamp)) {
      if (containerRef.current && listItem.current) {
        const { offsetTop } = listItem.current;
        const { scrollTop, offsetHeight } = containerRef.current;

        // Smooth scroll only if the item isn't fully in view
        if (
          offsetTop < scrollTop ||
          offsetTop > scrollTop + offsetHeight - listItem.current.offsetHeight
        ) {
          containerRef.current.scrollTo({
            top:
              offsetTop - offsetHeight / 2 + listItem.current.offsetHeight / 2,
            behavior: "smooth",
          });
        }
      }
    }
  }, [currentTime, transcript.timestamp, containerRef]);

  const isActive = () => {
    const current = formatDuration(transcript.timestamp);
    const next = nextTimestamp ? formatDuration(nextTimestamp) : Infinity;
    return currentTime >= current && currentTime < next;
  };

  const handleDialougeClick = () => {
    const time = formatDuration(transcript?.timestamp);
    dispatch(setCurrentTime(time));

    if (mediaRef?.current && isFinite(time)) {
      mediaRef.current.currentTime = time;
    }
  };

  return (
    <Box ref={listItem} sx={{ display: "flex", alignItems: "start" }}>
      <IconButton sx={{ pt: "1rem" }}>
        {transcript.flagged ? (
          <FlagIcon onClick={() => flagItem(transcript.timestamp)} />
        ) : (
          <FlagOutlinedIcon onClick={() => flagItem(transcript.timestamp)} />
        )}
        {hasEnded && (
          <EditNoteOutlinedIcon
            onClick={() => setShowSuggestionTextbox((prevState) => !prevState)}
          />
        )}
      </IconButton>

      <Box
        sx={{
          backgroundColor: isActive()
            ? "var(--mui-palette-neutral-700)"
            : "transparent",
          display: "flex",
          columnGap: "1rem",
          padding: "1rem",
          borderRadius: "12px",
        }}
        onClick={handleDialougeClick}
      >
        <Typography variant="body1" sx={{ opacity: "70%" }}>
          {transcript.timestamp}
        </Typography>

        <Box sx={{ display: "flex", columnGap: "10px" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            {`${transcript.speaker}:`}
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="body1">
              {transcript?.text[selectedOriginalLanguage]}
            </Typography>
            {showTranslatedTranscript && (
              <Typography variant="body1">
                {transcript?.text[selectedTranslatedLanguage]}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>

      {showSuggestionTextbox && (
        <Box className="suggestion-wrapper">
          <Typography variant="h3">Suggested Translation :</Typography>
          <Box className="suggestion-content">
            <input
              type="text"
              placeholder="Type here"
              onChange={(e) => setSuggestionText(e.target.value)}
              value={suggestionText}
            />
            <Button
              variant="contained"
              onClick={() => {
                setShowSuggestionTextbox(false);
              }}
            >
              <CheckIcon />
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Dialogue;
