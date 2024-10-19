"use client";

import React from "react";

import { Box, Tab, Tabs } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";

import Login from "@/components/Login/Login";
import LogoWithText from "@/components/LogoWithText/LogoWithText";
import Signup from "@/components/Signup/Signup";
import VABlobWithText from "@/components/VABlobWithText/VABlobWithText";

import styles from "./page.module.css";

/**
 * The intergration page
 *
 * @returns - auth page with relavent components
 */
const AuthPage = () => {
  const quary = useSearchParams();
  const type = quary.get("type");

  const route = useRouter();

  const getAuthComponent = () => {
    if (type === "login") return <Login />;

    return <Signup />;
  };

  return (
    <Box component="main" className={styles.authContainer}>
      <Box className={styles.formContainer}>
        <VABlobWithText
          text={type === "login" ? "Welcome Back" : "Welcome! I’m AIRIS"}
        />
        <Tabs indicatorColor="secondary" textColor="inherit" value={type}>
          <Tab
            sx={{ fontSize: "larger" }}
            value="login"
            label="Log In"
            onClick={() => route.push("/auth?type=login")}
          />
          <Tab
            sx={{ fontSize: "larger" }}
            value="signup"
            label="Sign Up"
            onClick={() => route.push("/auth?type=signup")}
          />
        </Tabs>
        {getAuthComponent()}
      </Box>

      <LogoWithText />
    </Box>
  );
};

export default AuthPage;
