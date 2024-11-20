"use client";

import React, { useState } from "react";

import FlagIcon from "@mui/icons-material/Flag";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import { Alert, IconButton, Snackbar } from "@mui/material";

const FlagButton = ({ onFlag, isFlagged = false }) => {
  const [flagActive, setFlagActive] = useState(isFlagged);
  const [open, setOpen] = useState(false);

  const handleFlagClick = () => {
    //Toggling flagActive state
    setFlagActive((prev) => !prev);

    //Notifying parent component about flag click
    if (onFlag) {
      onFlag(!flagActive);
    }
    setOpen(true);
  };

  // Handle close event for the Snackbar
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <IconButton data-testid="flag-icon" onClick={handleFlagClick}>
        {flagActive ? (
          <FlagIcon sx={{ color: "white" }} data-testid="filled-flag" />
        ) : (
          <FlagOutlinedIcon
            sx={{ color: "white" }}
            data-testid="outlined-flag"
          />
        )}
      </IconButton>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {flagActive ? "Flagged successfully!" : "Flag removed successfully!"}
        </Alert>
      </Snackbar>
    </>
  );
};

export default FlagButton;
