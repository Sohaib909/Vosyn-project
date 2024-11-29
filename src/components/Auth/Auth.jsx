"use client";

import { useState } from "react";

import LanguageIcon from "@mui/icons-material/Language";
import { Box, ButtonBase, Typography } from "@mui/material";

import AlternateSignIn from "./AlternateSignIn/AlternateSignIn";
import LoginForm from "./LoginForm/LoginForm";
import SignupForm from "./SignupForm/SignupForm";

import styles from "./Auth.module.css";

const signupHeaderText = {
  prefix: "Join",
  text: "VosynVerse",
  suffix: "and Unlock Seamless Translation Across All Media",
};

const loginHeaderText = {
  prefix: "Translate and browse content in your language",
  text: "━ easily.",
  suffix: "",
};

const Auth = ({ activeTab }) => {
  const [language, setLanguage] = useState("English");
  const headerText =
    activeTab === "signup" ? signupHeaderText : loginHeaderText;

  const toggleLanguage = () => {
    setLanguage((prevLanguage) =>
      prevLanguage === "English" ? "French" : "English",
    );
  };

  return (
    <Box className={styles.auth}>
      <img
        className={styles.logoImg}
        src="/mediaFiles/Logos/vosyn-logo-dark.svg"
        alt="Vosyn logo"
      />

      <Box className={styles.authFormLayout}>
        <Typography className={styles.tagline} variant="h6">
          {headerText.prefix}{" "}
          <Typography
            variant="h6"
            component="span"
            className={styles.highlight}
          >
            {headerText.text}
          </Typography>{" "}
          {headerText.suffix}
        </Typography>

        <ButtonBase
          className={styles.languageSelectorBox}
          onClick={toggleLanguage}
        >
          <LanguageIcon />
          <Typography>{language}</Typography>
        </ButtonBase>

        <Box className={styles.authContent}>
          {activeTab === "login" ? <LoginForm /> : <SignupForm />}
        </Box>

        <Box className={styles.divider}>
          <Box component="span" className={styles.line} />
          <Typography className={styles.text}>Or</Typography>
          <Box component="span" className={styles.line} />
        </Box>

        <AlternateSignIn />
      </Box>
    </Box>
  );
};

export default Auth;
