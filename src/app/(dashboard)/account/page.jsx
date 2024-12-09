"use client";

import React, { useEffect, useState } from "react";

import { Close } from "@mui/icons-material";
import { Box, Icon, Typography } from "@mui/material";

import SettingsAccount from "@/components/UserProfile/Settings/SettingsAccount";
import SettingsAppearance from "@/components/UserProfile/Settings/SettingsAppearance";
import SettingsHome from "@/components/UserProfile/Settings/SettingsHome";
import SettingsLang from "@/components/UserProfile/Settings/SettingsLangPref";
import "@/components/UserProfile/Settings/SettingsPage.css";
import SettingsPrivacy from "@/components/UserProfile/Settings/SettingsPrivacy";

const SettingsPage = () => {
  const [currPage, setCurrPage] = useState("Settings");
  const [showSavedAlert, setShowSavedAlert] = useState(false);

  useEffect(() => {
    if (showSavedAlert) {
      const timer = setTimeout(() => {
        setShowSavedAlert(false);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [showSavedAlert]);

  const renderContent = () => {
    if (currPage === "Account") {
      return (
        <SettingsAccount
          setCurrPage={setCurrPage}
          setShowSavedAlert={setShowSavedAlert}
        />
      );
    } else if (currPage === "Privacy & Security") {
      return (
        <SettingsPrivacy
          setCurrPage={setCurrPage}
          showSavedAlert={showSavedAlert}
          setShowSavedAlert={setShowSavedAlert}
        />
      );
    } else if (currPage === "Language Preferences") {
      return (
        <SettingsLang
          setCurrPage={setCurrPage}
          showSavedAlert={showSavedAlert}
          setShowSavedAlert={setShowSavedAlert}
        />
      );
    } else if (currPage === "Appearance") {
      return (
        <SettingsAppearance
          setCurrPage={setCurrPage}
          showSavedAlert={showSavedAlert}
          setShowSavedAlert={setShowSavedAlert}
        />
      );
    } else {
      return (
        <SettingsHome
          setCurrPage={setCurrPage}
          setShowSavedAlert={setShowSavedAlert}
        />
      );
    }
  };

  return (
    <Box className="settings-container">
      {currPage !== "Settings" && (
        <Box className="crumbs">
          <button
            onClick={() => {
              setCurrPage("Settings");
              setShowSavedAlert(false);
            }}
          >
            Settings
          </button>{" "}
          {" > "} {currPage}
        </Box>
      )}
      <Box className="page-title">
        {currPage}
        {showSavedAlert && (
          <Box className="saved-alert">
            <Typography>Your changes have been saved</Typography>
            <Icon
              component={Close}
              onClick={() => setShowSavedAlert(false)}
            ></Icon>
          </Box>
        )}
      </Box>
      <Box className="line"></Box>
      {renderContent()}
    </Box>
  );
};

export default SettingsPage;
