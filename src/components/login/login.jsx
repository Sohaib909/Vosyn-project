"use client";

import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { userLogin } from "@/app/api/auth/login/route";
import useStatusNotification from "@/hooks/useStatusNotification";
import { setLoggedIn } from "@/reduxSlices/authSlice";
import { setUserInfo } from "@/reduxSlices/userSlice";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";

import StatusNotification from "@/components/StatusNotification/StatusNotification";
import VABlobWithText from "@/components/VABlobWithText/VABlobWithText";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { setStatus } = useStatusNotification();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onBlur" });

  const [loginNonFieldError, setLoginNonFieldError] = useState({});

  const submitLoginForm = async (data) => {
    try {
      let res = await userLogin(data);
      if (res?.status === 200) {
        localStorage.setItem("token", res?.data?.token);
        setStatus("Login successFull", "success");
        dispatch(setLoggedIn(true));
        dispatch(
          setUserInfo({ ...res?.data?.user, has_finished_onboarding: false }),
        );
      }
    } catch (err) {
      let statusCode = err?.response?.status;
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "4vh",
        backgroundColor: "var(--mui-palette-primary-dark)",
        height: "100%",
        justifyContent: "inherit",
        alignItems: "inherit",
        paddingTop: "5vh",
      }}
    >
      <VABlobWithText text="Welcome Back!" />
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(submitLoginForm)}
      >
        <Box>
          <TextField
            sx={{
              width: "100%",
            }}
            {...register("email", {
              ...emailValidation,
            })}
            label="Email Address"
            type="email"
            required
          />
          <FormHelperText id="component-helper-text">a@a.com</FormHelperText>
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
          <FormControl
            sx={{
              width: "100%",
              borderRadius: "4px",
              color: "white",
            }}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Visibility"
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              {...register("password", {
                ...passwordValidation,
              })}
            />
          </FormControl>
          <FormHelperText id="component-helper-text">a@a12345</FormHelperText>
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
            &nbsp;{errors?.password && errors.password.message}
            {loginNonFieldError?.error && loginNonFieldError?.message}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Remember Me"
            variant="contained"
            size="large"
          />
          <Link href="/forgot-password">Forgot Password?</Link>
        </Box>
        <Button
          disabled={isSubmitting}
          sx={{
            backgroundColor: "var(--mui-palette-primary-400)",
            color: "white",
            paddingY: 2,
          }}
          type="submit"
        >
          Log in
        </Button>
      </Box>
      <StatusNotification />
    </Box>
  );
};

export default Login;
