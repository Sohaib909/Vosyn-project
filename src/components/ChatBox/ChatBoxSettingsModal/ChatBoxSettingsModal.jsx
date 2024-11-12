import React, { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  FormControl,
  IconButton,
  Modal,
  RadioGroup,
  Typography,
} from "@mui/material";

import { CallMenuItems, ChatMenuItem } from "./MenuItem/MenuItem";

import styles from "./ChatBoxSettingModal.module.css";

const ChatBoxSettingModal = ({ open, handleClose, currentTab = 0 }) => {
  const [value, setValue] = useState("Off");

  const chatMenuItems = [
    "Chat filters",
    "Set font style",
    "Set font size",
    "Chat appearance",
    "UI language settings",
  ];

  const callMenuItems = ["Off", "English", "French", "Japanese", "Spanish"];

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="watch-party-chat-box-setting-modal-title"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "auto",
      }}
    >
      <Box className={styles.settingsModalContainer}>
        <Box className={styles.modalHeader}>
          <Typography
            className={styles.modalTitle}
            id="watch-party-chat-box-setting-modal-title"
            variant="h6"
            component="h2"
          >
            SETTINGS
          </Typography>
          <IconButton onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>

        <Box className={styles.modalBody}>
          {currentTab === 0 ? (
            <>
              <Box>
                <Typography variant="body1">User Preferences</Typography>
              </Box>
              <Box className={styles.modalSettingsList}>
                {chatMenuItems?.map((menuItem, index) => (
                  <ChatMenuItem key={index} menuItem={menuItem} />
                ))}
              </Box>
            </>
          ) : (
            <FormControl>
              <Typography variant="body1">Audio Language</Typography>
              <RadioGroup
                value={value}
                onChange={handleChange}
                sx={{
                  "& .Mui-checked": {
                    color: "var(--mui-palette-neutral-100)",
                  },
                }}
              >
                {callMenuItems?.map((menuItem, index) => (
                  <CallMenuItems key={index} menuItem={menuItem} />
                ))}
              </RadioGroup>
            </FormControl>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default ChatBoxSettingModal;
