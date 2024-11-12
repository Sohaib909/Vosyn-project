"use client";

import React, { useState } from "react";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const PasscodeDialog = ({ isPasscodeModalOpen, closePasscodeModal }) => {
  const [passcode, setPasscode] = useState("");

  const handleConfirm = () => {
    console.log("Passcode entered:", passcode);
    closePasscodeModal();
  };

  return (
    <Dialog
      open={isPasscodeModalOpen}
      onClose={closePasscodeModal}
      maxWidth="xs"
      PaperProps={{
        style: {
          width: "40%",
          maxWidth: "none",
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <DialogTitle sx={{ mt: "3vh" }}>
        Enter Parental Control Passcode
      </DialogTitle>
      <DialogContent>
        <Box>
          <TextField
            type="password"
            variant="filled"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            sx={{
              "& .MuiInputBase-input": {
                py: "1.5vh",
                pl: "1vw",
              },
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ mb: "3vh" }}>
        <Button onClick={closePasscodeModal}>Cancel</Button>
        <Button variant="contained" onClick={handleConfirm}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PasscodeDialog;
