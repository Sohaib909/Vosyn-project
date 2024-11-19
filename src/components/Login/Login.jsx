"use client";

import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import useStatusNotification from "@/hooks/useStatusNotification";
import { setLoggedIn } from "@/reduxSlices/authSlice";
import { setUserInfo } from "@/reduxSlices/userSlice";
import { emailValidation, passwordValidation } from "@/utils/formValidation";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  TextField,
} from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

import styles from "./Login.module.css";

/**
 * The login component with form inputs and submit button
 *
 * @returns - form with buttons
 */
const Login = () => {
  const dispatch = useDispatch();
  const { setStatus } = useStatusNotification();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [loginNonFieldError, setLoginNonFieldError] = useState({});

  /**
   * A method to handle form submissions
   *
   * @param {*} data - email and password
   */
  const submitLoginForm = async (data) => {
    try {
      // Remove this after the backend is back
      dispatch(setLoggedIn(true));
      const res = await axios.post("/api/auth/login", { data: data });

      // On success, save token, set status to imform user, set logged in status and set user info.
      if (res?.status === 200) {
        setStatus("Login successFull", "success");

        dispatch(setLoggedIn(true));
        dispatch(
          setUserInfo({ ...res?.data?.user, has_finished_onboarding: false }),
        );

        router.push("/home?tab=featured");
      }
    } catch (err) {
      const statusCode = err?.response?.status;

      if (statusCode && statusCode === 400) {
        const nonFieldError = err?.response?.data?.non_field_errors;

        if (nonFieldError && nonFieldError[0]) {
          setLoginNonFieldError({ error: true, message: nonFieldError[0] });
          setStatus(nonFieldError[0], "error");
        }
      } else {
        setStatus("Some error ocurred. Please try again later", "error");
      }
    }
  };

  return (
    <>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(submitLoginForm)}
        className={styles.loginContainer}
      >
        <Box sx={{ display: "flex", flexDirection: "column", rowGap: "1rem" }}>
          <TextField
            id="login-email"
            fullWidth
            size="medium"
            aria-label="email-input"
            placeholder="name@domain.com"
            label="Email Address"
            {...register("email", {
              ...emailValidation,
            })}
            error={!!errors.email || !!loginNonFieldError?.message}
            helperText={errors?.email?.message}
          />

          <TextField
            id="login-password"
            fullWidth
            size="medium"
            aria-label="password-input"
            placeholder="Your Password"
            label="Password"
            type="password"
            {...register("password", {
              ...passwordValidation,
            })}
            error={!!errors.password || !!loginNonFieldError.password}
            helperText={errors?.password?.message}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Remember Me"
            variant="contained"
          />
          <Link href="/forgot-password">Forgot Password?</Link>
        </Box>

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
          {isSubmitting ? <CircularProgress /> : "Log in"}
        </Button>
      </Box>
    </>
  );
};

export default Login;
