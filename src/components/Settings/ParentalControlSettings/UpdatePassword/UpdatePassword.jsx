import React, { useState } from "react";

import ArrowBackIosNew from "@mui/icons-material/ArrowBackIosNew";
import { Box, Button, Link, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

import CheckEmail from "./Checkemail/Checkemail";

const UpdatePassword = ({ onBack }) => {
  const [showCheckEmail, setShowCheckEmail] = useState(false);

  if (showCheckEmail) {
    return <CheckEmail onBack={() => setShowCheckEmail(false)} />;
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
          <Typography variant="h5">Update password via email</Typography>
          <Typography variant="subtitle1" sx={{ opacity: "0.7", mt: "3vh" }}>
            We will send you an email with instructions on how to reset your
            password.
          </Typography>
          <Box
            sx={{
              borderRadius: "4px",
              backgroundColor: "var(--mui-palette-neutral-600)",
              height: "6vh",
              alignContent: "center",
              textAlign: "center",
              mt: "3vh",
              width: "20vw",
            }}
          >
            Vosynai2024@gmail.com
          </Box>
          <Button
            variant="contained"
            onClick={() => setShowCheckEmail(true)}
            sx={{ mt: "6vh", py: "2vh", px: "3vw", ml: "5vw" }}
          >
            Email me
          </Button>

          <Typography variant="body2" sx={{ mt: "6vh" }}>
            Need more help? <Link>Contact us</Link>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UpdatePassword;
