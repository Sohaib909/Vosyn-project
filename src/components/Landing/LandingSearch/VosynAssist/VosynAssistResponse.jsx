import { useEffect, useState } from "react";

import useTypewriter from "@/hooks/useTypewriter";
import logo from "@/Images/airis-logo.svg";
import { Box, CardContent, Fade, Link, Typography } from "@mui/material";
import Image from "next/image";

import LoadingAnimation from "./LoadingAnimation";

import styles from "./VosynAssist.module.css";

const VosynAssistResponse = ({
  responseData,
  setIsProcessingMessage,
  scrollChatbox,
}) => {
  const [isLoadingAnimationFinished, setIsLoadingAnimationFinished] = useState(
    !responseData.isLoading,
  );

  const responseTypewriter = useTypewriter(
    responseData.text_response,
    isLoadingAnimationFinished,
  );

  useEffect(() => {
    if (responseTypewriter.isFinishedTyping) {
      setIsProcessingMessage(false);
    }
  }, [responseTypewriter.isFinishedTyping, setIsProcessingMessage]);

  useEffect(() => {
    scrollChatbox(responseData.id);
  }, [responseTypewriter.outputText, responseData.id, scrollChatbox]);

  // Start typewriter animation after loading transition animation
  useEffect(() => {
    setTimeout(() => {
      setIsLoadingAnimationFinished(!responseData.isLoading);
    }, 500);
  }, [responseData.isLoading]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        mb: 3,
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          marginBottom: 2,
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minWidth: "40px",
            minHeight: "40px",
            maxHeight: "60px",
            borderRadius: "50%",
          }}
        >
          <Image
            alt="video result thumbnail"
            src={logo}
            height={60}
            sx={{ transition: "opacity 2000ms ease-out 200ms" }}
          />
        </Box>
        {!isLoadingAnimationFinished ? (
          <Box sx={{ marginTop: 2.5 }}>
            <LoadingAnimation isLoading={responseData.isLoading} />
          </Box>
        ) : (
          <Box sx={{ marginTop: 1.5 }} className={styles.assistantMessage}>
            <Typography sx={{ paddingTop: "6px" }}>
              {responseTypewriter.outputText}
              {!responseTypewriter.isFinishedTyping && (
                <Box className={styles.insertionCaret}></Box>
              )}
            </Typography>
          </Box>
        )}
      </Box>
      {responseTypewriter.isFinishedTyping && (
        <Box>
          {responseData.video_results.map((video, index) => (
            <Fade
              key={video.id}
              in={true}
              timeout={{
                enter: 800 + index * 200, // Add fadein delay for each card
              }}
            >
              <Link
                sx={{
                  display: "flex",
                  flexDirection: { lg: "row", xs: "column" },
                  borderRadius: 3,
                  width: "100%",
                  cursor: "pointer",
                  padding: 2,
                  marginBottom: 1,
                  textDecoration: "none",
                }}
                href={`/video/${video.id}`}
              >
                <Image
                  alt="video result thumbnail"
                  src={video.thumbnail_url}
                  width={video.thumbnail_width}
                  height={video.thumbnail_height}
                  className={styles.videoThumbnail}
                />
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    flex: 1,
                    paddingTop: 0,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      fontSize: { lg: 20, sm: 20, xs: 16 },
                      marginTop: { xs: 1 },
                      color: "white",
                    }}
                  >
                    {video.titles[0]}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "12px",
                      color: "text.secondary",
                      overflow: "hidden",
                      display: "-webkit-box", // Necessary for multi-line truncation
                      WebkitBoxOrient: "vertical", // Defines vertical orientation for the box
                      WebkitLineClamp: 4, // Limits the text to 4 lines (adjust as needed)
                      maxHeight: "9.4rem", // Set the maximum height (adjust as needed)
                    }}
                  >
                    {video.description}
                  </Typography>
                </CardContent>
              </Link>
            </Fade>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default VosynAssistResponse;
