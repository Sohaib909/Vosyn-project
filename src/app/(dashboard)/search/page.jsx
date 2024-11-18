"use client";

import React, { useEffect, useState } from "react";

import useQueryParam from "@/hooks/useQueryParam.js";
import { Box, Typography } from "@mui/material";

import SearchResultSection from "@/components/SearchResult/SearchResultSection.jsx";

const tempData = {
  document: {
    thumbnail_url:
      "https://i.pinimg.com/originals/89/3e/5b/893e5bdf0499d714ddf77def68510bf2.jpg", // Dummy image
    titles: [
      "Fall in Love with Nature on an Island", // Short title for display
    ],
    author: "John Doe", // Dummy author name
    pages: 120, // Dummy number of pages
  },
};

const SearchResultPage = () => {
  const { getAllParams } = useQueryParam();
  const [query, setQuery] = useState("");
  useEffect(() => {
    const params = getAllParams();
    setQuery(params.query || "No query provided");
  }, [getAllParams]);
  return (
    <Box sx={{ padding: "2rem" }}>
      {/*Watch Section*/}
      <Typography
        sx={{ marginBottom: "2rem", fontSize: "1.25rem", fontWeight: "bold" }}
      >
        Showing results for: &quot;<strong>{query}</strong>&quot;
      </Typography>
      <SearchResultSection data={tempData} section="watch">
        Watch
      </SearchResultSection>

      {/*  Listen Section */}
      <SearchResultSection data={tempData} section="listen">
        Listen
      </SearchResultSection>

      {/*  Read Section */}
      <SearchResultSection data={tempData} section="read">
        Read
      </SearchResultSection>
    </Box>
  );
};

export default SearchResultPage;
