import { useCallback, useEffect, useRef } from "react";

import useDetectScroll from "@/hooks/useDetectScroll";
import { Box } from "@mui/material";

import UserMessage from "@/components/Landing/LandingSearch/VosynAssist/UserMessage";
import VosynAssistResponse from "@/components/Landing/LandingSearch/VosynAssist/VosynAssistResponse";

const VosynAssistChatContainer = ({
  chatHistory,
  setIsProcessingMessage,
  chatMessageIDToScroll,
  setChatMessageIDToScroll,
}) => {
  const messagesEndRef = useRef(null);
  const messageContainerRef = useRef(null);

  const chatboxScroll = useDetectScroll(messageContainerRef);

  const scrollChatbox = useCallback(
    (messageID) => {
      if (messageContainerRef.current) {
        if (messageID === chatMessageIDToScroll) {
          messageContainerRef.current.scrollTop =
            messageContainerRef.current.scrollHeight;
        }
      }
    },
    [chatMessageIDToScroll],
  );

  // If a scroll upwards is detected, stop automatic scrolling
  useEffect(() => {
    if (chatboxScroll.isScrollingUp) {
      setChatMessageIDToScroll(undefined);
    }
  }, [chatboxScroll.isScrollingUp]);

  useEffect(() => {
    if (chatHistory.length > 0) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }, 150);
    }
  }, [chatHistory]);

  return (
    <Box
      sx={{
        height: "750px",
        width: "100%",
        overflow: "auto",
        padding: "0 10px",
      }}
      ref={messageContainerRef}
    >
      {chatHistory.map((message, index) => (
        <Box key={index} sx={{ marginRight: { lg: 12, md: 0 } }}>
          {message.isUser ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                maxWidth: { xl: "80%", xs: "unset" },
                marginLeft: { xl: "auto", xs: "unset" },
              }}
            >
              <UserMessage user={message} />
            </Box>
          ) : (
            <VosynAssistResponse
              responseData={message}
              setIsProcessingMessage={setIsProcessingMessage}
              scrollChatbox={scrollChatbox}
            />
          )}
        </Box>
      ))}
      <Box ref={messagesEndRef} sx={{ height: 0 }} />
    </Box>
  );
};

export default VosynAssistChatContainer;
