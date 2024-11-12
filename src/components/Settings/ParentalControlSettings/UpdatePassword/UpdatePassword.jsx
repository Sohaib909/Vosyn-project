"use client";

import React from "react";

import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

const UpdatePassword = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        rowGap: "2rem",
      }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography variant="h5">Update password via email</Typography>
        <Typography variant="subtitle1" sx={{ opacity: "0.7" }}>
          We will send you an email with instructions on how to reset your
          password.
        </Typography>
      </Box>

      <Box
        sx={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          rowGap: "1rem",
        }}
      >
        <TextField fullWidth placeholder="placeholder@gmail.com" />
        <Button variant="contained" onClick={() => router.push(`${pathname}/`)}>
          Email me
        </Button>
      </Box>
      <Typography variant="body2">
        Need more help? <Link>Contact us</Link>
      </Typography>
    </Box>
  );
};

export default UpdatePassword;
