import React from "react";

import { Box, Button, TextField, Typography } from "@mui/material";
import Link from "next/link";

import VABlobWithText from "@/components/VABlobWithText/VABlobWithText";

import styles from "./page.module.css";

const ForgotPassword = () => {
  return (
    <Box component="main" className={styles.pageContainer}>
      <Box className={styles.inputContainer}>
        <VABlobWithText text="Forgot your password? Don't worry! Just enter your email." />

        <Box component="form" className={styles.input}>
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
          />
        </Box>

        <Button
          variant="contained"
          size="large"
          sx={{
            background: "var(--mui-palette-primary-400)",
            paddingY: "1rem",
          }}
        >
          Send Reset Link
        </Button>

        <Link href="/?auth=login" className={styles.goBackBtn}>
          Back to Login
        </Link>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
