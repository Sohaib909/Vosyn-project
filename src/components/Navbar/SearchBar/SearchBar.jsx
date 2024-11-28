"use client";

import { useEffect, useState } from "react";

import useDebounce from "@/hooks/useDebounce";
import useQueryParam from "@/hooks/useQueryParam.js";
import { normalizeSearchString } from "@/utils/requests";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import {
  Box,
  ButtonBase,
  List,
  ListItem,
  Typography,
  useAutocomplete,
} from "@mui/material";
import axios from "axios";
import Image from "next/image";

import styles from "./SearchBar.module.css";

/**
 * A component for the search input in the navbar
 *
 * @returns - SearchBar component
 */
const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm);

  const [selectedSearchSuggestion, setSelectedSearchSuggestion] =
    useState(null);
  const [currentSuggestions, setCurrentSuggestions] = useState([]);

  const { updateQueryParam } = useQueryParam();
  const {
    popupOpen,
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: "navbar-search-autocomplete",
    options: currentSuggestions,
    autoComplete: true,
    freeSolo: true,
    componentName: "SearchBar",
    filterOptions: (x) => x,
    includeInputInList: true,
    filterSelectedOptions: true,
    inputValue: searchTerm,
    value: selectedSearchSuggestion,
    onChange: (e, value) => {
      setCurrentSuggestions(
        value ? [value, ...currentSuggestions] : currentSuggestions,
      );
      setSelectedSearchSuggestion(value);

      // TODO: Route to search page
    },
    onInputChange: (e, value) => {
      setSearchTerm(value);
    },
    getOptionLabel: (option) => {
      return option?.label || "";
    },
  });

  // Fetch and update search suggestions from debouncedSearchTerm
  useEffect(() => {
    // TODO: Update to separate API that returns search suggestions instead of searched videos
    // Depending on the backend API, may want to highlight matched text https://mui.com/material-ui/react-autocomplete/#search-as-you-type
    const fetchSuggestions = async (inputSearchTerm) => {
      try {
        const searchParams = {
          sort_by: "view_count",
          limit: 8,
          page: 1,
          query: normalizeSearchString(inputSearchTerm),
        };
        const queryParams = new URLSearchParams(searchParams).toString();
        const res = await axios.get(`/api/video/videos?${queryParams}`);

        if (res?.status === 200) {
          return res?.data;
        }
        return [];
      } catch (err) {
        return [];
      }
    };

    if (debouncedSearchTerm === "") {
      setCurrentSuggestions(
        selectedSearchSuggestion ? [selectedSearchSuggestion] : [],
      );
      return undefined;
    }

    // Handle race conditions
    let ignoreResponse = false;

    fetchSuggestions(debouncedSearchTerm).then((response) => {
      if (!ignoreResponse) {
        let newSuggestions = selectedSearchSuggestion
          ? [selectedSearchSuggestion]
          : [];
        newSuggestions = [...newSuggestions, ...normalizeSuggestions(response)];

        setCurrentSuggestions(newSuggestions);
      }
    });

    return () => {
      ignoreResponse = true;
    };
  }, [debouncedSearchTerm, selectedSearchSuggestion]);

  // Normalize results returned from fetching search suggestions to be used in dropdown component
  const normalizeSuggestions = (rawSuggestions) => {
    if (rawSuggestions) {
      return rawSuggestions
        .map((suggestion) => {
          try {
            let normalizedSuggestion = {
              id: suggestion.document.id,
              label: suggestion.document.titles[0].toLowerCase(),
            };
            return normalizedSuggestion;
          } catch {
            return undefined;
          }
        })
        .filter((suggestion) => !!suggestion);
    } else {
      return [];
    }
  };

  // Redirect to the search page when the user clicks on the search button
  const handleClickSearch = () => {
    if (!searchTerm) return;
    updateQueryParam("query", searchTerm);
  };

  return (
    <Box className={styles.searchBarContainer}>
      <Box {...getRootProps()} className={styles.searchInputWrapper}>
        <SearchRoundedIcon
          sx={{ fontSize: "1.75rem", color: "white" }}
          className={styles.searchInputIcon}
        />
        <input
          {...getInputProps()}
          className={styles.searchInput}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleClickSearch();
          }}
          aria-label="Search VosynVerse"
        />
      </Box>
      {popupOpen &&
        (groupedOptions.length > 0 ? (
          <List
            {...getListboxProps()}
            sx={{
              position: "absolute",
              py: "0.75rem",
              "& li.Mui-focused": {
                backgroundColor: "var(--mui-palette-neutral-600)",
              },
              "& li:active": {
                backgroundColor: "var(--mui-palette-neutral-600)",
              },
            }}
            className={styles.searchDropdown}
          >
            {groupedOptions.map((result, index) => {
              const { ...optionProps } = getOptionProps({
                result,
                index,
              });

              return (
                <ListItem
                  {...optionProps}
                  key={result.id}
                  sx={{ px: "0.75rem" }}
                  className={`${styles.dropdownSuggestion}`}
                >
                  <SearchRoundedIcon
                    sx={{ fontSize: "1.5rem", color: "white", mr: "0.5rem" }}
                  />
                  <Typography noWrap>{result.label}</Typography>
                </ListItem>
              );
            })}
          </List>
        ) : (
          <Box
            sx={{
              position: "absolute",
              p: "0.75rem 1rem",
            }}
            className={styles.searchDropdown}
          >
            <Typography noWrap>There are no matching search results</Typography>
          </Box>
        ))}

      <ButtonBase
        onClick={handleClickSearch}
        sx={{
          backgroundColor: "var(--mui-palette-neutral-200)",
          borderRadius: "0rem 0.75rem 0.75rem 0rem",
        }}
        className={styles.vosynAssistButton}
      >
        <Image
          src="/mediaFiles/Logos/vosyn_logo.png"
          width={161}
          height={155}
          alt="VosynAssist Logo"
          className={styles.vosynAssistLogo}
        />
      </ButtonBase>
    </Box>
  );
};

export default SearchBar;
