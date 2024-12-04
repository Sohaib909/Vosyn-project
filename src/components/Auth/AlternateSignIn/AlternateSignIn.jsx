"use client";

import useStatusNotification from "@/hooks/useStatusNotification";
import { Box, Button } from "@mui/material";
import Image from "next/image";

import styles from "./AlternateSignIn.module.css";

const AlternateSignIn = () => {
  const { setStatus } = useStatusNotification();

  const displayNotImplementedMessage = () => {
    setStatus("This feature has not been implemented yet", "info", 5000);
  };

  return (
    <Box className={styles.alternateSignin}>
      <Button
        className={`${styles.formbtn} ${styles.googleLoginbtn}`}
        onClick={displayNotImplementedMessage}
      >
        <Image
          src="/mediaFiles/Logos/google.svg"
          alt="Google Icon"
          width={20}
          height={20}
          style={{ marginRight: "8px" }}
        />
        Continue with Google
      </Button>

      <Button
        className={`${styles.formbtn} ${styles.otherOptionsbtn}`}
        onClick={displayNotImplementedMessage}
      >
        See other options
      </Button>
    </Box>
  );
};

export default AlternateSignIn;
