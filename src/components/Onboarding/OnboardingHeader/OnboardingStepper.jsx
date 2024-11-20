"use client";

import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import MobileStepper from "@mui/material/MobileStepper";
import { useRouter } from "next/navigation";

import styles from "./OnboardingHeader.module.css";

const OnboardingStepper = ({ onboardingStep, totalSteps }) => {
  const router = useRouter();

  const handleSkipOnboarding = () => {
    router.push("/home");
  };
  return (
    <Box className={styles.pageStepper}>
      {onboardingStep < totalSteps && (
        <MobileStepper
          variant="dots"
          steps={totalSteps}
          position="static"
          activeStep={onboardingStep}
          className={styles.stepperComponent}
          classes={{
            dots: styles.stepperDots,
            dot: styles.stepperDot,
            dotActive: styles.stepperDotActive,
          }}
        />
      )}
      <Button
        className={styles.skipButton}
        variant="text"
        onClick={handleSkipOnboarding}
        disableRipple
      >
        Skip
      </Button>
    </Box>
  );
};

export default OnboardingStepper;
