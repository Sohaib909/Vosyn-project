"use client";

import React, { useState } from "react";

import Box from "@mui/material/Box";

import AccountLanguageSettings from "@/components/Account/AccountLanguageSettings/AccountLanguageSettings";
import AccountNavigation from "@/components/Account/AccountNavigation/AccountNavigation";
import LoginSecurityPage from "@/components/Account/LoginSecurity/LoginSecurity";
import ProfileSettings from "@/components/Account/ProfileSettings/ProfileSettings";
import ComingSoon from "@/components/ComingSoon/ComingSoon";

import styles from "./AccountPage.module.css";

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState("profiles");

  return (
    <Box className={styles.accountPageContainer}>
      <Box className={styles.navigationContainer}>
        <AccountNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      </Box>
      <Box className={styles.profileContent}>
        {activeTab === "language" && <AccountLanguageSettings />}
        {activeTab === "profiles" && <ProfileSettings />}
        {activeTab === "security" && <LoginSecurityPage />}
        {activeTab === "dashboard" && (
          <Box sx={{ width: "70%", height: "75vh", position: "absolute" }}>
            <ComingSoon />
          </Box>
        )}
        {activeTab === "payment" && (
          <Box sx={{ width: "70%", height: "75vh", position: "absolute" }}>
            <ComingSoon />
          </Box>
        )}
        {activeTab === "appearance" && (
          <Box sx={{ width: "70%", height: "75vh", position: "absolute" }}>
            <ComingSoon />
          </Box>
        )}
        {activeTab === "shortcuts" && (
          <Box sx={{ width: "70%", height: "75vh", position: "absolute" }}>
            <ComingSoon />
          </Box>
        )}
        {activeTab === "help" && (
          <Box sx={{ width: "70%", height: "75vh", position: "absolute" }}>
            <ComingSoon />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AccountPage;
