// AccountLanguageSettingsPage.js
import React, { useEffect, useState } from "react";
import Flags from "react-world-flags";

// Import CSS module
import {
  getAccountLanguage,
  updateAccountLanguage,
} from "@/app/api/account/account.js";
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  styled,
  Typography,
} from "@mui/material";

import ComingSoon from "@/components/ComingSoon/ComingSoon";

import styles from "./AccountLanguageSettings.module.css";

// Language data with associated country codes
const languages = [
  { label: "German", code: "de" },
  { label: "Japanese", code: "jp" },
  { label: "English", code: "us" },
  { label: "French", code: "fr" },
];

const getFlagComponent = (code, className) => {
  return code ? (
    <Flags className={`${styles.flagsSelect} ${className}`} code={code} />
  ) : null;
};

const AccountLanguageSettingsPage = () => {
  const [allLanguages, setAllLanguages] = useState({
    display_language: "de",
    subtitle_language: "jp",
    dubbing_language: "fr",
    prefered_secondary_language: "de",
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAccountLanguage();
      if (data) setAllLanguages(data);
    };

    fetchData();
  }, []);

  const handleLanguageChange = (settingType) => async (event) => {
    const newValue = event.target.value;
    const languageCode = languages
      .find((lang) => lang.label === newValue)
      .code.toLowerCase();

    const updatedAccountLanguages = {
      ...allLanguages,
      [settingType]: languageCode,
    };
    setAllLanguages(updatedAccountLanguages);
    await updateAccountLanguage(updatedAccountLanguages);
  };

  const StyledSelect = styled(Select)({
    height: "20%",
    marginLeft: "10%",
    padding: 0,
    minWidth: "120px",
    maxWidth: "240px",
  });

  const menuProps = {
    PaperProps: {
      style: { maxHeight: 800, minWidth: "120px", maxWidth: "240px" },
    },
  };

  return (
    <Box className={styles.languageSettingsContainer}>
      <Box sx={{ width: "73%", height: "70vh", position: "absolute" }}>
        <ComingSoon />
      </Box>

      <Typography variant="h4" className={styles.languageTitle}>
        Language
      </Typography>
      <Typography variant="subtitle1" className={styles.languageSubtitle}>
        Language settings
      </Typography>

      <Box className={styles.languageSettingSection}>
        {/* Display Language Setting */}
        <Box className={styles.inlineSetting}>
          <Box className={styles.textArea}>
            <Typography variant="h6" className={styles.languageLabel}>
              Display language
            </Typography>
            <Typography
              variant="subtitle1"
              className={styles.languageDescription}
            >
              The text you can see on the VosynVerse platform
            </Typography>
          </Box>
          <FormControl className={styles.languageSelect}>
            <StyledSelect
              value={
                languages.find(
                  (lang) => lang.code === allLanguages.display_language,
                ).label
              }
              onChange={handleLanguageChange("display_language")}
              MenuProps={menuProps}
              renderValue={(value) => {
                const selectedLanguage = languages.find(
                  (lang) => lang.label === value,
                );
                return (
                  <Box className={styles.renderValueContainer}>
                    {getFlagComponent(
                      selectedLanguage?.code,
                      styles.selectedOption,
                    )}
                    <Typography variant="body1" className={styles.languageText}>
                      {selectedLanguage.label}
                    </Typography>
                  </Box>
                );
              }}
            >
              {languages.map((lang) => (
                <MenuItem key={lang.label} value={lang.label}>
                  <Box
                    className={styles.renderValueContainer}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    {getFlagComponent(lang.code, styles.selectedOption)}
                    <Typography variant="body1" className={styles.languageText}>
                      {lang.label}
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
            </StyledSelect>
          </FormControl>
        </Box>

        {/* Subtitle Language Setting */}
        <Box className={styles.inlineSetting}>
          <Box className={styles.textArea}>
            <Typography variant="h6" className={styles.languageLabel}>
              Subtitle language
            </Typography>
            <Typography
              variant="subtitle1"
              className={styles.languageDescription}
            >
              The written text translating spoken words in a video
            </Typography>
          </Box>
          <FormControl className={styles.languageSelect}>
            <StyledSelect
              value={
                languages.find(
                  (lang) => lang.code === allLanguages.subtitle_language,
                ).label
              }
              onChange={handleLanguageChange("subtitle_language")}
              MenuProps={menuProps}
              renderValue={(value) => {
                const selectedLanguage = languages.find(
                  (lang) => lang.label === value,
                );
                return (
                  <Box className={styles.renderValueContainer}>
                    {getFlagComponent(
                      selectedLanguage?.code,
                      styles.selectedOption,
                    )}
                    <Typography variant="body1" className={styles.languageText}>
                      {selectedLanguage.label}
                    </Typography>
                  </Box>
                );
              }}
            >
              {languages.map((lang) => (
                <MenuItem key={lang.label} value={lang.label}>
                  <Box className={styles.renderValueContainer}>
                    {getFlagComponent(lang.code, styles.selectedOption)}
                    <Typography variant="body1" className={styles.languageText}>
                      {lang.label}
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
            </StyledSelect>
          </FormControl>
        </Box>

        {/* Dubbing Language Setting */}
        <Box className={styles.inlineSetting}>
          <Box className={styles.textArea}>
            <Typography variant="h6" className={styles.languageLabel}>
              Dubbing language
            </Typography>
            <Typography
              variant="subtitle1"
              className={styles.languageDescription}
            >
              The language used to replace original speech in films or shows
            </Typography>
          </Box>
          <FormControl className={styles.languageSelect}>
            <StyledSelect
              value={
                languages.find(
                  (lang) => lang.code === allLanguages.dubbing_language,
                ).label
              }
              onChange={handleLanguageChange("dubbing_language")}
              MenuProps={menuProps}
              renderValue={(value) => {
                const selectedLanguage = languages.find(
                  (lang) => lang.label === value,
                );
                return (
                  <Box className={styles.renderValueContainer}>
                    {getFlagComponent(
                      selectedLanguage?.code,
                      styles.selectedOption,
                    )}
                    <Typography variant="body1" className={styles.languageText}>
                      {selectedLanguage.label}
                    </Typography>
                  </Box>
                );
              }}
            >
              {languages.map((lang) => (
                <MenuItem key={lang.label} value={lang.label}>
                  <Box className={styles.renderValueContainer}>
                    {getFlagComponent(lang.code, styles.selectedOption)}
                    <Typography variant="body1" className={styles.languageText}>
                      {lang.label}
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
            </StyledSelect>
          </FormControl>
        </Box>

        {/* Secondary Language Setting */}
        <Box className={styles.inlineSetting}>
          <Box className={styles.textArea}>
            <Typography variant="h6" className={styles.languageLabel}>
              Preferred secondary language
            </Typography>
            <Typography
              variant="subtitle1"
              className={styles.languageDescription}
            >
              Select your preferred secondary language
            </Typography>
          </Box>
          <FormControl className={styles.languageSelect}>
            <StyledSelect
              value={
                languages.find(
                  (lang) =>
                    lang.code === allLanguages.prefered_secondary_language,
                ).label
              }
              onChange={handleLanguageChange("prefered_secondary_language")}
              MenuProps={menuProps}
              renderValue={(value) => {
                const selectedLanguage = languages.find(
                  (lang) => lang.label === value,
                );
                return (
                  <Box className={styles.renderValueContainer}>
                    {getFlagComponent(
                      selectedLanguage?.code,
                      styles.selectedOption,
                    )}
                    <Typography variant="body1" className={styles.languageText}>
                      {selectedLanguage.label}
                    </Typography>
                  </Box>
                );
              }}
            >
              {languages.map((lang) => (
                <MenuItem key={lang.label} value={lang.label}>
                  <Box className={styles.renderValueContainer}>
                    {getFlagComponent(lang.code, styles.selectedOption)}
                    <Typography variant="body1" className={styles.languageText}>
                      {lang.label}
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
            </StyledSelect>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
};

export default AccountLanguageSettingsPage;
