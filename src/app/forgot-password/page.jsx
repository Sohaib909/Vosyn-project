import React from "react";

import { Box, Button } from "@mui/material";
import Link from "next/link";

import FormInputs from "@/components/FormInputs/FormInputs";
import VABlobWithText from "@/components/VABlobWithText/VABlobWithText";

const ForgotPassword = () => {
  return (
    <Box component="main">
      <Box>
        <VABlobWithText />
        <FormInputs />
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
