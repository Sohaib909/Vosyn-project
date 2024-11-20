"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import OnboardingLanguageSelect from "@/components/Onboarding/OnboardingLanguageSelect/OnboardingLanguageSelect";
import OnboardingQuestion from "@/components/Onboarding/OnboardingQuestion/OnboardingQuestion";

const OnboardingForm = ({ onboardingStep, steps }) => {
  const router = useRouter();

  const [selectedOptions, setSelectedOptions] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [currentLanguage, setCurrentLanguage] = useState({
    language: "English",
    languageCode: "en",
  });

  const handleGoForward = () => {
    router.push(`/onboarding?step=${onboardingStep + 2}`);
  };

  const handleOptionSelect = (stepIndex, optionId) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [stepIndex]: optionId,
    }));
  };

  const handleSubmitOnboarding = () => {
    const onboardingData = {
      selectedOptions,
      language: currentLanguage.languageCode,
    };

    const shouldCheck = false;
    if (onboardingData && shouldCheck) {
      // Dummy condition for committing code, since onboardingData stays unused
    }
  };

  // Handle invalid onboardingSteps, navigate to step 1
  if (
    isNaN(onboardingStep) ||
    onboardingStep < 0 ||
    onboardingStep > steps.length
  ) {
    router.replace("/onboarding?step=1");
    return null;
  }

  return (
    <>
      {onboardingStep < steps.length ? (
        <OnboardingQuestion
          onboardingStep={onboardingStep}
          steps={steps}
          handleGoForward={handleGoForward}
          selectedOptions={selectedOptions}
          handleOptionSelect={handleOptionSelect}
        />
      ) : (
        <OnboardingLanguageSelect
          currentLanguage={currentLanguage}
          setCurrentLanguage={setCurrentLanguage}
          handleSubmitOnboarding={handleSubmitOnboarding}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
      )}
    </>
  );
};

export default OnboardingForm;
