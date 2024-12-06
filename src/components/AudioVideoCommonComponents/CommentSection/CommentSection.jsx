"use client";

import { useState } from "react";
import { useSelector } from "react-redux";

import useStatusNotification from "@/hooks/useStatusNotification";
import { selectDashObject } from "@/reduxSlices/dashObjectSlice";
import { SendRounded } from "@mui/icons-material";
import {
  Button,
  Grid2,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import useSWR from "swr";

import Comment from "./Comment/Comment";
import SkeletonLoader from "./SkeletonLoader/SkeletonLoader";

import styles from "./CommentSection.module.css";

const fetcher = (url) => axios.get(url).then((res) => res?.data);

const CommentSection = () => {
  const { mediaObj } = useSelector(selectDashObject);
  const { setStatus } = useStatusNotification();

  const [value, setValue] = useState();
  const [visibleCount, setVisibleCount] = useState(5);

  // const {
  //   data: commentsData,
  //   error: commentsFetchError,
  //   mutate: mutateComments,
  //   isLoading,
  // } = useSWR(`/api/comments?id=${mediaObj?.id}`, fetcher);
  const {
    data: commentsData,
    error: commentsFetchError,
    mutate: mutateComments,
    isLoading,
  } = useSWR(
    mediaObj?.id ? `/api/comments?video_id=${mediaObj.id}` : null, // Fetch only when mediaObj.id exists
    fetcher,
  );

  if (commentsFetchError) {
    setStatus(`${commentsData?.message}. Please try again.`, "error");
  }

  const handleSubmitNewComment = async (newComment) => {
    try {
      const res = await axios.post("/api/comments", newComment);

      if (res.status === 201) {
        setStatus("Comment added successfully.", "success");
        setValue("");
        mutateComments(); // Trigger a re-fetch to update the playlist data
      }
    } catch (err) {
      setStatus("Failed to add the comment.", "error");
    }
  };

  if (isLoading) {
    return <SkeletonLoader />;
  }

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 5); // Increase the number of visible comments by 5
  };

  const handleShowLess = () => {
    setVisibleCount(5); // Reset to the default number of comments
  };

  return (
    <Grid2 container spacing={2} size={12} className={styles.section}>
      <Grid2 item container xs={12} spacing={2} className={styles.input}>
        <Typography>{commentsData?.length} Comments</Typography>
        <TextField
          fullWidth
          placeholder="Add comment"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && value.trim()) {
              handleSubmitNewComment({
                text: value,
                video: mediaObj?.id,
              });
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() =>
                    handleSubmitNewComment({
                      text: value,
                      video: mediaObj?.id,
                    })
                  }
                >
                  <SendRounded />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid2>

      <Grid2 container item size={12} spacing={2}>
        {commentsData
          ?.filter((it) => it.parent === null)
          ?.slice(0, visibleCount)
          .map((comment, index) => (
            <Comment
              key={index}
              comment={comment}
              onComment={handleSubmitNewComment}
            />
          ))}
      </Grid2>

      <Grid2 item xs={12}>
        {visibleCount < commentsData?.length && (
          <Button sx={{ color: "inherit" }} onClick={handleLoadMore}>
            Load More
          </Button>
        )}
        {visibleCount > 5 && (
          <Button sx={{ color: "inherit" }} onClick={handleShowLess}>
            Show Less
          </Button>
        )}
      </Grid2>
    </Grid2>
  );
};

export default CommentSection;
