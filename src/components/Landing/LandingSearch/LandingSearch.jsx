"use client";

import { useState } from "react";

import { Divider, Grid2 } from "@mui/material";
import axios from "axios";

import SearchBar from "@/components/Landing/LandingSearch/SearchBar/SearchBar";
import VosynAssistChatContainer from "@/components/Landing/LandingSearch/VosynAssist/VosynAssistChatContainer";

import DragAndDrap from "../DragAndDrop/DragAndDrap";
import UploadInteractions from "../UploadInteractions/UploadInteractions";

const LandingSearch = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isProcessingMessage, setIsProcessingMessage] = useState(false);
  const [chatMessageIDToScroll, setChatMessageIDToScroll] = useState(undefined);

  const sendMessageToGemini = async () => {
    setIsProcessingMessage(true);
    const placeholderId = Date.now();
    addUserMessageToChatHistory(searchInput);
    createResponseObject(placeholderId);
    setSearchInput("");

    try {
      let currentChatSummary = "";

      if (chatHistory.length > 0) {
        currentChatSummary = chatHistory[chatHistory.length - 1]?.summary || "";
      }

      await axios
        .post("/api/vosynassist/", {
          prompt: searchInput,
          summary: currentChatSummary,
        })
        .then((res) => {
          setChatMessageIDToScroll(placeholderId);
          addGeminiResponseToChatHistory(res.data, placeholderId);
        });
    } catch (err) {
      const responseObject = {
        isLoading: false,
        summary: "",
        text_response: err.response.data.message,
        video_results: [],
      };
      addGeminiResponseToChatHistory(responseObject, placeholderId);
    }
  };

  const addUserMessageToChatHistory = (searchInput) => {
    setChatHistory((prev) => [
      ...prev,
      {
        isUser: true,
        message: searchInput,
      },
    ]);
  };

  const createResponseObject = (placeholderId) => {
    setChatHistory((prev) => [
      ...prev,
      {
        isUser: false,
        summary: "",
        text_response: "",
        video_results: [],
        isLoading: true,
        id: placeholderId,
      },
    ]);
  };

  const addGeminiResponseToChatHistory = (response, placeholderId) => {
    setChatHistory((prev) =>
      prev.map((msg) => {
        if (msg.id === placeholderId) {
          return {
            ...msg,
            isLoading: false,
            summary: response.summary,
            text_response: response.text_response,
            video_results: response.video_results,
          };
        }
        return msg;
      }),
    );
  };

  return (
    <Grid2
      container
      item
      size={12}
      spacing={2}
      sx={{
        backgroundColor: "var(--mui-palette-neutral-800)",
        padding: 4,
        borderRadius: 3,
        marginBottom: chatHistory.length ? 2 : 0,
      }}
    >
      <SearchBar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        isProcessingMessage={isProcessingMessage}
        sendMessageToGemini={sendMessageToGemini}
      />

      <Divider sx={{ width: "100%" }} />

      {chatHistory.length != 0 ? (
        <VosynAssistChatContainer
          chatHistory={chatHistory}
          setIsProcessingMessage={setIsProcessingMessage}
          chatMessageIDToScroll={chatMessageIDToScroll}
          setChatMessageIDToScroll={setChatMessageIDToScroll}
        />
      ) : (
        <Grid2
          container
          item
          size={12}
          spacing={2}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Grid2 item size={{ xs: 12, sm: 8, md: 8, lg: 9, xl: 9 }}>
            <DragAndDrap />
          </Grid2>
          <Grid2 item size={{ xs: 12, sm: 4, md: 4, lg: 3, xl: 3 }}>
            <UploadInteractions />
          </Grid2>
        </Grid2>
      )}
    </Grid2>
  );
};

export default LandingSearch;
