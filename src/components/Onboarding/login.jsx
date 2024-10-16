"use client";

import React from "react";
import { useState } from "react";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";

import VABlobWithText from "@/components/VABlobWithText/VABlobWithText";

import styles from "./login.module.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const handleMouseUpPassword = (e) => {
    e.preventDefault();
  };
  return (
    <Box className={styles.login}>
      <VABlobWithText text="Welcome Back!" />
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: "2rem",
          marginTop: "2rem",
        }}
        onSubmit={() => {}}
      >
        <TextField
          id="login-email"
          fullWidth
          size="medium"
          aria-label="login-email"
          placeholder="a@a.com"
          label="Email"
        />
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            rowGap: "2rem",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Remember Me"
            style={styles.rememberme}
          />
          <Typography>
            <Link href="/forgot-password">Forgot Password?</Link>{" "}
          </Typography>
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
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
