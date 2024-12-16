"use client";

import React from "react";

import useStatusNotification from "@/hooks/useStatusNotification";
import { Box, Grid2, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import useSWR from "swr";

// import ContextualInfo from "../ContextualInfo/ContextualInfo";
// eslint-disable-next-line prettier/prettier
// import PlaylistCard from "../PlaylistCard/PlaylistCard";
// eslint-disable-next-line prettier/prettier
import RecommendedCard from "../RecommendedCard/RecommendedCard";

import styles from "./SideDisplayContainer.module.css";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const SideDisplayContainer = ({
  containerType = "recommended",
  title = "Recommended videos",
}) => {
  // Using SWR to fetch recommended videos
  const { data: videoListData, error: videoListsError } = useSWR(
    containerType === "recommended"
      ? `/api/video?sort_by=view_count&limit=6&page=1`
      : null,
    fetcher,
  );

  // // Using SWR to fetch playlists
  // const { data: playlistData, error: playlistsError } = useSWR(
  //   containerType === "playlist"
  //     ? `/api/playlist/singlePlaylist/${playlistId}?limit=4&order_by=video_name&page=1`
  //     : null,
  //   fetcher,
  // );

  const { setStatus } = useStatusNotification();

  const router = useRouter();

  if (containerType === "recommended" && videoListsError) {
    setStatus(`${videoListsError?.message}.`, "error");
  }

  const recommendedVideoClicked = (videoId) => {
    router.push(`/video/${videoId}`);
  };

  return (
    <>
      <Grid2 item size={12} className={styles.sectionContainer}>
        <Grid2 item size={12} className={styles.header}>
          <Box>
            <Typography variant="body1">{title}</Typography>
            <Typography variant="caption" sx={{ opacity: "0.7" }}>
              {videoListData?.length} videos
            </Typography>
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
    </>
  );
};

export default SideDisplayContainer;
