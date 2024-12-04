"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Flag from "react-world-flags";

import {
  setOriginalLanguage,
  setTranslatedLanguage,
} from "@/reduxSlices/languageSlice";
import { ArrowDropDown } from "@mui/icons-material";
import {
  Box,
  FormControl,
  ListItemIcon,
  MenuItem,
  Select,
} from "@mui/material";

import "../TextPageCollapsablePanel/TextPageCollapsablePanel.scoped.css";

const TextPageCollapsablePanel = ({ setLanguage }) => {
  const [switchLanguage, setSwitchLanguage] = useState(false);

  useEffect(() => {
    switchLanguage
      ? setLanguage(selectedOriginalLanguage)
      : setLanguage(selectedTranslatedLanguage);
  }, [switchLanguage]);
  // Language list with country codes for flags
  const languages = [
    { code: "EN", name: "English", countryCode: "CA" },
    { code: "FR", name: "French", countryCode: "FR" },
    { code: "ES", name: "Spanish", countryCode: "ES" },
    { code: "DE", name: "German", countryCode: "DE" },
    { code: "JP", name: "Japanese", countryCode: "JP" },
  ];

  const dispatch = useDispatch();

  const selectedTranslatedLanguage = useSelector(
    (state) => state.languages.selectedTranslatedLanguage,
  );

  const selectedOriginalLanguage = useSelector(
    (state) => state.languages.selectedOriginalLanguage,
  );

  // setting language for comparing
  function setTranslang() {
    setSwitchLanguage((prev) => {
      return !prev;
    });
  }
  // Handle language selection change for both translated and original languages
  const handleLanguageChange = (event, type) => {
    if (type === "translated") {
      dispatch(setTranslatedLanguage(event.target.value));
    } else {
      dispatch(setOriginalLanguage(event.target.value));
    }
  };
  return (
    <Box
      sx={{
        marginTop: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "end",
      }}
    >
      <Box component="section" sx={{ marginBottom: "1rem" }}>
        <FormControl>
          <Box
            sx={{
              textAlign: "center",
              color: "var(--mui-palette-common-white)",
              marginBottom: "0.5rem",
            }}
          >
            {selectedTranslatedLanguage}
          </Box>
          <Select
            name="translatedLanguage"
            value={selectedTranslatedLanguage}
            onChange={(event) => handleLanguageChange(event, "translated")}
            IconComponent={ArrowDropDown}
            className="translation-panel-select"
            sx={{
              ".MuiSvgIcon-root": {
                fill: "var(--mui-palette-common-white)",
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: "var(--mui-palette-neutral-600)",
                },
              },
            }}
            renderValue={(value) => {
              const selected = languages.find((lang) => lang.code === value);
              return (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    columnGap: "5px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      paddingTop: "5px",
                    }}
                  >
                    <Flag
                      code={selected.countryCode}
                      className="translation-panel-flag"
                    />
                  </Box>
                </Box>
              );
            }}
          >
            {languages.map((lang) => (
              <MenuItem key={lang.code} value={lang.code}>
                <ListItemIcon>
                  <Flag
                    code={lang.countryCode}
                    className="translation-panel-flag"
                  />
                </ListItemIcon>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box component="section" sx={{ marginBottom: "1rem" }}>
        <FormControl>
          <Box
            sx={{
              textAlign: "center",
              color: "var(--mui-palette-common-white)",
              marginBottom: "0.5rem",
            }}
          >
            {selectedOriginalLanguage}
          </Box>
          <Select
            id="original-language-select"
            name="originalLanguage"
            value={selectedOriginalLanguage}
            MenuProps={{
              PaperProps: {
                sx: {
                  color: "var(--mui-palette-common-white)",
                  backgroundColor: "var(--mui-palette-neutral-600)",
                },
              },
            }}
            onChange={(event) => handleLanguageChange(event, "original")}
            IconComponent={ArrowDropDown}
            className="translation-panel-select"
            sx={{
              ".MuiSvgIcon-root": {
                fill: "var(--mui-palette-common-white)",
              },
            }}
            renderValue={(value) => {
              const selected = languages.find(
                (lang) => lang.countryCode === value,
              );
              return (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    columnGap: "5px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      paddingTop: "5px",
                    }}
                  >
                    <Flag
                      code={selected.countryCode}
                      className="translation-panel-flag"
                    />
                  </Box>
                </Box>
              );
            }}
          >
            {languages.map((lang) => (
              <MenuItem key={lang.code} value={lang.code}>
                <ListItemIcon>
                  <Flag
                    code={lang.countryCode}
                    className="translation-panel-flag"
                  />
                </ListItemIcon>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default TextPageCollapsablePanel;
