"use client";

import { useState } from "react";

import useStatusNotification from "@/hooks/useStatusNotification";
import axios from "axios";
import { useRouter } from "next/navigation";

import OnboardingLanguageSelect from "@/components/Onboarding/OnboardingLanguageSelect/OnboardingLanguageSelect";
import OnboardingQuestion from "@/components/Onboarding/OnboardingQuestion/OnboardingQuestion";

const OnboardingForm = ({ onboardingStep, steps }) => {
  const router = useRouter();
  const { setStatus } = useStatusNotification();

  const [selectedOptions, setSelectedOptions] = useState({});
  const [inputValue, setInputValue] = useState("");

  const [currentLanguage, setCurrentLanguage] = useState({
    language: "English",
    languageCode: "en",
  });

  const handleGoForward = () => {
    router.push(`/onboarding?step=${onboardingStep + 2}`);
  };

  const handleOptionSelect = (stepIndex, optionId, optionValue) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [stepIndex]: {
        id: optionId,
        value: optionValue,
      },
    }));
  };

  const handleSubmitOnboarding = async () => {
    let data = {};
    if (selectedOptions[0]?.value) {
      data.content_preference = selectedOptions[0].value;
    }
    if (selectedOptions[1]?.value) {
      data.preferred_language = selectedOptions[1].value;
    }
    if (selectedOptions[2]?.value) {
      data.usage_intent = selectedOptions[2].value;
    }

    try {
      const response = await axios.post("/api/onboarding", data);
      if (response?.status === 200) {
        setStatus("User preferences saved", "success");
        router.push("/home?tab=featured");
      }
    } catch (error) {
      setStatus("Error saving user preferences", "error");
    }
  };

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
