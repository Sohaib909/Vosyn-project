"use client";

import useStatusNotification from "@/hooks/useStatusNotification";
import LanguageIcon from "@mui/icons-material/Language";
import { Box, ButtonBase, Typography } from "@mui/material";
import Image from "next/image";

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
  const { setStatus } = useStatusNotification();

  const headerText =
    activeTab === "signup" ? signupHeaderText : loginHeaderText;
  const colorScheme = "dark"; // hardcoding dark mode for now

  // TODO: Implement switching between different languages on login/signup page
  const toggleLanguage = () => {
    setStatus("This feature has not been implemented yet", "info", 5000);
  };

  const vosynLogoImg =
    colorScheme === "dark"
      ? "/mediaFiles/Logos/vosyn_logo_long.png"
      : "/mediaFiles/Logos/vosyn-logo-dark.svg";

  return (
    <Box className={styles.auth}>
      <Image
        src={vosynLogoImg}
        width={139}
        height={39}
        alt="Vosyn logo"
        className={styles.logoImg}
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
          <Typography>English</Typography>
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
