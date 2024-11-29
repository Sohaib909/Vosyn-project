import { Box, Button } from "@mui/material";
import Image from "next/image";

import styles from "./AlternateSignIn.module.css";

const AlternateSignIn = () => {
  return (
    <Box className={styles.alternateSignin}>
      <Button className={`${styles.formbtn} ${styles.googleLoginbtn}`}>
        <Image
          src="/mediaFiles/Logos/google.svg"
          alt="Google Icon"
          width={20}
          height={20}
          style={{ marginRight: "8px" }}
        />
        Continue with Google
      </Button>

      <Button className={`${styles.formbtn} ${styles.otherOptionsbtn}`}>
        See other options
      </Button>
    </Box>
  );
};

export default AlternateSignIn;
