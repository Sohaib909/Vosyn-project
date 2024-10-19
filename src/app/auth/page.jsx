"use client";

import React, { Suspense, useEffect, useState } from "react";

import { Box, Tab, Tabs } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";

import Login from "@/components/Login/Login";
import LogoWithText from "@/components/LogoWithText/LogoWithText";
import Signup from "@/components/Signup/Signup";
import VABlobWithText from "@/components/VABlobWithText/VABlobWithText";

import styles from "./page.module.css";

const AuthContent = () => {
  const [type, setType] = useState("login");
  const searchParams = useSearchParams();
  const route = useRouter();

  useEffect(() => {
    const currentType = searchParams.get("type") || "login";
    setType(currentType);
  }, [searchParams]);

  return (
    <>
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
        {type === "login" ? <Login /> : <Signup />}
      </Box>

      <LogoWithText />
    </>
  );
};

/**
 * Wrap the page content in Suspense due to the useSearchParams method
 *
 * @returns - auth page with relavent components
 */
const AuthPage = () => {
  return (
    <Box component="main" className={styles.authContainer}>
      <Suspense>
        <AuthContent />
      </Suspense>
    </Box>
  );
};

export default AuthPage;
