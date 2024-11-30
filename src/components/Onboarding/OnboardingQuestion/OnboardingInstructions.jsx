import { Typography } from "@mui/material";

import styles from "./OnboardingQuestion.module.css";

const OnboardingInstructions = () => {
  return (
    <>
      <Typography
        className={styles.instructionBody}
        variant="body1"
        gutterBottom
      >
        Answer a few quick questions so we can show you the right content in
        your favourite language!
      </Typography>
    </>
  );
};

export default OnboardingInstructions;
