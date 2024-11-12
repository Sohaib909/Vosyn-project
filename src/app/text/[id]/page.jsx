"use client";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { textMockData } from "@/data/text";
import useStatusNotification from "@/hooks/useStatusNotification";
import { setTextObject } from "@/reduxSlices/textObjectSlice";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Box, IconButton, Typography } from "@mui/material";
import Link from "next/link";

import PageControl from "@/components/PageControl/PageControl";
import TranslationPanel from "@/components/TranslationPanel/TranslationPanel";

import styles from "./page.module.css";

const fetchAndHandleTextDetails = async (textId, dispatch, setStatus) => {
  try {
    const textData =
      textMockData.find((item) => item.id === parseInt(textId)) ||
      textMockData[2];
    dispatch(
      setTextObject({
        textUrlPdf: textData.textUrls.pdf,
        textUrlWord: textData.textUrls.word,
      }),
    );
    return textData;
  } catch (err) {
    setStatus(`${err?.response?.statusText}. Please try again later.`, "error");
  }
};

const TextPage = ({ params }) => {
  const { id: textId } = params;
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [language, setLanguage] = useState("EN");
  const [pageLength, setPageLength] = useState(0);
  const [paginatedContent, setPaginatedContent] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const [fontSize, setFontSize] = useState({
    title: 30,
    summary: 12,
    paragraph: 16,
    subtitle: 20,
  });
  //this approach has to be changed when backend integration happens
  const charLimitPage1 = 1395;
  const charLimitOtherPages = 4091;

  const dispatch = useDispatch();

  // Refs for each page to scroll
  const pageRefs = useRef([]);
  const textRef = useRef([]);

  // Choose the content based on the selected language
  const contentData = data?.translations?.[language] || {};
  const content = contentData?.translatedContent || data.content;
  const title = contentData?.translatedTitle || data.title;
  const subtitle = contentData?.translatedSubtitle || data.subtitle;
  const featuredImage = data?.featuredImage;
  // const summary = contentData?.translatedSummary || data.summary;

  const toggleRightPanel = () => setIsCollapsed(!isCollapsed);

  const { setStatus } = useStatusNotification();

  useEffect(() => {
    const loadTextData = async () => {
      const fetchedData = await fetchAndHandleTextDetails(
        textId,
        dispatch,
        setStatus,
      );
      setData(fetchedData);
    };
    loadTextData();
  }, [textId, dispatch]);

  useEffect(() => {
    const pages = [];
    let contentToSplit = content;

    // Split for Page 1 (with header)
    if (contentToSplit?.length > charLimitPage1) {
      pages.push(contentToSplit.slice(0, charLimitPage1));
      contentToSplit = contentToSplit.slice(charLimitPage1);
    } else {
      pages.push(contentToSplit);
      contentToSplit = "";
    }

    // Split for other pages (without header)
    while (contentToSplit?.length > 0) {
      pages.push(contentToSplit.slice(0, charLimitOtherPages));
      contentToSplit = contentToSplit.slice(charLimitOtherPages);
    }
    setPaginatedContent(pages);
    setPageLength(pages.length);
  }, [content]);

  const searchText = (input) => {
    const filterText = textRef.current.map((content) => {
      if (!content) return; // Check if the element exists
      const textToSearch = input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      const pattern = new RegExp(textToSearch, "gi");

      content.innerHTML = content.innerText.replace(
        pattern,
        (match) => `<mark className=highlighted-text>${match}</mark>`,
      );
    });

    return filterText;
  };

  const handleNextPage = () => {
    if (currentPage < paginatedContent.length) {
      setCurrentPage((prevPage) => prevPage + 1);
      pageRefs.current[currentPage].scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
      pageRefs.current[currentPage - 2].scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box className={styles.mainContainer}>
      <Box>
        <Typography
          variant="h2"
          aria-label="Back button"
          component={Link}
          href="/home"
          sx={{
            textDecoration: "none",
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "var(--mui-palette-neutral-200);",
          }}
        >
          <ArrowBackIosIcon sx={{ transform: "translateY(4px)" }} />
          Back
        </Typography>
      </Box>

      <Box className={styles.container}>
        <Box flexGrow={1}>
          <PageControl
            handleNextPage={handleNextPage}
            handlePrevPage={handlePrevPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageRefs={pageRefs}
            pageLength={pageLength}
            setFontSize={setFontSize}
            fontSize={fontSize}
            searchText={searchText}
          />

          {paginatedContent.map((pageContent, index) => (
            <Box
              key={index}
              ref={(el) => (pageRefs.current[index] = el)}
              sx={{
                mt: "45px",
                mb: 4,
                p: "2.5rem",
                border: "1px solid var(--mui-palette-neutral-50)",
                borderRadius: "18px",
                color: "var(--mui-palette-common-white)",
              }}
            >
              {index === 0 && (
                <Box mb={4} textAlign="center">
                  <Box sx={{ mb: 2 }}>
                    <img
                      src={
                        featuredImage
                          ? featuredImage
                          : process.env.PUBLIC_URL + `/assets/noImage.png`
                      }
                      alt="Featured"
                      style={{ width: "100%", borderRadius: "8px" }}
                    />
                  </Box>
                  <Typography
                    variant="h1"
                    sx={{
                      fontWeight: "bold",
                      fontSize: `${fontSize.title}px`,
                    }}
                  >
                    {title}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontSize: `${fontSize.subtitle}px` }}
                  >
                    {subtitle}
                  </Typography>
                </Box>
              )}

              <Typography
                ref={(el) => (textRef.current[index] = el)}
                variant="body1"
                sx={{
                  whiteSpace: "pre-wrap",
                  fontSize: `${fontSize.paragraph}px`,
                }}
              >
                {pageContent}
              </Typography>

              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
                <Typography variant="caption"> {index + 1}</Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {isCollapsed ? (
          <Box
            component="section"
            sx={{
              width: "fit-content",
              margin: "0 2rem",
              minWidth: "100px",
            }}
          >
            <Box
              component="section"
              sx={{ display: "flex", justifyContent: "left" }}
            >
              <IconButton onClick={toggleRightPanel}>
                <KeyboardDoubleArrowLeftIcon sx={{ color: "neutral.25" }} />
              </IconButton>
            </Box>
            <Box>
              {/* <TextPageCollapsablePanel setLanguage={setLanguage} /> */}
            </Box>
          </Box>
        ) : (
          <Box
            component="section"
            sx={{
              margin: "0 2rem",
              width: "380px",
            }}
          >
            <Box
              component="section"
              sx={{ display: "flex", justifyContent: "left" }}
            >
              <IconButton onClick={toggleRightPanel}>
                <KeyboardDoubleArrowRightIcon sx={{ color: "neutral.25" }} />
              </IconButton>
            </Box>
            <Box component="section">
              <TranslationPanel setLanguage={setLanguage} />
              {/* <TextPageTranslationPanel setLanguage={setLanguage} /> */}
            </Box>

            <Box component="section" sx={{ marginTop: "1rem" }}>
              {/* <Summary summary={summary} /> */}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TextPage;
