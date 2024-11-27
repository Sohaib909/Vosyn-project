import { Box } from "@mui/material";

import OnboardingBackButton from "@/components/Onboarding/OnboardingSubheader/OnboardingBackButton";

import styles from "./OnboardingSubheader.module.css";

const OnboardingSubheader = ({ onboardingStep }) => {
  return (
    <Box className={styles.onboardingSubheader}>
      <OnboardingBackButton onboardingStep={onboardingStep} />
    </Box>
  );
};

export default OnboardingSubheader;
