"use client";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";

import styles from "./OnboardingSubheader.module.css";

const OnboardingBackButton = ({ onboardingStep }) => {
  const router = useRouter();

  const handleGoBack = () => {
    if (onboardingStep > 0) {
      router.push(`/onboarding?step=${onboardingStep}`);
    }
  };
  return (
    <Box className={styles.backButtonContainer}>
      {onboardingStep > 0 && (
        <Button
          className={styles.backButton}
          variant="text"
          onClick={handleGoBack}
          disableRipple
        >
          <ArrowBackIosNewIcon className={styles.backButtonIcon} />
          Back
        </Button>
      )}
    </Box>
  );
};

export default OnboardingBackButton;
