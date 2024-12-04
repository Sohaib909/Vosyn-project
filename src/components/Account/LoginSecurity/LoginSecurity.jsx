import React, { useState } from "react";

// Assuming MuiIcon is compatible with Next.js
// Importing the necessary MUI components
import { Box, Button, Typography } from "@mui/material";

// Updated for CSS modules
import MuiIcon from "../../../utils/MuiIcon.js";

import styles from "./LoginSecurity.module.css";

function LoginSecurityPage() {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleDeleteAccountClick = () => {
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  return (
    <Box className={styles["login-security-page"]}>
      <Typography variant="h1">Login and Security</Typography>
      <Typography variant="body1" className={styles.subtitle}>
        Account access and protection
      </Typography>

      <Box className={styles["settings-container"]}>
        <Typography variant="h2">Change personal setting</Typography>

        <Box className={styles["setting-item"]}>
          <Box className={styles["icon-placeholder"]}></Box>
          <Box className={styles["setting-info"]}>
            <Typography variant="body1" className={styles["setting-title"]}>
              Email
            </Typography>
            <Typography variant="body1" className={styles["setting-value"]}>
              Vosynai2024@gmail.com
            </Typography>
          </Box>
          <MuiIcon name="Edit" className={styles["edit-icon"]} />
        </Box>

        <Box className={styles["setting-item"]}>
          <Box className={styles["icon-placeholder"]}></Box>
          <Box className={styles["setting-info"]}>
            <Typography variant="body1" className={styles["setting-title"]}>
              Mobile phone
            </Typography>
            <Typography variant="body1" className={styles["setting-value"]}>
              123 456 7890
            </Typography>
          </Box>
          <MuiIcon name="Edit" className={styles["edit-icon"]} />
        </Box>

        <Box className={styles["setting-item"]}>
          <Box className={styles["icon-placeholder"]}></Box>
          <Box className={styles["setting-info"]}>
            <Typography variant="body1" className={styles["setting-title"]}>
              Password
            </Typography>
            <Typography variant="body1" className={styles["setting-value"]}>
              **********
            </Typography>
          </Box>
          <MuiIcon name="Edit" className={styles["edit-icon"]} />
        </Box>

        <Button
          className={styles["delete-account"]}
          onClick={handleDeleteAccountClick}
        >
          Delete Account
        </Button>
      </Box>

      {isPopupVisible && (
        <Box className={styles.popup}>
          <Box className={styles["popup-content"]}>
            <Typography variant="body1">
              {" "}
              Do you want to delete your account?{" "}
            </Typography>
            <Box className={styles["popup-buttons"]}>
              <Button disabled>Yes</Button>
              <Button onClick={handleClosePopup}>No</Button>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default LoginSecurityPage;
