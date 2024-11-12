import React, { useState } from "react";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import { Box, IconButton } from "@mui/material";

import PlaylistModal from "./PlaylistModal/PlaylistModal";

import styles from "./MediaPlayerHeaderIcons.module.css";

const MediaPlayerHeaderIcons = () => {
  const [openPlaylist, setOpenPlaylist] = useState(false);

  const handleAddToFav = () => {
    console.log("fav");
  };

  const handlePlaylistModal = async () => {
    setOpenPlaylist((prev) => !prev);
  };

  return (
    <Box className={styles.container}>
      <IconButton onClick={handleAddToFav}>
        <FavoriteBorderRoundedIcon />
      </IconButton>

      <IconButton onClick={handlePlaylistModal}>
        <AddRoundedIcon />
      </IconButton>

      {/** Refactor this component to handle bookmark as well since they are the same UI and functionality wise. */}
      <PlaylistModal
        open={openPlaylist}
        onClose={handlePlaylistModal}
        title="Save Video to"
      />
    </Box>
  );
};

export default MediaPlayerHeaderIcons;
