"use client";

import languages from "@/data/onboardingLanguages";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, useAutocomplete } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

import styles from "./LanguageSelectorMenu.module.css";

const Listbox = styled("ul")(() => ({
  width: "100%",
  position: "relative",
  listStyle: "none",
  overflowY: "auto",
  backgroundColor: "white",
  maxHeight: 200,
  margin: 0,
  padding: 0,

  "& li.Mui-focused": {
    backgroundColor: "#F3F3F3",
  },
}));

export default function LanguageSelectorMenu({
  hideLanguageSelector,
  currentLanguage,
  setCurrentLanguage,
  inputValue,
  setInputValue,
}) {
  const handleLanguageSelection = (language) => {
    if (language) {
      setCurrentLanguage({
        language: language.display_name,
        languageCode: language.value,
      });
      hideLanguageSelector();
    }
  };

  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    popupOpen,
  } = useAutocomplete({
    inputValue: inputValue === "Select language" ? "" : inputValue,
    options: languages,
    getOptionLabel: (option) => option?.display_name || "",
    onChange: (event, newValue) => handleLanguageSelection(newValue),
    onInputChange: (event, newInputValue, reason) => {
      if (reason === "input") {
        setInputValue(newInputValue);
      }
    },
  });

  return (
    <Box
      className={styles.languageSelectorContainer}
      sx={{ position: popupOpen ? "absolute" : "relative" }}
      {...getRootProps()}
    >
      <Box className={styles.languageListContainerTop}>
        <Box className={styles.listContainerTopHeader}>
          <Typography
            id="language-selector-label"
            className={styles.selectorButton}
            variant="button"
            gutterBottom
          >
            Select language
          </Typography>
          <IconButton
            aria-label="close language selector"
            onClick={() => hideLanguageSelector()}
            size="small"
          >
            <KeyboardArrowUpIcon className={styles.arrowIcon} />
          </IconButton>
        </Box>

        <Box className={styles.searchbar}>
          <SearchIcon className={styles.searchIcon} />
          <input
            autoFocus
            placeholder="Search language"
            className={styles.languageTextfield}
            aria-labelledby="language-selector-label"
            {...getInputProps()}
          />
        </Box>
      </Box>

      {groupedOptions.length > 0 && (
        <Listbox {...getListboxProps()} className={styles.listBox}>
          {groupedOptions.map((option, index) => {
            const isSelected = currentLanguage?.languageCode === option.value;
            return (
              <li
                {...getOptionProps({ option, index })}
                key={option.value}
                className={`${styles.listItem} ${isSelected ? styles.selected : ""}`}
              >
                {option.display_name}
              </li>
            );
          })}
        </Listbox>
      )}
    </Box>
  );
}
