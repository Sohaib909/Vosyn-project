"use client";

import React from "react";
import { useForm } from "react-hook-form";

import useStatusNotification from "@/hooks/useStatusNotification";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import Link from "next/link";

import StatusNotification from "@/components/StatusNotification/StatusNotification";
import VABlobWithText from "@/components/VABlobWithText/VABlobWithText";

import styles from "./page.module.css";

const ForgotPassword = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const { setStatus } = useStatusNotification();

  const submitHandler = async (data) => {
    try {
      const res = await axios.post("/auth/password-reset", {
        email: data.email,
      });

      if (res?.status === 200) {
        setStatus(
          true,
          "A verification email has been sent. Please check your inbox.",
          "success",
        );
      }
    } catch (err) {
      const statusCode = err?.response?.status;
      if (statusCode === 400) {
        setStatus(true, "No user found with this email", "error");
      } else if (statusCode === 429) {
        setStatus(true, err?.response?.data.detail, "error");
      } else {
        setStatus(true, "Please try again later", "error");
      }
    }
  };

  const onSubmitError = () => {
    console.log("he");
    if (errors?.email) {
      setStatus(true, errors.email.message, "error");
    }
  };

  return (
    <Box component="main" className={styles.pageContainer}>
      <Box className={styles.inputContainer}>
        <VABlobWithText text="Forgot your password? Don't worry! Just enter your email." />

        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", rowGap: "2rem" }}
          onSubmit={handleSubmit(submitHandler, onSubmitError)}
        >
          <Box className={styles.input}>
            <Typography>Email:</Typography>

            <TextField
              id="outlined-basic"
              size="normal"
              aria-label="email-input"
              sx={{
                width: "100%",
                backgroundColor: "var(--mui-palette-netural-200)",
                borderRadius: "5px",
              }}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Please enter a valid email address",
                },
              })}
              error={!!errors.email}
            />
          </Box>

          <Button
            variant="contained"
            size="large"
            sx={{
              background: "var(--mui-palette-primary-400)",
              paddingY: "1rem",
            }}
            type="submit"
          >
            Send Reset Link
          </Button>
        </Box>

        <Link href="/?auth=login" className={styles.goBackBtn}>
          Back to Login
        </Link>
      </Box>
      <StatusNotification />
    </Box>
  );
};

export default ForgotPassword;
