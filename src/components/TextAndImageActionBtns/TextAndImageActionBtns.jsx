"use client";

import React, { useState } from "react";

import {
  DownloadRounded,
  FavoriteBorderOutlined,
  ShareRounded,
} from "@mui/icons-material";
import SettingsIcon from "@mui/icons-material/Settings";
import { Box } from "@mui/material";

import ButtonWithIconAndText from "../Buttons/ButtonWithIconAndText/ButtonWithIconAndText";
import ShareModal from "../ShareModal/ShareModal";

const TextAndImageActionBtns = ({ isImage }) => {
  const [showModal, setShowModal] = useState(false);
  const toggelShareModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: "1rem",
        width: "100%",
        flexWrap: "wrap",
        justifyContent: "start",
      }}
    >
      {isImage === "image" && (
        <ButtonWithIconAndText
          text="Image Text"
          icon={<SettingsIcon sx={{ fontSize: "1rem" }} />}
          variant="contained"
        />
      )}
      <ButtonWithIconAndText
        text="Share"
        icon={<ShareRounded sx={{ fontSize: "1rem" }} />}
        variant="contained"
        method={toggelShareModal}
      />
      <ButtonWithIconAndText
        text="Bookmark"
        icon={<FavoriteBorderOutlined sx={{ fontSize: "1rem" }} />}
        variant="contained"
      />
      <ButtonWithIconAndText
        text="Download"
        icon={<DownloadRounded sx={{ fontSize: "1rem" }} />}
        variant="contained"
      />

      <ShareModal
        open={showModal}
        onClose={toggelShareModal}
        title="Share with Others!"
        showTimeStamp={false}
      />
    </Box>
  );
};

export default TextAndImageActionBtns;
