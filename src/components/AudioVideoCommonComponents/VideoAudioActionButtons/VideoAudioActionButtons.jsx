"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectPlayer, setShowTranscripts } from "@/reduxSlices/playerSlice";
import {
  ErrorOutline,
  FormatAlignLeft,
  LibraryBooksOutlined,
} from "@mui/icons-material";
import { Box } from "@mui/material";

import ButtonWithIconAndText from "../../Buttons/ButtonWithIconAndText/ButtonWithIconAndText";

const VideoAudioActionButtons = () => {
  const { showTranscripts } = useSelector(selectPlayer);

  const dispatch = useDispatch();

  const toggleTranscripts = () =>
    dispatch(setShowTranscripts(!showTranscripts));

  return (
    <Box
      sx={{
        display: "flex",
        gap: "1rem",
        width: "fit-content",
        flexWrap: "wrap",
      }}
    >
      <ButtonWithIconAndText
        text="Transcript"
        icon={<FormatAlignLeft sx={{ fontSize: "1rem" }} />}
        variant="contained"
        method={toggleTranscripts}
        sx={{
          backgroundColor: "var(--mui-palette-primary-main)",
          boxShadow: "none",
          border: "1px solid var(--mui-palette-primary-main)",
        }}
      />

      <ButtonWithIconAndText
        text="Description"
        icon={<ErrorOutline sx={{ fontSize: "1rem" }} />}
        variant="contained"
      />

      <ButtonWithIconAndText
        text="Contextual Info"
        icon={<LibraryBooksOutlined sx={{ fontSize: "1rem" }} />}
        variant="contained"
      />
    </Box>
  );
};

export default VideoAudioActionButtons;
