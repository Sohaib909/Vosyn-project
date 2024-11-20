"use client";

import { useState } from "react";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { IconButton } from "@mui/material";
import { Box, Button, ButtonBase, Typography } from "@mui/material";

import OnboardingInstructions from "@/components/Onboarding/OnboardingQuestion/OnboardingInstructions";

import styles from "./OnboardingQuestion.module.css";

const OnboardingQuestion = ({
  onboardingStep,
  steps,
  handleGoForward,
  selectedOptions,
  handleOptionSelect,
}) => {
  const [instructionVisibility, setInstructionVisibility] = useState(false);
  const handleInfoClick = () => {
    setInstructionVisibility((prevState) => !prevState);
  };

  return (
    <>
      <Box className={styles.instructionTextContainer}>
        {instructionVisibility && <OnboardingInstructions />}
      </Box>
      <Box className={styles.onboardingBody}>
        <Box className={styles.onboardingBodyContainer}>
          <Box className={styles.stepperHeader}>
            <Typography
              className={styles.stepperTitle}
              variant="h5"
              gutterBottom
            >
              {steps[onboardingStep].stepperTitle.text}{" "}
              <Typography
                component="span"
                variant="h5"
                className={`${styles.stepperTitle} ${styles.titleHighlight}`}
              >
                {steps[onboardingStep].stepperTitle.highlightText}
              </Typography>
              <IconButton
                aria-label={
                  instructionVisibility
                    ? "Hide instructions"
                    : "Show instructions"
                }
                onClick={handleInfoClick}
                disableRipple
              >
                <InfoOutlinedIcon className={styles.infoIcon} />
              </IconButton>
            </Typography>
          </Box>
          <Box className={styles.stepperOptions}>
            {steps[onboardingStep].options.map((option, index) => (
              <ButtonBase
                className={`${styles.optionButton} ${
                  selectedOptions[onboardingStep] === option.id
                    ? styles.selected
                    : ""
                }`}
                key={index}
                variant="outlined"
                disableRipple
                onClick={() => handleOptionSelect(onboardingStep, option.id)}
              >
                <Typography
                  component="span"
                  className={
                    option.optionText.boldText ? styles.optionBold : ""
                  }
                >
                  {option.optionText.boldText
                    ? option.optionText.boldText
                    : option.optionText}
                </Typography>
                &nbsp;
                <Typography component="span" className={styles.optionItalic}>
                  {option.optionText.italicText}
                </Typography>
              </ButtonBase>
            ))}
          </Box>
          <Box className={styles.continueButtonContainer}>
            <Button
              className={styles.continueButton}
              variant="contained"
              disableElevation
              disableRipple
              onClick={handleGoForward}
            >
              Continue
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default OnboardingQuestion;
