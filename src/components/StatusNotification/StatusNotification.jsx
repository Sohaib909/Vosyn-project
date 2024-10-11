import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  hideStatusNotification,
  selectStatusNotification,
} from "@/reduxSlices/statusNotificationSlice";
import CloseIcon from "@mui/icons-material/Close";
import { Alert, AlertTitle, IconButton } from "@mui/material";

const StatusNotification = () => {
  const { showStatusNotification, message, severity } = useSelector(
    selectStatusNotification,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (showStatusNotification) {
      const timer = setTimeout(() => {
        dispatch(hideStatusNotification());
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showStatusNotification, dispatch]);

  const handleClose = () => {
    dispatch(hideStatusNotification());
  };

  const capitilize = () => {
    return severity.charAt(0).toUpperCase() + severity.slice(1);
  };

  return (
    showStatusNotification && (
      <Alert
        severity={severity}
        sx={{ position: "absolute", bottom: "1rem", left: "1rem" }}
        action={
          <IconButton aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        }
      >
        <AlertTitle>{capitilize()}</AlertTitle>
        {message}
      </Alert>
    )
  );
};

export default StatusNotification;
