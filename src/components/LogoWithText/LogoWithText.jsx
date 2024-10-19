import React from "react";

import logo from "@/Images/Logos/vosyn_logo_long.png";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

import styles from "./LogoWithText.module.css";

/**
 * A component for the company logo and slogan
 *
 * @returns - logo with text component
 */
const LogoWithText = () => {
  return (
    <Box className={styles.textContainer}>
      <Box sx={{ height: "15%", width: "100%", position: "relative" }}>
        <Image src={logo} className={styles.logo} alt="Logo" />
      </Box>
      <Typography sx={{ fontSize: "larger" }}>The Voice of Tomorrow</Typography>
    </Box>
  );
};

export default LogoWithText;
