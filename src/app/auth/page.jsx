"use client";

import React from "react";

import logo from "@/Images/Logos/vosyn_logo_long.png";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

import styles from "./page.module.css";

const AuthPage = () => {
  const quary = useSearchParams();
  const type = quary.get("type");

  const getAuthComponent = () => {
    if (type === "login") return <Box>Login</Box>;

    return <Box>Signup</Box>;
  };

  return (
    <Box component="main" className={styles.authContainer}>
      {getAuthComponent()}

      <Box className={styles.textContainer}>
        <Box sx={{ height: "15%", width: "100%", position: "relative" }}>
          <Image src={logo} className={styles.logo} />
        </Box>
        <Typography sx={{ fontSize: "larger" }}>
          The Voice of Tomorrow
        </Typography>
      </Box>
    </Box>
  );
};

export default AuthPage;
