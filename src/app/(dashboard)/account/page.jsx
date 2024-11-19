"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import AccountLanguageSettings from "@/components/Account/AccountLanguageSettings/AccountLanguageSettings";
import AccountNavigation from "@/components/Account/AccountNavigation/AccountNavigation";
import ProfileSettings from "@/components/Account/ProfileSettings/ProfileSettings";
import LoginSecurityPage from "@/components/Account/LoginSecurity/LoginSecurity";
import styles from "./AccountPage.module.css";

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState("profiles");

  // useEffect(() => {
  //   setActiveTab("profiles");
  // }, []);

  return (
    <Box className={styles.accountPageContainer}>
      <Box className={styles.navigationContainer}>
        <AccountNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      </Box>
      <Box className={styles.profileContent}>
        {activeTab === "language" && <AccountLanguageSettings />}
        {activeTab === "profiles" && <ProfileSettings/>}
        {activeTab === "security" && <LoginSecurityPage />} 
        {activeTab === "dashboard" && <Box>Dashboard Content Here</Box>}
      </Box>
    </Box>
  );
};

export default AccountPage;