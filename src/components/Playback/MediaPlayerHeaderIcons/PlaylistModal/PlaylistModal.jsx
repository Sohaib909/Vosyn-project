"use client";

import React from "react";
import { useSelector } from "react-redux";

import useStatusNotification from "@/hooks/useStatusNotification";
import { selectDashObject } from "@/reduxSlices/dashObjectSlice";
import { Close } from "@mui/icons-material";
import { Box, FormGroup, IconButton, Modal, Typography } from "@mui/material";
import axios from "axios";
import useSWR from "swr";

import CreateNewList from "../CreateNewList/CreateNewList";
import PlaylistItem from "./PlaylistItem/PlaylistItem";

import styles from "./PlaylistModal.module.css";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const PlaylistModal = ({ open, onClose, title }) => {
  const { mediaObj } = useSelector(selectDashObject);
  const { setStatus } = useStatusNotification();

  // Using SWR to fetch playlists
  const {
    data: playlistsData,
    error: playlistsError,
    mutate: mutatePlaylists,
  } = useSWR(`/api/playlist?page=1`, fetcher);

  // SWR for fetching all playlists belonging to video (using mediaObj?.id as key)
  const { data: playlistDetailData, error: playlistDetailError } = useSWR(
    mediaObj?.id ? `/api/playlist/${mediaObj.id}` : null, // Only fetch if mediaObj.id is available
    fetcher,
  );

  // Handle the loading and error states
  if (playlistsError) {
    setStatus(`${playlistsError.message}. Please try again later.`, "error");
  }

  if (playlistDetailError) {
    setStatus(
      `${playlistDetailError.message}. Please try again later.`,
      "error",
    );
  }

  /**
   * This will be triggered when a new playlist is created
   *
   * @param {*} newPlaylist - the new playlist
   */
  const handleCreatePlaylist = async (newPlaylist) => {
    try {
      const res = await axios.post("/api/playlist", newPlaylist);

      if (res.status === 201) {
        setStatus("Playlist created successfully.", "success");
        mutatePlaylists(); // Trigger a re-fetch to update the playlist data
      }
    } catch (err) {
      setStatus("Failed to create the playlist.", "error");
    }
  };

  return (
    <Modal open={open} onClose={onClose} className={styles.modal}>
      <Box className={styles.container}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>{title}</Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>

        {/** The list of playlists*/}
        <FormGroup className={styles.listContainer}>
          <Box className={styles.listContainer}>
            {playlistsData?.data?.map((playlistItem) => {
              // Check if the playlist is already in the playlist details
              const isChecked = playlistDetailData?.data?.some(
                (item) => item?.playlist === playlistItem?.id,
              );

              return (
                <PlaylistItem
                  key={playlistItem?.id}
                  playlistItem={playlistItem}
                  isChecked={isChecked}
                  mediaId={mediaObj?.id}
                />
              );
            })}
          </Box>
        </FormGroup>

        <CreateNewList onCreate={handleCreatePlaylist} />
      </Box>
    </Modal>
  );
};

export default PlaylistModal;
