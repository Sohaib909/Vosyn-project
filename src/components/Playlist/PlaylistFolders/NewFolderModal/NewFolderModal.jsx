"use client";

import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";

const NewFolderModal = ({ open, onClose, onNext }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "var(--mui-palette-neutral-800)",
          p: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6">New Folder</Typography>
          <CloseIcon onClick={onClose} />
        </Box>
        <TextField
          variant="outlined"
          placeholder="New Folder"
          fullWidth
          sx={{ marginTop: "1.25rem" }}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: "2vh" }}>
          <Button onClick={onClose} sx={{ textTransform: "capitalize" }}>
            Cancel
          </Button>
          <Button onClick={onNext} sx={{ textTransform: "capitalize" }}>
            Next
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default NewFolderModal;
