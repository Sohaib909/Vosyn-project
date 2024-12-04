"use client";

import React from "react";

import useClickOutside from "@/hooks/useClickOutside";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box, Button, ButtonBase, Typography } from "@mui/material";

import LanguageSelectorMenu from "@/components/LanguageSelectorMenu/LanguageSelectorMenu";

import styles from "./OnboardingLanguageSelect.module.css";

const OnboardingLanguageSelect = ({
  handleSubmitOnboarding,
  currentLanguage,
  setCurrentLanguage,
  inputValue,
  setInputValue,
}) => {
  const languageSelectorComponent = useClickOutside();

  const showLanguageSelector = () => {
    languageSelectorComponent.setIsVisible(true);
  };

  const hideLanguageSelector = () => {
    languageSelectorComponent.setIsVisible(false);
  };

  return (
    <Box className={styles.onboardingBody}>
      <Box className={styles.onboardingBodyContainer}>
        <Box className={styles.stepperHeader}>
          <Typography className={styles.stepperTitle} variant="h5" gutterBottom>
            You&apos;re a{" "}
            <Typography
              component="span"
              className={`${styles.stepperTitle} ${styles.titleHighlight}`}
            >
              legend{" "}
            </Typography>
            for completing that! 🎉
          </Typography>
        </Box>
        <Box className={styles.stepperSubheading}>
          <Typography
            variant="body1"
            gutterBottom
            sx={{ color: "var(--mui-palette-neutral-300)", fontWeight: "700" }}
          >
            Now, let’s make VosynVerse speak your language.
            <br />
            Pick your browsing language below and let the fun begin!
          </Typography>
        </Box>
        <Box
          className={styles.languageSelectorContainer}
          ref={languageSelectorComponent.ref}
        >
          {languageSelectorComponent.isVisible ? (
            <LanguageSelectorMenu
              hideLanguageSelector={hideLanguageSelector}
              setCurrentLanguage={setCurrentLanguage}
              currentLanguage={currentLanguage}
              inputValue={inputValue}
              setInputValue={setInputValue}
            />
          ) : (
            <ButtonBase
              className={styles.languageSelectorButtonContainer}
              onClick={showLanguageSelector}
              disableRipple
              sx={{ backgroundColor: "#f7f9ff12" }}
            >
              <Typography
                className={styles.selectorButton}
                variant="button"
                gutterBottom
                sx={{
                  color: "var(--mui-palette-primary-25)",
                }}
              >
                {currentLanguage.language}
              </Typography>
              <KeyboardArrowDownIcon className={styles.arrowIcon} />
            </ButtonBase>
          )}
          <Box className={styles.enterButtonContainer}>
            <Button
              className={
                currentLanguage.language === "Select language"
                  ? styles.enterButton
                  : styles.activeEnterButton
              }
              variant="contained"
              onClick={handleSubmitOnboarding}
              disableElevation
              disableRipple
            >
              Enter VosynVerse
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OnboardingLanguageSelect;
