"use client";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { textMockData } from "@/data/text";
import useStatusNotification from "@/hooks/useStatusNotification";
import { selectLanguage } from "@/reduxSlices/languageSlice";
import { setTextObject } from "@/reduxSlices/textObjectSlice";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

import PageControl from "@/components/PageControl/PageControl";

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
  const { textId } = params;
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLength, setPageLength] = useState(0);
  const [paginatedContent, setPaginatedContent] = useState([]);

  const { selectedTranslatedLanguage } = useSelector(selectLanguage);

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

  const { setStatus } = useStatusNotification();

  // Choose the content based on the selected language
  const contentData = data?.translations?.[selectedTranslatedLanguage] || {};
  const content = contentData?.translatedContent || data.content;
  const title = contentData?.translatedTitle || data.title;
  const subtitle = contentData?.translatedSubtitle || data.subtitle;
  const featuredImage = data?.featuredImage;
  // const summary = contentData?.translatedSummary || data.summary;

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
  }, [textId, dispatch, setStatus]);

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
              borderRadius: "12px",
              color: "var(--mui-palette-common-white)",
            }}
          >
            {index === 0 && (
              <Box mb={4} textAlign="center">
                <Box
                  sx={{
                    mb: 2,
                    position: "relative",
                    width: "100%",
                    height: "25rem",
                  }}
                >
                  <Image
                    fill
                    src={
                      featuredImage
                        ? featuredImage
                        : "https://placehold.co/800?text=No+Image&font=roboto"
                    }
                    alt="Featured"
                    style={{ borderRadius: "4px", objectFit: "cover" }}
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
    </Box>
  );
};

export default TextPage;
