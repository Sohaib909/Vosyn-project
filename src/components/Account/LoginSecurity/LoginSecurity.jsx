import React from "react";

import login from "@/Images/login.png";
// Assuming MuiIcon is compatible with Next.js
// Importing the necessary MUI components
import { Box } from "@mui/material";
import Image from "next/image";

import ComingSoon from "@/components/ComingSoon/ComingSoon.jsx";

// Updated for CSS modules
import styles from "./LoginSecurity.module.css";

function LoginSecurityPage() {
  return (
    <Box className={styles["login-security-page"]}>
      <Box sx={{ width: "73%", height: "75vh", position: "absolute" }}>
        <ComingSoon />
        <Image src={login} className={styles["background"]}></Image>
      </Box>
    </Box>
  );
}

export default LoginSecurityPage;
