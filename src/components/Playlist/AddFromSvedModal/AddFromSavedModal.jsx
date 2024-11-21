"use client";

import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Modal, Typography } from "@mui/material";

import SinglePlaylist from "../SinglePlaylist/SinglePlaylist";

const AddFromSavedModal = ({ open, onClose, onDone }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxHeight: "80vh",
          bgcolor: "var(--mui-palette-neutral-800)",
          p: 4,
          overflowY: "scroll",
          width: "80vw",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            mb: "3vh",
          }}
        >
          <Typography variant="h6">Add from Saved</Typography>
          <CloseIcon onClick={onClose} />
        </Box>
        <SinglePlaylist icons={false} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: "2vh",
            gap: "1vw",
          }}
        >
          <Button
            sx={{ textTransform: "capitalize", fontSize: "large" }}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            sx={{ textTransform: "capitalize", fontSize: "large" }}
            onClick={onDone}
          >
            Done
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddFromSavedModal;
