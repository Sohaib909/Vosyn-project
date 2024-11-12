"use client";

import React, { useEffect, useState } from "react";

import ArrowCircleDownRoundedIcon from "@mui/icons-material/ArrowCircleDownRounded";
import ArrowCircleUpRoundedIcon from "@mui/icons-material/ArrowCircleUpRounded";
import ListIcon from "@mui/icons-material/List";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ZoomInRoundedIcon from "@mui/icons-material/ZoomInRounded";
import ZoomOutRoundedIcon from "@mui/icons-material/ZoomOutRounded";
import { Box, Input, Typography } from "@mui/material";

import styles from "./PageControl.module.css";

const PageControl = ({
  handleNextPage,
  handlePrevPage,
  currentPage,
  setCurrentPage,
  pageRefs,
  pageLength,
  setFontSize,
  searchText,
}) => {
  const [openPageTextInput, setOpenPageTextInput] = useState(false);
  const [openSearchTextInput, setOpenSearchTextInput] = useState(false);
  const [inputPageNumber, setInputPageNumber] = useState(currentPage);
  const [searchInputValue, setSearchInputValue] = useState(null);

  useEffect(() => {
    const pageNum = parseInt(inputPageNumber, 10);

    if (!isNaN(pageNum)) {
      if (pageNum < 1) {
        setInputPageNumber(1);
      } else if (pageNum > pageLength) {
        setInputPageNumber(pageLength);
      } else {
        setCurrentPage(pageNum);
      }
      if (pageRefs.current && pageRefs.current[pageNum - 1]) {
        setTimeout(() => {
          pageRefs.current[pageNum - 1].scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [inputPageNumber, setCurrentPage, pageLength, pageRefs]);

  useEffect(() => {
    setInputPageNumber(currentPage);
  }, [currentPage]);

  const toggleTextInput = () => {
    setOpenPageTextInput((prev) => !prev);
    setOpenSearchTextInput(false);
  };

  const toggleSearchInput = () => {
    setOpenSearchTextInput((prev) => !prev);
    setOpenPageTextInput(false);
  };

  const adjustFontSizes = (factor) => {
    setFontSize((prevSizes) => ({
      title: Math.round(factor * prevSizes.title),
      summary: Math.round(factor * prevSizes.summary),
      paragraph: Math.round(factor * prevSizes.paragraph),
      subtitle: Math.round(factor * prevSizes.subtitle),
    }));
  };

  const zoomIn = () => {
    const increase = 1.1; // Increase font size by 10%
    adjustFontSizes(increase);
  };

  const zoomOut = () => {
    const decrease = 0.9; // Decrease font size by 10%
    adjustFontSizes(decrease);
  };

  const handleSearchTextChange = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setSearchInputValue(value);

    searchText(value);
  };

  const handleChange = (event) => {
    setInputPageNumber(event.target.value);
  };

  return (
    <Box className={styles.pageControlMainDiv}>
      <Box className={styles.paginationDiv}>
        <ArrowCircleUpRoundedIcon
          onClick={handlePrevPage}
          className={styles.pageControlIcon}
        />
        <ArrowCircleDownRoundedIcon
          onClick={handleNextPage}
          className={styles.pageControlIcon}
        />
        <SearchRoundedIcon
          onClick={toggleSearchInput}
          className={styles.pageControlIcon}
        />
        <Typography fontSize="12px" onClick={toggleTextInput}>
          {currentPage} of {pageLength}
        </Typography>
        <ZoomInRoundedIcon
          onClick={zoomIn}
          className={styles.pageControlIcon}
        />

        <ZoomOutRoundedIcon
          onClick={zoomOut}
          className={styles.pageControlIcon}
        />
        <ListIcon className={styles.pageControlIcon} />
      </Box>
      {openPageTextInput && (
        <Box
          sx={{
            "& > :not(style)": { m: 1 },
            display: "flex",
            justifyContent: "center",
          }}
          noValidate
          autoComplete="off"
          className={styles.inputPopUpDiv}
        >
          <SearchRoundedIcon className={styles.pageSearchIcon} />
          <Input
            type="number"
            placeholder="Skip to a page"
            value={inputPageNumber}
            min={1}
            max={pageLength}
            sx={{
              margin: "0.5rem",
              width: "100%",
              fontSize: "12px",
              padding: "0px",
              color: "var(--mui-palette-primary-contrastText)",
              "&::before": {
                borderBottom: "none", // Remove default underline
              },
              "&::after": {
                borderBottom: "none", // Ensure no underline after focus
              },
              "&:hover:not(.Mui-disabled)::before": {
                borderBottom: "none", // Remove underline on hover
              },
            }}
            onChange={handleChange}
            inputProps={{ min: 1, max: pageLength }}
          />
        </Box>
      )}

      {openSearchTextInput && (
        <Box
          sx={{
            "& > :not(style)": { m: 1 },
            display: "flex",
            justifyContent: "center",
          }}
          noValidate
          autoComplete="off"
          className={styles.inputPopUpDiv}
        >
          <SearchRoundedIcon className={styles.pageControlIcon} />
          <Input
            type="text"
            placeholder="Search a word"
            value={searchInputValue}
            sx={{
              fontSize: "12px",
              padding: "0px",
              color: "var(--mui-palette-primary-contrastText)",
              "&::before": {
                borderBottom: "none", // Remove default underline
              },
              "&::after": {
                borderBottom: "none", // Ensure no underline after focus
              },
              "&:hover:not(.Mui-disabled)::before": {
                borderBottom: "none", // Remove underline on hover
              },
            }}
            onChange={handleSearchTextChange}
          />
        </Box>
      )}
    </Box>
  );
};

export default PageControl;
