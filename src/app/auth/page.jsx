"use client";

import React from "react";

import { Box, Tab, Tabs } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";

import LogoWithText from "@/components/LogoWithText/LogoWithText";
import Signup from "@/components/Signup/Signup";
import VABlobWithText from "@/components/VABlobWithText/VABlobWithText";

import styles from "./page.module.css";

const AuthPage = () => {
  const quary = useSearchParams();
  const type = quary.get("type");

  const route = useRouter();

  const getAuthComponent = () => {
    if (type === "login") return <Signup />;

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
            value="login"
            label="Login"
            onClick={() => route.push("/auth?type=login")}
          />
          <Tab
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
