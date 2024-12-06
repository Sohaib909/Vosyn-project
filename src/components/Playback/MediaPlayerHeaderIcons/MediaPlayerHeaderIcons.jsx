import React, { useState } from "react";

import ShareIcon from "@mui/icons-material/Share";
import { Box, IconButton } from "@mui/material";

import ShareModal from "../../ShareModal/ShareModal";

import styles from "./MediaPlayerHeaderIcons.module.css";

const MediaPlayerHeaderIcons = () => {
  const [showModal, setShowModal] = useState(false);

  const toggelShareModal = () => {
    setShowModal((prev) => !prev);
  };
  return (
    <Box className={styles.container}>
      <Box className={styles.wrapper}>
        <IconButton onClick={toggelShareModal}>
          <ShareIcon />
        </IconButton>

        <ShareModal
          open={showModal}
          onClose={toggelShareModal}
          title="Share with Others!"
        />
      </Box>
    </Box>
  );
};

export default MediaPlayerHeaderIcons;
