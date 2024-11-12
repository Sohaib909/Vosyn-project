"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectDashObject } from "@/reduxSlices/dashObjectSlice";
import { selectPlayer, setShowTranscripts } from "@/reduxSlices/playerSlice";
import {
  DownloadRounded,
  FormatAlignLeft,
  Groups3Rounded,
  ShareRounded,
} from "@mui/icons-material";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";

import ButtonWithIconAndText from "../../Buttons/ButtonWithIconAndText/ButtonWithIconAndText";
import ShareModal from "../../ShareModal/ShareModal";

const VideoAudioActionButtons = () => {
  const [showModal, setShowModal] = useState(false);

  const { mediaObj } = useSelector(selectDashObject);
  const { showTranscripts } = useSelector(selectPlayer);

  const router = useRouter();
  const dispatch = useDispatch();

  const toggelShareModal = () => {
    setShowModal((prev) => !prev);
  };

  // Download the current MPD file
  const handleDownload = () => {
    if (mediaObj.file_stream_cdn_url) {
      const link = document.createElement("a");
      link.href = mediaObj.file_stream_cdn_url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handlePeerPlay = () => {
    router.push(`/peer-play/${mediaObj?.id}`);
  };

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
      />
      <ButtonWithIconAndText
        text="Peer Play"
        icon={<Groups3Rounded sx={{ fontSize: "1rem" }} />}
        variant="contained"
        method={handlePeerPlay}
      />
      <ButtonWithIconAndText
        text="Share"
        icon={<ShareRounded sx={{ fontSize: "1rem" }} />}
        variant="contained"
        method={toggelShareModal}
      />
      <ButtonWithIconAndText
        text="Download"
        icon={<DownloadRounded sx={{ fontSize: "1rem" }} />}
        variant="contained"
        method={handleDownload}
      />

      <ShareModal
        open={showModal}
        onClose={toggelShareModal}
        title="Share with Others!"
      />
    </Box>
  );
};

export default VideoAudioActionButtons;
