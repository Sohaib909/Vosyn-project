"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  hideStatusNotification,
  selectStatusNotification,
} from "@/reduxSlices/statusNotificationSlice";
import CloseIcon from "@mui/icons-material/Close";
import { Alert, AlertTitle, IconButton } from "@mui/material";

/**
 * A component to show status notification, error, warning or success.
 *
 * @returns - A pop up status notification at the bottom left of the screen.
 */
const StatusNotification = () => {
  const { showStatusNotification, message, severity, timeout } = useSelector(
    selectStatusNotification,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    // If there is currently a notification shown (and the message is not "permanent"/timeout === -1), hide it after 2 seconds.
    if (showStatusNotification && timeout !== -1) {
      const timer = setTimeout(() => {
        dispatch(hideStatusNotification());
      }, timeout);

      return () => clearTimeout(timer);
    }
  }, [showStatusNotification, dispatch, message]);

  const handleClose = () => {
    dispatch(hideStatusNotification());
  };

  const capitalizeSeverity = () => {
    return severity.charAt(0).toUpperCase() + severity.slice(1);
  };

  return (
    showStatusNotification && (
      <Alert
        severity={severity}
        sx={{
          position: "absolute",
          bottom: "1rem",
          left: "1rem",
          zIndex: "999999999999999999999999",
        }}
        action={
          <IconButton aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        }
      >
        <AlertTitle>{capitalizeSeverity()}</AlertTitle>
        {message}
      </Alert>
    )
  );
};

export default StatusNotification;
