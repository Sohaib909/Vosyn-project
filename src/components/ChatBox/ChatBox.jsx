"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { selectUser } from "@/reduxSlices/userSlice";
import {
  KeyboardVoiceRounded,
  MicOffRounded,
  SentimentSatisfiedAltRounded,
} from "@mui/icons-material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";

import ShareModal from "../ShareModal/ShareModal";
import ChatBoxNav from "./ChatBoxNav/ChatBoxNav";
import ChatBoxSettingModal from "./ChatBoxSettingsModal/ChatBoxSettingsModal";

import styles from "./ChatBox.module.css";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [username, setUsername] = useState("You");
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [chatNav, setChatNav] = useState(0);
  const [mute, setMute] = useState(true);
  const [isShareModalOpen, setIsShareModalOpen] = useState(true);

  const messageListRef = useRef(null);

  const { userProfile } = useSelector(selectUser);

  useEffect(() => {
    setUsername(userProfile?.username);
  }, [userProfile]);

  const handleSendMessage = (e) => {
    if (e.key === "Enter" && newMessage.trim() !== "") {
      const newMessageObject = {
        id: messages.length + 1,
        type: "message",
        senderName: username,
        message: newMessage,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prevMessages) => [...prevMessages, newMessageObject]);
      setNewMessage("");
    }
  };

  const handleUserJoin = () => {
    const joinMessage = {
      id: messages.length + 1,
      type: "notification",
      message: "user1234 has joined the chat",
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prevMessages) => [...prevMessages, joinMessage]);
  };

  const handleWatchPartyRaid = () => {
    const raidMessage = {
      id: messages.length + 1,
      type: "raid",
      message: "streamer567 has raided with 12 viewers!",
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prevMessages) => [...prevMessages, raidMessage]);
  };

  const handleOtherUserMessage = () => {
    const otherUserMessage = {
      id: messages.length + 1,
      type: "message",
      senderName: "user1234",
      message: "Hello everyone!",
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prevMessages) => [...prevMessages, otherUserMessage]);
  };

  const toggleSettingsModal = () => {
    setIsSettingsModalOpen((prev) => !prev);
  };

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleShareModal = () => {
    setIsShareModalOpen((prevState) => !prevState);
  };

  const toggleChatNav = (value) => {
    setChatNav(value);
  };

  const handleMic = () => {
    setMute((prev) => !prev);
  };

  return (
    <>
      <ChatBoxNav
        chatNav={chatNav}
        toggleChatNav={toggleChatNav}
        toggleWatchPartyModal={toggleShareModal}
      />

      <Box className={styles.watchPartyChatboxContainer}>
        <Box className={styles.watchPartyChatboxHeader}>
          <Typography className="watch-party-chatbox-title">
            LIVE CHAT
          </Typography>
        </Box>

        <Box className={styles.watchPartyChatboxMessage} ref={messageListRef}>
          {messages.map((message) => (
            <Box
              key={message.id}
              sx={{ display: "flex", flexDirection: "column", rowGap: "8px" }}
            >
              {message.type === "message" ? (
                <>
                  <Typography
                    sx={{
                      alignSelf:
                        message.senderName === userProfile?.username
                          ? "flex-end"
                          : "flex-start",
                      fontWeight: "bold",
                      opacity: "0.8",
                    }}
                  >
                    {message.senderName}:
                  </Typography>
                  <Typography className={styles.watchPartyChatboxText}>
                    {message.message}
                  </Typography>
                </>
              ) : message.type === "notification" ? (
                <Typography className={styles.watchPartyChatboxNotification}>
                  {message.message}
                </Typography>
              ) : message.type === "raid" ? (
                <Typography
                  className={styles.watchPartyChatboxRaidNotification}
                >
                  {message.message}
                </Typography>
              ) : null}
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            backgroundColor: "var(--mui-palette-neutral-700)",
            borderRadius: "0 0 12px 12px",
            padding: "1rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <IconButton aria-label="Open emoji">
              <SentimentSatisfiedAltRounded />
            </IconButton>

            <IconButton
              aria-label="Open chat box settings"
              onClick={toggleSettingsModal}
            >
              <SettingsOutlinedIcon />
            </IconButton>
          </Box>

          {chatNav === 0 ? (
            <TextField
              autoComplete="off"
              variant="filled"
              fullWidth
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleSendMessage}
              placeholder="Type a Message..."
              className={styles.watchPartyChatboxInput}
            />
          ) : (
            <Button
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "var(--mui-palette-neutral-300)",
                color: "var(--mui-palette-neutral-900)",
              }}
              onClick={handleMic}
            >
              {mute ? <MicOffRounded /> : <KeyboardVoiceRounded />}
            </Button>
          )}
        </Box>
      </Box>

      <Box>
        <Button variant="contained" onClick={handleUserJoin}>
          Simulate User Join
        </Button>
        <Button variant="contained" onClick={handleOtherUserMessage}>
          Simulate Other User Message
        </Button>
        <Button variant="contained" onClick={handleWatchPartyRaid}>
          Simulate Watch Party Raid
        </Button>
      </Box>

      <ChatBoxSettingModal
        open={isSettingsModalOpen}
        handleClose={toggleSettingsModal}
        currentTab={chatNav}
      />

      <ShareModal
        open={isShareModalOpen}
        onClose={toggleShareModal}
        title="Peer Play"
        showTimeStamp={false}
      />
    </>
  );
};

export default ChatBox;
