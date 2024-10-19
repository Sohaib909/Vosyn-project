"use client";

import React from "react";
import { useForm } from "react-hook-form";

import useStatusNotification from "@/hooks/useStatusNotification";

import { Box, Button, CircularProgress, TextField } from "@mui/material";
import axios from "axios";
import Link from "next/link";

import VABlobWithText from "@/components/VABlobWithText/VABlobWithText";

import styles from "./page.module.css";

/**
 * The forgot password page to send a reset link to user if based on their email.
 *
 * @returns - forgot passowrd form
 */
const ForgotPassword = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const { setStatus } = useStatusNotification();

  /**
   * A method to handle the submited email
   *
   * @param {*} data - form data
   */
  const submitHandler = async (data) => {
    try {
      const res = await axios.post("/api/auth/password-reset", {
        email: data.email,
      });

      //If email exists, set the status notifiction for the user action and notify them email has been sent to the given email.
      if (res?.status === 200) {
        setStatus(
          "A verification email has been sent. Please check your inbox.",
          "success",
        );
      }
    } catch (err) {
      const statusCode = err?.response?.status;

      // If an error occured, show apporiate notification.
      if (statusCode === 404) {
        setStatus("No user found with this email", "error");
      } else if (statusCode === 429) {
        setStatus(err?.response?.data.detail, "error");
      } else {
        setStatus("Please try again later", "error");
      }
    }
  };

  return (
    <Box component="main" className={styles.pageContainer}>
      <Box className={styles.inputContainer}>
        <VABlobWithText text="Forgot your password? Don't worry! Just enter your email." />

        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "2rem",
            marginTop: "2rem",
          }}
          onSubmit={handleSubmit(submitHandler)}
        >
          <TextField
            id="forgot-password-email"
            fullWidth
            size="medium"
            aria-label="email-input"
            placeholder="name@domain.com"
            label="Email Address"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Please enter a valid email address",
              },
            })}
            error={!!errors.email}
            helperText={errors?.email?.message}
          />

          <Button
            disabled={isSubmitting}
            variant="contained"
            size="large"
            sx={{
              background: "var(--mui-palette-primary-400)",
              paddingY: "1rem",
              "&:hover": {
                background: "var(--mui-palette-primary-300)",
              },
            }}
            type="submit"
          >
            {isSubmitting ? <CircularProgress /> : "Send Reset Link"}
          </Button>
        </Box>

        <Link href="/auth?type=login" className={styles.goBackBtn}>
          Back to Login
        </Link>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
