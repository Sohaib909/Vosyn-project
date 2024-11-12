"use client";

import React, { useState } from "react";

import useStatusNotification from "@/hooks/useStatusNotification";
import {
  Box,
  Button,
  FormGroup,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import useSWR from "swr";

import { ListItemWithSwitch } from "../ListItem/ListItem";
import PasscodeDialog from "./Passcode/Passcode";

const fetcher = (url) => axios.get(url).then((res) => res?.data);

const ParentalControlSettings = () => {
  const [isParentalControlEnabled, setParentalControlEnabled] = useState(false);
  const [parentalControlPassword, setParentalControlPassword] = useState("");
  const [isPasscodeModalOpen, setPasscodeModalOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const { setStatus } = useStatusNotification();

  const { error, mutate } = useSWR("/api/settings", fetcher, {
    onSuccess: (newData) => {
      const { enable_parental_control, parental_control_password } =
        newData.data.user;
      setParentalControlEnabled(enable_parental_control);
      setParentalControlPassword(parental_control_password);
    },
  });

  if (error) {
    setStatus("Failed to fetch settings", "error");
  }

  const handleToggle = () => {
    setParentalControlEnabled((prev) => !prev);

    if (!isParentalControlEnabled) {
      setPasscodeModalOpen(true);
    }
  };

  const handlePasswordChange = (event) => {
    setParentalControlPassword(event.target.value);
  };

  const closePasscodeModal = () => setPasscodeModalOpen(false);

  const handleConfirmPasscode = async () => {
    try {
      const res = await axios.patch("/api/settings", {
        enable_parental_control: isParentalControlEnabled,
        parental_control_password: isParentalControlEnabled
          ? parentalControlPassword
          : "",
      });

      if (res?.status === 200) {
        closePasscodeModal();
        mutate();
      }
    } catch (err) {
      setStatus("Failed to save settings", "error");
    }
  };

  return (
    <>
      <Typography sx={{ width: "100%" }} variant="h5">
        Parental Control
      </Typography>

      <FormGroup
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          rowGap: "2rem",
        }}
      >
        <ListItemWithSwitch
          heading="Enable Parental Controls"
          checked={isParentalControlEnabled}
          onChange={handleToggle}
        />

        <Box sx={{ display: "flex", flexDirection: "column", rowGap: "1rem" }}>
          <Box>
            <Typography variant="h6">Manage Restrictions</Typography>
            <Typography variant="subtitle1" sx={{ opacity: "0.7" }}>
              Confirm your password to make changes
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              columnGap: "1rem",
            }}
          >
            <TextField
              disabled={!isParentalControlEnabled}
              value={parentalControlPassword}
              onChange={handlePasswordChange}
              variant="outlined"
              size="small"
            />
            <Link
              sx={{ cursor: "pointer" }}
              onClick={() => router.push(`${pathname}/reset-parental-password`)}
            >
              Create or reset password
            </Link>
          </Box>
        </Box>

        <Button
          variant="contained"
          sx={{ width: "fit-content" }}
          onClick={() => router.push(`${pathname}/manage-restrictions`)}
        >
          Next
        </Button>

        <PasscodeDialog
          isPasscodeModalOpen={isPasscodeModalOpen}
          closePasscodeModal={closePasscodeModal}
          onConfirm={handleConfirmPasscode}
        />
      </FormGroup>
    </>
  );
};

export default ParentalControlSettings;
