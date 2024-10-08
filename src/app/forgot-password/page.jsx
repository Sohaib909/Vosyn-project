import React from "react";

import { Box, Button, TextField } from "@mui/material";
import Link from "next/link";

import VABlobWithText from "@/components/VABlobWithText/VABlobWithText";

import "./page.module.css";

const ForgotPassword = () => {
  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box className="input-container">
        <VABlobWithText />
        <Box component="form">
          <TextField
            id="outlined-basic"
            size="small"
            aria-label="email-input"
          />
        </Box>
        <Button
          variant="contained"
          sx={{ background: "var(--mui-palette-primary-400)" }}
        >
          Send Reset Link
        </Button>
        <Link href="/?auth=login">Back to Login</Link>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
