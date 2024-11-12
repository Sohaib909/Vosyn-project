"use client";

import React, { useState } from "react";

import ArrowBackIosNew from "@mui/icons-material/ArrowBackIosNew";
import { Box, Button, Link, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

import ResetPassword from "./ResetPassword/ResetPassword";

const CheckEmail = ({ onBack }) => {
  const [showResetPassword, setShowResetPassword] = useState(false);

  if (showResetPassword) {
    return <ResetPassword onBack={() => setShowResetPassword(false)} />;
  }
  return (
    <Box
      sx={{
        width: "80%",
        mx: "10%",
        mt: "10vh",
      }}
    >
      <Grid container spacing={2}>
        <Grid item size={2}>
          <div>
            <Button
              startIcon={<ArrowBackIosNew />}
              onClick={onBack}
              sx={{
                textTransform: "none",
                bgcolor: "transparent",
                px: "8px",
                "&:hover": {
                  color: "#fff",
                },
              }}
            >
              Back
            </Button>
          </div>
        </Grid>

        <Grid item size={8}>
          <Typography variant="h5">Check Your Email</Typography>
          <Typography variant="subtitle1" sx={{ mt: "3vh" }}>
            An email with instructions on how to reset your password has been
            sent to Vosynai@mail.com. <br />
            Check your spam or junk folder if you don&apos;t see the email in
            your inbox.
          </Typography>
          <Typography variant="body2">
            If you no longer have access to this email account, please
            <Link
              sx={{ cursor: "pointer" }}
              onClick={() => setShowResetPassword(true)}
            >
              {" "}
              Contact us
            </Link>
            .
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CheckEmail;
