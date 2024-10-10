import React, { useEffect, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import { Alert, AlertTitle, IconButton } from "@mui/material";

const StatusNotification = ({ severity, message, onClose }) => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
      onClose();
    }, 10000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const capitilize = () => {
    return severity.charAt(0).toUpperCase() + severity.slice(1);
  };
  return (
    open && (
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
