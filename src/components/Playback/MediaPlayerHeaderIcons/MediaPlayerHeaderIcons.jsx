import React, { useState } from "react";
import { useSelector } from "react-redux";

import { selectDashObject } from "@/reduxSlices/dashObjectSlice";
import { Groups3Rounded } from "@mui/icons-material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
// import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import ShareIcon from "@mui/icons-material/Share";
import { Box, IconButton } from "@mui/material";
import { useRouter } from "next/navigation";

import ButtonWithIconAndText from "../../Buttons/ButtonWithIconAndText/ButtonWithIconAndText";
import ShareModal from "../../ShareModal/ShareModal";
import PlaylistModal from "./PlaylistModal/PlaylistModal";

import styles from "./MediaPlayerHeaderIcons.module.css";

const MediaPlayerHeaderIcons = () => {
  const [openPlaylist, setOpenPlaylist] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { mediaObj } = useSelector(selectDashObject);

  const router = useRouter();

  const toggelShareModal = () => {
    setShowModal((prev) => !prev);
  };

  const handleAddBookmark = () => {
    console.log("Add bookmark");
  };

  const handleDownload = () => {
    if (mediaObj.file_stream_cdn_url) {
      const link = document.createElement("a");
      link.href = mediaObj.file_stream_cdn_url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  // const handleAddToFav = () => {
  //   console.log("fav");
  // };

  const handlePlaylistModal = async () => {
    setOpenPlaylist((prev) => !prev);
  };

  const handlePeerPlay = () => {
    router.push(`/peer-play/${mediaObj?.id}`);
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.wrapper}>
        <IconButton onClick={handleAddBookmark} className={styles.icon}>
          <BookmarkAddOutlinedIcon />
        </IconButton>
        {/* <IconButton onClick={handleAddToFav}>
          <FavoriteBorderRoundedIcon />
        </IconButton> */}

        <IconButton onClick={handlePlaylistModal}>
          <AddRoundedIcon />
        </IconButton>

        <IconButton onClick={toggelShareModal}>
          <ShareIcon />
        </IconButton>

        <IconButton onClick={handleDownload}>
          <SaveAltIcon />
        </IconButton>

        <ButtonWithIconAndText
          text="Peer Play"
          icon={<Groups3Rounded sx={{ fontSize: "1rem" }} />}
          variant="contained"
          method={handlePeerPlay}
        />

        {/** Refactor this component to handle bookmark as well since they are the same UI and functionality wise. */}
        <PlaylistModal
          open={openPlaylist}
          onClose={handlePlaylistModal}
          title="Save Video to"
        />

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
