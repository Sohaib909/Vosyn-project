import React, { useState } from "react";

import { LANGUAGES_URL } from "@/constants/URLs/constants";
import useStatusNotification from "@/hooks/useStatusNotification";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import axios from "axios";

import styles from "./AvailableLanguages.module.css";

const AvailableLanguages = ({
  languageTimeout,
  languageList,
  addToPinnedLanguages,
  selectedTrackIndex,
  handleAudioChange,
}) => {
  const [searchResults, setSearchResults] = useState([]);

  const { setStatus } = useStatusNotification();

  // Fetches languages and filters them based on the search string
  const getLanguages = async (searchString) => {
    if (!searchString) return;

    try {
      const response = await axios.get(LANGUAGES_URL);

      if (!response.ok) {
        setStatus(`Error Status: ${response.status}`, "error");
      }

      const data = await response?.data;

      const result = data
        ?.map((item) => item["English"])
        .filter(
          (language) =>
            language &&
            language.toLowerCase().includes(searchString.toLowerCase()),
        );

      setSearchResults(result);
    } catch (error) {
      setStatus("Error fetching the data", "error");
    }
  };

  // Updates search input and makes a call to fetch languages
  const handleChange = (input) => {
    getLanguages(input);
  };

  // Initiates the audio track change when a language is selected
  const handleLanguageClick = (langObj) => {
    const index = langObj.index - 1;

    //Skip translation if the selected language is already active
    if (index === selectedTrackIndex) {
      return;
    }

    handleAudioChange(langObj);
  };

  return (
    <Box
      component="section"
      sx={{ display: "flex", flexDirection: "column", rowGap: "1rem" }}
      onMouseEnter={() => clearTimeout(languageTimeout.current)}
    >
      <Box>
        <TextField
          id="search"
          fullWidth
          placeholder="Search any language"
          aria-label="Search"
          size="small"
          onChange={(e) => handleChange(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
      <Box className={styles.defaultLanguages}>
        {languageList.length > 0 ? (
          languageList.map((languageObj, index) => (
            <Typography
              variant="body2"
              key={index}
              sx={{
                width: "fit-content",
                backgroundColor:
                  selectedTrackIndex === languageObj.streamInfo.index
                    ? "var(--mui-palette-primary-main)"
                    : "var(--mui-palette-neutral-500)",
                borderRadius: "4px",
                padding: "2px 15px",
                "&:hover": {
                  backgroundColor: "var(--mui-palette-neutral-400)",
                },
              }}
              onClick={() => handleLanguageClick(languageObj)}
            >
              {languageObj.lang}
            </Typography>
          ))
        ) : (
          <Typography>No track available</Typography>
        )}
      </Box>
      {searchResults.length > 0 && (
        <Box
          sx={{
            backgroundColor: "var(--mui-palette-neutral-900)",
            padding: "1rem",
            borderRadius: "4px",
            maxHeight: "5rem",
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            rowGap: "10px",
          }}
        >
          {searchResults.map((language, index) => (
            <Typography
              key={index}
              variant="body2"
              sx={{
                "&:hover": {
                  backgroundColor: "var(--mui-palette-neutral-800)",
                  padding: "5px",
                  borderRadius: "2px",
                },
              }}
              onClick={(e) => {
                e.stopPropagation();
                addToPinnedLanguages(language);
              }}
            >
              {language}
            </Typography>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default AvailableLanguages;
