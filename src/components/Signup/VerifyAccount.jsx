"use client";

import React, { useState } from "react";

import useStatusNotification from "@/hooks/useStatusNotification";
import { Box, ButtonBase, Typography } from "@mui/material";
import axios from "axios";

import styles from "./VerifyAccount.module.css";

/**
 *
 * @param {*} accountEmail - A string with the email of a newly created account
 *
 * @returns - A component that prompts the user to verify their account
 */
const VerifyAccount = ({ accountEmail }) => {
  const { setStatus } = useStatusNotification();
  const [isResendEmailLoading, setIsResendEmailLoading] = useState(false);

  const handleResendVerification = async () => {
    try {
      setIsResendEmailLoading(true);
      const res = await axios.post("/api/auth/resend-verification", {
        email: accountEmail,
      });
      if (res?.status === 200) {
        setStatus(
          "Verification email has been re-sent. Please check your inbox",
          "success",
        );
      }
      setIsResendEmailLoading(false);
    } catch (err) {
      setStatus(
        "Verification email could not be re-sent. Please try again later",
        "error",
      );
      setIsResendEmailLoading(false);
    }
  };

  return (
    <Box className={styles.verifyAccountContainer}>
      <Typography variant="p" component="p" sx={{ fontWeight: "200" }}>
        To verify your email, please follow the link sent to the email
      </Typography>
      <Box className={styles.emailText}>{accountEmail}</Box>
      <Typography
        variant="p"
        component="p"
        sx={{
          fontSize: "0.75rem",
          mt: "4rem",
          color: "#b3b3b3",
        }}
      >
        Did not receive an email?{" "}
        <ButtonBase
          disabled={isResendEmailLoading}
          onClick={handleResendVerification}
          disableRipple
          sx={{ fontSize: "inherit", color: "white" }}
        >
          Resend
        </ButtonBase>
      </Typography>
    </Box>
  );
};

export default VerifyAccount;
