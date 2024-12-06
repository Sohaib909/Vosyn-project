import { useState } from "react";

import { formatDate } from "@/utils/formatDate";
import {
  ArrowDropDownRounded,
  ArrowDropUpRounded,
  SentimentSatisfiedRounded,
} from "@mui/icons-material";
import { Box, Button, Grid2, TextField, Typography } from "@mui/material";
import Image from "next/image";

import LikeAndDislikeBtn from "@/components/LikeAndDislikeBtn/LikeAndDislikeBtn";
import ProfileImage from "@/components/ProfileImage/ProfileImage";

import styles from "./Comment.module.css";

const Comment = ({ comment, onComment }) => {
  const {
    posted_by_user,
    updated_at,
    text,
    replies,
    like_count,
    video_id,
    id,
  } = comment;

  const [showMore, setShowMore] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [value, setValue] = useState("");

  const toggleShowMore = () => setShowMore((prev) => !prev);
  const toggleShowReplies = () => setShowReplies((prev) => !prev);

  const toggleShowReplyInput = () => {
    setShowReplyInput((prev) => !prev);
    setValue("");
  };

  const handleReplySubmit = () => {
    if (value.trim() === "") return;

    onComment({
      text: value,
      video: video_id,
      parent: id,
    });

    toggleShowReplyInput();
  };

  const getText = () => {
    if (!text) return "NA";
    return showMore || text.length <= 100
      ? text
      : `${text.substring(0, 100)}...`;
  };

  return (
    <Grid2 container size={12} spacing={2} className={styles.commentContainer}>
      <Grid2 size={{ xs: 1.5, sm: 1, xl: 0.5 }} item>
        <ProfileImage />
      </Grid2>

      <Grid2
        size={{ xs: 10.5, sm: 11, xl: 11.5 }}
        item
        className={styles.comment}
      >
        <Box className={styles.commentHeader}>
          <Box sx={{ display: "flex", columnGap: "10px" }}>
            <Image
              width={20}
              height={20}
              src={"https://flagsapi.com/CA/flat/64.png"}
              alt="flag"
            />
            <Typography variant="body2" color="textSecondary">
              @ {posted_by_user}
            </Typography>
          </Box>

          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ flexDirection: "flex-end" }}
          >
            {formatDate(updated_at)}
          </Typography>
        </Box>

        <Box>
          <Typography variant="body1" sx={{ overflowWrap: "anywhere" }}>
            {getText()}
          </Typography>

          <Typography
            variant="caption"
            color="textSecondary"
            onClick={toggleShowMore}
            sx={{ cursor: "pointer", textDecoration: "underline" }}
          >
            {text?.length > 100 ? (showMore ? "Show Less" : "Show More") : ""}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginTop: "0.5rem",
            }}
          >
            <Box>
              <Box
                sx={{
                  display: "flex",
                  columnGap: "0.5rem",
                  marginBottom: "10px",
                }}
              >
                <LikeAndDislikeBtn
                  likes={like_count}
                  fontSize="1.2rem"
                  height="1rem"
                />

                <Button
                  variant="text"
                  onClick={toggleShowReplyInput}
                  className={styles.commentBtn}
                >
                  Reply
                </Button>
              </Box>
              {showReplyInput && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "1rem",
                  }}
                >
                  <Box sx={{ display: "flex", columnGap: "1rem" }}>
                    <ProfileImage width="2rem" />
                    <TextField
                      fullWidth
                      placeholder="Add a reply..."
                      variant="standard"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <SentimentSatisfiedRounded sx={{ marginLeft: "3rem" }} />

                    <Box>
                      <Button
                        variant="text"
                        className={styles.commentBtn}
                        onClick={toggleShowReplyInput}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="text"
                        className={styles.commentBtn}
                        onClick={handleReplySubmit}
                      >
                        Reply
                      </Button>
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>

            {replies?.length > 0 && (
              <Button
                variant="text"
                onClick={toggleShowReplies}
                sx={{
                  textTransform: "none",
                  color: "var(--mui-palette-primary-light)",
                  alignSelf: "start",
                }}
              >
                {showReplies ? (
                  <ArrowDropUpRounded />
                ) : (
                  <ArrowDropDownRounded />
                )}{" "}
                {replies.length} replies
              </Button>
            )}

            {showReplies &&
              replies?.map((reply) => (
                <Comment key={reply.id} comment={reply} />
              ))}
          </Box>
        </Box>
      </Grid2>
    </Grid2>
  );
};

export default Comment;
