"use client";

import React, { useEffect, useState } from "react";

import { SETTINGS_URL, UPDATE_SETTINGS_URL } from "@/constants/URLs/constants";
import ArrowBackIosNew from "@mui/icons-material/ArrowBackIosNew";
import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  Link,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import axios from "axios";

import ManageRestrictions from "./Manage/Manage";
import PasscodeDialog from "./Passcode/Passcode";
import UpdatePassword from "./UpdatePassword/UpdatePassword";

const ParentalControlSettings = ({ onBack }) => {
  const [isParentalControlEnabled, setParentalControlEnabled] = useState(false);
  const [parentalControlPassword, setParentalControlPassword] = useState("");
  const [isPasscodeModalOpen, setPasscodeModalOpen] = useState(false);
  const [showUpdatePassword, setShowUpdatePassword] = useState(false);
  const [showManageRestrictions, setShowManageRestrictions] = useState(false);

  useEffect(() => {
    axios
      .get(SETTINGS_URL, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        const { enable_parental_control, parental_control_password } =
          response.data.user;
        setParentalControlEnabled(enable_parental_control);
        setParentalControlPassword(parental_control_password);
      })
      .catch((error) => {
        console.error("Error fetching settings:", error);
      });
  }, []);

  const handleToggle = () => {
    const newEnabledState = !isParentalControlEnabled;
    setParentalControlEnabled(newEnabledState);

    if (!isParentalControlEnabled) {
      setPasscodeModalOpen(true);
    }
  };

  const openUpdatePassword = () => setShowUpdatePassword(true);

  const handleBackToUpdatePassword = () => {
    setShowUpdatePassword(false);
  };

  if (showUpdatePassword) {
    return <UpdatePassword onBack={handleBackToUpdatePassword} />;
  }

  const handlePasswordChange = (event) => {
    setParentalControlPassword(event.target.value);
  };

  const closePasscodeModal = () => setPasscodeModalOpen(false);

  const handleConfirmPasscode = (passcode) => {
    console.log("Passcode confirmed:", passcode);
    axios
      .patch(
        UPDATE_SETTINGS_URL,
        {
          enable_parental_control: isParentalControlEnabled,
          parental_control_password: isParentalControlEnabled
            ? parentalControlPassword
            : "",
        },
        {
          headers: { "Content-Type": "application/json" },
        },
      )
      .then((response) => {
        console.log("Settings updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating settings:", error);
      });
    closePasscodeModal();
  };

  const handleNextClick = () => {
    setShowManageRestrictions(true);
  };

  const handleBackToSettings = () => {
    setShowManageRestrictions(false);
  };

  if (showManageRestrictions) {
    return <ManageRestrictions onBack={handleBackToSettings} />;
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
          <Typography variant="h5">Parental Control</Typography>
          <FormGroup sx={{ mt: "5vh" }}>
            <FormControlLabel
              control={
                <Switch
                  checked={isParentalControlEnabled}
                  onChange={handleToggle}
                />
              }
              label="Enable Parental Controls"
              sx={{ mt: "2vh", ml: "0", gap: "3vw" }}
            />
            <Typography variant="h6" sx={{ mt: "5vh" }}>
              Manage Restrictions
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: "0.7", mt: "3vh" }}>
              Confirm your password to make changes
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                mt: "3vh",
                gap: "2vw",
              }}
            >
              <TextField
                disabled={!isParentalControlEnabled}
                value={parentalControlPassword}
                onChange={handlePasswordChange}
                variant="outlined"
              />
              <Link sx={{ cursor: "pointer" }} onClick={openUpdatePassword}>
                Create or reset password
              </Link>
            </Box>
            <Button
              variant="contained"
              onClick={handleNextClick}
              sx={{ mt: "6vh", py: "2vh", width: "20vw" }}
            >
              Next
            </Button>
            <PasscodeDialog
              isPasscodeModalOpen={isPasscodeModalOpen}
              closePasscodeModal={closePasscodeModal}
              onConfirm={handleConfirmPasscode}
            />
          </FormGroup>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ParentalControlSettings;
