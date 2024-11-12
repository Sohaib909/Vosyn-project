"use client";

import React, { useState } from "react";

import ArrowBackIosNew from "@mui/icons-material/ArrowBackIosNew";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

const ResetPassword = ({ onBack }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signOutAllDevices, setSignOutAllDevices] = useState(false);
  const [error, setError] = useState("");
  const [isResetSuccessful, setIsResetSuccessful] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsResetSuccessful(true);

    setNewPassword("");
    setConfirmPassword("");
    setSignOutAllDevices(false);
  };

  if (isResetSuccessful) {
    return;
  }

  return (
    <Box
      sx={{
        width: "80%",
        mx: "10%",
        mt: "10vh",
      }}
    >
      <Grid container spacing={2}>
        <Grid item size={2}>
          <div>
            <Button
              startIcon={<ArrowBackIosNew />}
              onClick={onBack}
              sx={{
                textTransform: "none",
                bgcolor: "transparent",
                px: "8px",
                "&:hover": {
                  color: "#fff",
                },
              }}
            >
              Back
            </Button>
          </div>
        </Grid>

        <Grid item size={8}>
          <Typography variant="h5">Reset Password</Typography>
          <Typography variant="subtitle1" sx={{ mt: "3vh" }}>
            Please enter your new password below with at least 6 characters
            long.
          </Typography>
          <FormGroup sx={{ mt: "3vh" }}>
            <Box
              sx={{
                display: "flex",
                mt: "3vh",
                alignItems: "center",
                gap: "2vw",
              }}
            >
              <Typography>Current Email</Typography>
              <TextField
                value="Vosynai2024@gmail.com"
                variant="outlined"
                inputProps={{
                  readOnly: true,
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                mt: "3vh",
                alignItems: "center",
                gap: "2vw",
              }}
            >
              <Typography>New Password</Typography>
              <TextField
                type="password"
                variant="outlined"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                error={!!error}
                helperText={
                  error &&
                  newPassword.length < 6 &&
                  "Password must be at least 6 characters long."
                }
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                mt: "3vh",
                alignItems: "center",
                gap: "2vw",
              }}
            >
              <Typography>Confirm New Password</Typography>
              <TextField
                type="password"
                variant="outlined"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={!!error}
                helperText={
                  error &&
                  newPassword !== confirmPassword &&
                  "Passwords do not match."
                }
              />
            </Box>
            <FormControlLabel
              sx={{ mt: "4vh", mb: "1vh" }}
              control={
                <Checkbox
                  checked={signOutAllDevices}
                  onChange={(e) => setSignOutAllDevices(e.target.checked)}
                  color="primary"
                />
              }
              label="Sign out of all devices"
            />
            <Box mt={3} display="flex" gap={2}>
              <Button variant="contained" onClick={handleSubmit}>
                Reset
              </Button>
              <Button variant="outlined" onClick={onBack}>
                Cancel
              </Button>
            </Box>
          </FormGroup>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ResetPassword;
