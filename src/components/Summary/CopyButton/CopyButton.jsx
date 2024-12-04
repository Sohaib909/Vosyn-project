"use client";

import React, { useState } from "react";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Alert, IconButton, Snackbar } from "@mui/material";

const CopyButton = ({ copyText }) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    navigator.clipboard.writeText(copyText);
    setOpen(true);
  };

  //Closes snackbar
  const handleClose = (e, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <>
      <IconButton data-testid="copy-icon" onClick={handleClick}>
        <ContentCopyIcon sx={{ color: "white" }} />
      </IconButton>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Copied to clipboard
        </Alert>
      </Snackbar>
    </>
  );
};

export default CopyButton;
