"use client";

import React, { useCallback, useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import TranslateIcon from "@mui/icons-material/Translate";
import {
  Box,
  FormControl,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import dynamic from "next/dynamic";

import styles from "./TranslationPanel.module.css";

const Flag = dynamic(() => import("react-world-flags"), { ssr: false });

const languageOptionsTranslated = [
  { name: "English", code: "US" },
  { name: "Spanish", code: "ES" },
  { name: "French", code: "FR" },
];

const languageOptionsOriginal = [
  { name: "Japanese", code: "JP" },
  { name: "English", code: "US" },
  { name: "Chinese", code: "CN" },
];

const selectStyles = {
  height: "35px",
  width: "100%",
  backgroundColor: "transparent",
  color: "black",
  border: "0.5px solid darkgrey",
  "& .MuiSelect-select": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    color: "black",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
};

const menuProps = {
  PaperProps: {
    style: {
      maxHeight: 200,
    },
  },
  disableScrollLock: false,
};

const TranslationPanel = () => {
  const [translatedLanguage, setTranslatedLanguage] = useState({
    name: "English",
    code: "US",
  });
  const [originalLanguage, setOriginalLanguage] = useState({
    name: "Japanese",
    code: "JP",
  });
  const [detectedFile, setDetectedFile] = useState("sample-video.mp4");

  const handleTranslatedLanguageChange = useCallback((event) => {
    setTranslatedLanguage(event.target.value);
  }, []);

  const handleOriginalLanguageChange = useCallback((event) => {
    setOriginalLanguage(event.target.value);
  }, []);

  const renderMenuItem = (lang) => (
    <MenuItem key={lang.code} value={lang}>
      <ListItemIcon>
        <Flag code={lang.code} style={{ width: "20px", height: "15px" }} />
      </ListItemIcon>
      <ListItemText>{lang.name}</ListItemText>
    </MenuItem>
  );

  const renderSelectValue = (selected) => (
    <Box
      sx={{ display: "flex", alignItems: "center", gap: "8px", width: "100%" }}
    >
      <Flag
        code={selected.code}
        style={{ width: "20px", height: "15px", marginRight: "8px" }}
      />
      <Typography sx={{ flex: 1, textAlign: "center" }}>
        {selected.name}
      </Typography>
    </Box>
  );

  const handleDeleteFile = () => {
    setDetectedFile(null);
  };

  return (
    <div className={styles.languageSelector}>
      <FormControl fullWidth className={styles.dropdownContainer}>
        <Typography variant="body1" sx={{ color: "darkgrey" }}>
          Translated Language
        </Typography>
        <Select
          value={translatedLanguage}
          onChange={handleTranslatedLanguageChange}
          MenuProps={menuProps}
          sx={selectStyles}
          renderValue={renderSelectValue}
        >
          {languageOptionsTranslated.map(renderMenuItem)}
        </Select>
      </FormControl>

      <FormControl fullWidth className={styles.dropdownContainer}>
        <Typography variant="body1" sx={{ color: "darkgrey" }}>
          Original Language
        </Typography>
        <Select
          value={originalLanguage}
          onChange={handleOriginalLanguageChange}
          MenuProps={menuProps}
          sx={selectStyles}
          renderValue={renderSelectValue}
        >
          {languageOptionsOriginal.map(renderMenuItem)}
        </Select>
      </FormControl>

      {detectedFile && (
        <Box className={styles.detectedFile}>
          <Typography variant="body2" sx={{ color: "black" }}>
            Detected File: {detectedFile}
          </Typography>
          <IconButton
            size="small"
            color="secondary"
            onClick={handleDeleteFile}
            aria-label="Delete File"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      )}

      <div className={styles.compareText}>
        <TranslateIcon className={styles.translatorIcon} />{" "}
        <Typography variant="body1" sx={{ fontSize: "1rem", color: "white" }}>
          Compare
        </Typography>
      </div>
    </div>
  );
};

export default React.memo(TranslationPanel);
