import { Box } from "@mui/material";

import OnboardingLogo from "@/components/Onboarding/OnboardingHeader/OnboardingLogo";
import OnboardingStepper from "@/components/Onboarding/OnboardingHeader/OnboardingStepper";

import styles from "./OnboardingHeader.module.css";

const OnboardingHeader = ({ onboardingStep, totalSteps }) => {
  return (
    <>
      <Box className={styles.onboardingNavbar}>
        <OnboardingLogo />
        <OnboardingStepper
          onboardingStep={onboardingStep}
          totalSteps={totalSteps}
        />
      </Box>
    </>
  );
};

export default OnboardingHeader;
