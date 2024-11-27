"use client";

import React from "react";

import useStatusNotification from "@/hooks/useStatusNotification";
import { Close, MoreVertRounded } from "@mui/icons-material";
import { Box, Grid2, IconButton, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import useSWR from "swr";

// eslint-disable-next-line prettier/prettier
import PlaylistCard from "../PlaylistCard/PlaylistCard";
// eslint-disable-next-line prettier/prettier
import RecommendedCard from "../RecommendedCard/RecommendedCard";
// eslint-disable-next-line prettier/prettier
import ContextualInfo from "../ContextualInfo/ContextualInfo";

import styles from "./SideDisplayContainer.module.css";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const SideDisplayContainer = ({
  containerType = "recommended",
  playlistId = null,
  title = "Recommended videos",
}) => {
  const getRandValue = () => Math.floor(Math.random() * 8) + 1;

  // Using SWR to fetch recommended videos
  const { data: videoListData, error: videoListsError } = useSWR(
    containerType === "recommended"
      ? `/api/video?sort_by=view_count&limit=6&page=${getRandValue()}`
      : null,
    fetcher
  );

  // Using SWR to fetch playlists
  const { data: playlistData, error: playlistsError } = useSWR(
    containerType === "playlist"
      ? `/api/playlist/singlePlaylist/${playlistId}?limit=4&order_by=video_name&page=1`
      : null,
    fetcher
  );

  const { setStatus } = useStatusNotification();

  const router = useRouter();

  if (containerType === "recommended" && videoListsError) {
    setStatus(`${videoListsError?.message}.`, "error");
  }

  if (containerType === "playlist" && playlistsError) {
    setStatus(`${playlistsError?.message}.`, "error");
  }

  const recommendedVideoClicked = (videoId) => {
    router.push(`/video/${videoId}`);
  };

  return (
    <>
      {containerType === "playlist" && (
        // eslint-disable-next-line prettier/prettier
      <Grid2 item size={12}  className={styles.sectionContainer}>
      <ContextualInfo />
      </Grid2>
    )}
      {containerType === "playlist" && (
        <Grid2 item size={12} className={styles.sectionContainer}>
          <Grid2 item size={12} className={styles.header}>
            <Box>
              <Typography variant="body1">Playlist name</Typography>
              <Typography variant="caption" sx={{ opacity: "0.7" }}>
                {playlistData?.data?.length} videos
              </Typography>
            </Box>

            <Box>
              <IconButton>
                <MoreVertRounded />
              </IconButton>
              <IconButton>
                <Close />
              </IconButton>
            </Box>
          </Grid2>

          <Grid2
            container
            item
            size={12}
            spacing={2}
            className={styles.contentContainer}
          >
            {playlistData?.data?.map((item) => (
              <PlaylistCard
                key={item?.content_object?.id}
                playlistItem={item?.content_object}
              />
            ))}
          </Grid2>
        </Grid2>
      )}

      {containerType === "recommended" && (
        <Grid2 item size={12} className={styles.sectionContainer}>
          <Grid2 item size={12} className={styles.header}>
            <Box>
              <Typography variant="body1">{title}</Typography>
              <Typography variant="caption" sx={{ opacity: "0.7" }}>
                {videoListData?.length} videos
              </Typography>
            </Box>

            <Box>
              <IconButton>
                <MoreVertRounded />
              </IconButton>
              <IconButton>
                <Close />
              </IconButton>
            </Box>
          </Grid2>

          <Grid2
            container
            item
            size={12}
            spacing={2}
            className={styles.contentContainer}
          >
            {videoListData?.map((item) => (
              <RecommendedCard
                key={item?.document?.id}
                recommendedItem={item?.document}
                onClick={recommendedVideoClicked}
              />
            ))}
          </Grid2>
        </Grid2>
      )}
    </>
  );
};

export default SideDisplayContainer;