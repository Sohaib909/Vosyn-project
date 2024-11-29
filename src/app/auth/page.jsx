import React from "react";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Box, Grid2 } from "@mui/material";
import { redirect } from "next/navigation";

import Auth from "@/components/Auth/Auth";

import styles from "./page.module.css";

/**
 * Wrap the page content
 *
 * @returns - auth page with relavent components
 */
const AuthPage = ({ searchParams }) => {
  const currentType = searchParams?.type;
  const validTypes = ["login", "signup"];

  if (!validTypes.includes(currentType)) {
    redirect("/auth?type=login");
  }

  return (
    <Grid2 container component="main" className={styles.pageLayout}>
      <Grid2
        size={{ xs: 12, sm: 7, md: 6, lg: 5, xl: 4 }}
        className={styles.pageLeftSide}
      >
        <Auth activeTab={currentType} />
      </Grid2>
      <Grid2
        size={{ xs: 0, sm: 5, md: 6, lg: 7, xl: 8 }}
        className={styles.pageRightSide}
      >
        <Box
          className={styles.backgroundImgContainer}
          style={{
            backgroundImage: `url(/mediaFiles/Background/auth-page-image.png)`,
          }}
        ></Box>
        <PlayArrowIcon className={styles.authPlayIcon} fontSize="inherit" />
      </Grid2>
    </Grid2>
  );
};

export default AuthPage;
