// AccountLanguageSettingsPage.js
import React from "react";

// Import CSS module
import language from "@/Images/language.png";
import { Box } from "@mui/material";
import Image from "next/image";

import ComingSoon from "@/components/ComingSoon/ComingSoon";

import styles from "./AccountLanguageSettings.module.css";

const AccountLanguageSettingsPage = () => {
  return (
    <Box className={styles.languageSettingsContainer}>
      <Box sx={{ width: "73%", height: "70vh", position: "absolute" }}>
        <ComingSoon />
        <Image src={language} className={styles["background"]}></Image>
      </Box>
    </Box>
  );
};

export default AccountLanguageSettingsPage;
