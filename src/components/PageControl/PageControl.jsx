"use client";

import React, { useRef, useState } from "react";

import ArrowCircleDownRoundedIcon from "@mui/icons-material/ArrowCircleDownRounded";
import ArrowCircleUpRoundedIcon from "@mui/icons-material/ArrowCircleUpRounded";
import ListIcon from "@mui/icons-material/List";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ZoomInRoundedIcon from "@mui/icons-material/ZoomInRounded";
import ZoomOutRoundedIcon from "@mui/icons-material/ZoomOutRounded";
import { Box, Input, Typography } from "@mui/material";

import TextAndImageActionBtns from "@/components/TextAndImageActionBtns/TextAndImageActionBtns";

import styles from "./PageControl.module.css";

const PageControl = ({
  handleNextPage,
  handlePrevPage,
  currentPage,
  setCurrentPage,
  pageLength,
  setFontSize,
  searchText,
  pageRefs,
}) => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isPageJumpActive, setIsPageJumpActive] = useState(false);
  const [inputPageNumber, setInputPageNumber] = useState(currentPage);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [fontSizePercentage, setFontSizePercentage] = useState(100);
  const searchInputRef = useRef(null);

  const adjustFontSizes = (factor) => {
    setFontSizePercentage((prev) => {
      const newPercentage = Math.round(prev * factor);

      // Restrict the newPercentage to stay within 100 and 400
      const clampedPercentage =
        newPercentage < 100 ? 100 : newPercentage > 400 ? 400 : newPercentage;

      if (clampedPercentage !== prev) {
        const adjustmentFactor = clampedPercentage / prev;
        setFontSize((prevSizes) => ({
          title: Math.round(adjustmentFactor * prevSizes.title),
          summary: Math.round(adjustmentFactor * prevSizes.summary),
          paragraph: Math.round(adjustmentFactor * prevSizes.paragraph),
          subtitle: Math.round(adjustmentFactor * prevSizes.subtitle),
        }));
      }

      return clampedPercentage;
    });
  };

  const zoomIn = () => {
    const increase = 1.1; // Increase font size by 10%
    adjustFontSizes(increase);
  };

  const zoomOut = () => {
    const decrease = 0.9; // Decrease font size by 10%
    adjustFontSizes(decrease);
  };

  const toggleSearchInput = () => {
    setIsSearchActive((prev) => {
      const newState = !prev;
      if (newState) {
        setTimeout(() => {
          searchInputRef.current?.focus();
        }, 0);
      }
      return newState;
    });
  };

  const togglePageJumpInput = () => {
    setIsPageJumpActive((prev) => !prev);
  };

  const handlePageJumpChange = (event) => {
    const value = event.target.value;
    setInputPageNumber(value);
  };

  const handlePageJumpSubmit = (event) => {
    if (event.key === "Enter") {
      const pageNum = parseInt(inputPageNumber, 10);
      if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= pageLength) {
        setCurrentPage(pageNum);
        // Scroll to the specified page
        if (pageRefs.current && pageRefs.current[pageNum - 1]) {
          pageRefs.current[pageNum - 1].scrollIntoView({ behavior: "smooth" });
        }
      } else {
        setInputPageNumber(currentPage); // Reset to current page if invalid
      }
    }
  };

  const handleSearchInputChange = (event) => {
    const value = event.target.value;
    setSearchInputValue(value);
    searchText(value);
  };

  return (
    <Box className={styles.pageControlMainDiv}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "12.5rem",
        }}
      >
        <Box className={`${styles.pageControlSubDiv}`}>
          <Box sx={{ margin: "0 0.1em" }}>
            <ArrowCircleUpRoundedIcon
              onClick={handlePrevPage}
              fontSize="small"
            />
          </Box>
          <Box sx={{ margin: "0 0.1em" }}>
            <ArrowCircleDownRoundedIcon
              onClick={handleNextPage}
              fontSize="small"
            />
          </Box>
          <Box sx={{ margin: "0 0.1em", position: "relative" }}>
            <Typography
              sx={{ fontSize: "0.7rem", cursor: "pointer" }}
              onClick={togglePageJumpInput}
            >
              {currentPage} of {pageLength}
            </Typography>
            {isPageJumpActive && (
              <Box className={styles.pageJumpInputContainer}>
                <Input
                  type="number"
                  value={inputPageNumber}
                  onChange={handlePageJumpChange}
                  onKeyDown={handlePageJumpSubmit}
                  placeholder="Skip to a page"
                  sx={{
                    fontSize: "0.7rem",
                    width: "100%",
                    color: "var(--mui-palette-neutral-25)",
                    background: "var(--mui-palette-neutral-900)",
                    borderRadius: "3px",
                    padding: "0 0.2rem",
                    "&::before": { borderBottom: "none" },
                    "&::after": { borderBottom: "none" },
                    "&:hover:not(.Mui-disabled)::before": {
                      borderBottom: "none",
                    },
                  }}
                  inputProps={{ min: 1, max: pageLength }}
                />
              </Box>
            )}
          </Box>
        </Box>

        <Box className={`${styles.pageControlSubDiv}`}>
          <ZoomInRoundedIcon onClick={zoomIn} fontSize="small" />
          <ZoomOutRoundedIcon onClick={zoomOut} fontSize="small" />
          <Box sx={{ margin: "0 0.2em" }}>
            <Typography sx={{ fontSize: "0.7rem" }}>
              {fontSizePercentage}%
            </Typography>
          </Box>
          <ListIcon fontSize="small" />
        </Box>
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "1em" }}>
        <Box className={styles.customActionButtons}>
          <TextAndImageActionBtns />
        </Box>
        <Box
          className={`${styles.pageControlSubDiv} ${styles.searchContainerBox}`}
          onClick={toggleSearchInput}
        >
          <SearchRoundedIcon fontSize="small" />
          <Box sx={{ padding: "0.2em", width: "10em" }}>
            <Typography sx={{ fontSize: "0.75rem" }}>
              Search for a word
            </Typography>
          </Box>
          {isSearchActive && (
            <Box className={styles.searchInputContainer}>
              <Input
                ref={searchInputRef}
                type="text"
                value={searchInputValue}
                onClick={(event) => event.stopPropagation()}
                onChange={handleSearchInputChange}
                placeholder="Search"
                sx={{
                  color: "var(--mui-palette-neutral-25)",
                  fontSize: "0.65rem",
                  background: "var(--mui-palette-neutral-900)",
                  borderRadius: "3px",
                  padding: "0 0.2rem",
                  "&::before": { borderBottom: "none" },
                  "&::after": { borderBottom: "none" },
                  "&:hover:not(.Mui-disabled)::before": {
                    borderBottom: "none",
                  },
                }}
              />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default PageControl;
