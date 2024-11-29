import { steps } from "@/data/onboardingSteps";
import { Box } from "@mui/material";
import { redirect } from "next/navigation";

import OnboardingForm from "@/components/Onboarding/OnboardingForm/OnboardingForm";
import OnboardingHeader from "@/components/Onboarding/OnboardingHeader/OnboardingHeader";
import OnboardingSubheader from "@/components/Onboarding/OnboardingSubheader/OnboardingSubheader";

import styles from "./page.module.css";

const OnboardingPage = ({ searchParams }) => {
  const onboardingStep = Number(searchParams?.step || 1) - 1;

  // Handle invalid onboardingStep, navigate to step 1
  if (
    isNaN(onboardingStep) ||
    onboardingStep < 0 ||
    onboardingStep > steps.length
  ) {
    redirect("/onboarding?step=1");
  }

  return (
    <Box component="main" className={styles.mainContainer}>
      <OnboardingHeader
        onboardingStep={onboardingStep}
        totalSteps={steps.length}
      />
      <OnboardingSubheader onboardingStep={onboardingStep} />
      <OnboardingForm onboardingStep={onboardingStep} steps={steps} />
    </Box>
  );
};

export default OnboardingPage;
