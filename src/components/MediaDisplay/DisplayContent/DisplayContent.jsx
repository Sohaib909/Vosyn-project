import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import useStatusNotification from "@/hooks/useStatusNotification";
import { Box, Grid2, Typography } from "@mui/material";
import axios from "axios";
import useSWR from "swr";

import SkeletonCard from "../SkeletonCard/SkeletonCard";
import TrendingCarousel from "../TrendingCarousel/TrendingCarousel";
import VideoCardFeatured from "../VideoCard/VideoCard";

const AllResultText = ({ videos }) => (
  <Box className="videocards-result-status-text">
    <Typography style={{ textAlign: "center", marginBottom: "2rem" }}>
      <b>
        {videos.length === 0
          ? "Oops! We couldn't find a related video"
          : "Yay! You have seen it all"}
      </b>
    </Typography>
  </Box>
);

// Fetcher function using axios
const fetcher = (url) => axios.get(url).then((res) => res?.data);

const DisplayContent = () => {
  const { setStatus } = useStatusNotification();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); // To check if there is more data
  const [videoListData, setVideoListData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state to prevent overlapping requests

  // Using SWR to fetch videos
  const { error: videoListsError } = useSWR(
    `/api/video?sort_by=view_count&limit=15&page=${page}`,
    fetcher,
    {
      onSuccess: (newData) => {
        // If the response data is less than 15, set hasMore to false
        if (newData?.length < 15) {
          setHasMore(false);
        }

        // Append the new data to the existing videoListData
        setVideoListData((prevData) => [...prevData, ...newData]);
        setLoading(false);
      },
    },
  );

  if (videoListsError) {
    setStatus(`${videoListsError?.message}. Please try again later.`, "error");
  }

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      setLoading(true);
      setPage((prev) => prev + 1);
    }
  };

  return (
    <InfiniteScroll
      style={{
        overflow: "visible",
      }}
      dataLength={videoListData?.length}
      next={handleLoadMore}
      hasMore={hasMore}
      scrollableTarget="scrollableDiv"
      endMessage={<AllResultText videos={videoListData} />}
      scrollThreshold={0.9}
    >
      <Grid2 container spacing={4} sx={{ padding: "2rem" }}>
        {videoListData.length > 0 && !loading && (
          <TrendingCarousel featuredMedia={videoListData?.slice(0, 4)} />
        )}
        {videoListData?.map((video, index) => (
          <VideoCardFeatured key={index} videoData={video?.document} />
        ))}
        {Array.from(new Array(5)).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </Grid2>
    </InfiniteScroll>
  );
};

export default DisplayContent;
