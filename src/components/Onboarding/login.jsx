"use client";

import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";

// import { useDispatch } from "react-redux";
import { userLogin } from "@/app/api/auth";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";

import VABlobWithText from "@/components/VABlobWithText/VABlobWithText";

import styles from "./login.module.css";

const initialLoginNonFieldError = { error: false, message: "" };

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  //   const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({ mode: "onBlur" });

  const [loginNonFieldError, setLoginNonFieldError] = useState(
    initialLoginNonFieldError,
  );
  const [isLoading, setIsLoading] = useState(false);

  const submitLoginUpForm = async (data) => {
    try {
      setIsLoading(true);
      let res = await userLogin(data);
      if (res?.status === 200) {
        localStorage.setItem("token", res?.data?.token);
        setIsLoading(false);
        console.log("Login successFull", res);
        // dispatch(setLoggedIn(true));
        // dispatch(
        //   setUserInfo({ ...res?.data?.user, has_finished_onboarding: false }),
        // );
      }
    } catch (err) {
      setIsLoading(false);

      let statusCode = err?.response?.status;
      if (statusCode && statusCode === 400) {
        const nonFieldError = err?.response?.data?.non_field_errors;
        if (nonFieldError && nonFieldError[0]) {
          setLoginNonFieldError({ error: true, message: nonFieldError[0] });
        }
      } else {
        // dispatch(
        //   setToast({
        //     showSnackBar: true,
        //     message: "Some error ocurred. Please try again later",
        //     type: "red",
        //   }),
        // );
      }
    }
  };

  const emailValidation = {
    required: "Email is required",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Please enter a valid email address.",
    },
  };

  const passwordValidation = {
    required: "Please enter a password",
    pattern: {
      value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
      message:
        "It must be a combination of minimun 8 letters, numbers and symbols",
    },
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <Box className={styles.login}>
      <VABlobWithText text="Welcome Back!" />
      <Box
        component="form"
        className={styles.authForm}
        onSubmit={handleSubmit(submitLoginUpForm)}
      >
        <Box>
          <Typography
            sx={{
              color: "white",
              fontFamily: "Inter",
              fontSize: "14px",
              lineHeight: "19.6px",
              marginBottom: "4px",
            }}
          >
            Email Address
          </Typography>
          <TextField
            sx={{
              width: "100%",
              backgroundColor: "#333333",
              borderRadius: "4px",
              border: "1px #527af9 solid",
              color: "white",
            }}
            {...register("email", {
              ...emailValidation,
              onChange: () => {
                setLoginNonFieldError(initialLoginNonFieldError);
                if (errors.email) {
                  trigger("email");
                }
              },
            })}
            type="email"
            placeholder="a@a.com"
            required
          />
          <Typography
            sx={{
              color: "#ff0000",
              fontFamily: '"Inter Regular", sans-serif',
              fontSize: "13px",
              fontWeight: "100",
              lineHeight: "14px",
              textAlign: "left",
              padding: "10px 0px 14px",
            }}
          >
            &nbsp;{errors?.email && errors.email.message}
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{
              color: "white",
              fontFamily: "Inter",
              fontSize: "14px",
              lineHeight: "19.6px",
              marginBottom: "4px",
            }}
          >
            Password
          </Typography>
          <Box sx={{ position: "relative" }}>
            <TextField
              sx={{
                width: "100%",
                backgroundColor: "#333333",
                borderRadius: "4px",
                border: "1px #527af9 solid",
                color: "white",
              }}
              {...register("password", {
                ...passwordValidation,
                onChange: () => {
                  setLoginNonFieldError(initialLoginNonFieldError);
                  if (errors.password) {
                    trigger("password");
                  }
                },
              })}
              type={showPassword ? "text" : "password"}
              placeholder="Input Your Password"
              required
            />
            <Button
              onClick={handleTogglePasswordVisibility}
              sx={{
                position: "absolute",
                left: "80%",
                bottom: "-5px",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#525252",
              }}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </Button>
          </Box>
          <Typography
            sx={{
              color: "#ff0000",
              fontFamily: '"Inter Regular", sans-serif',
              fontSize: "13px",
              fontWeight: "100",
              lineHeight: "14px",
              textAlign: "left",
              padding: "10px 0px 14px",
              maxWidth: "11vw",
            }}
          >
            &nbsp;{errors?.password && errors.password.message}
            {loginNonFieldError?.error && loginNonFieldError?.message}
          </Typography>
        </Box>
        <Box class={styles.rememberForget}>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Remember Me"
            style={styles.rememberme}
            variant="contained"
            size="large"
          />
          <Typography>
            <Link href="/forgot-password">Forgot Password?</Link>{" "}
          </Typography>
        </Box>
        <Button
          disabled={isLoading}
          class={`${styles.loginButton} ${isLoading ? "buttonLoading" : ""}`}
          type="submit"
        >
          Log in
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
