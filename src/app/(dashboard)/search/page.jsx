import { Box, Typography } from "@mui/material";

import ComingSoon from "@/components/ComingSoon/ComingSoon";
import SearchResultSection from "@/components/SearchResult/SearchResultSection.jsx";

// Generate dynamic metadata for the search result page
export const generateMetadata = ({ searchParams }) => {
  const searchResult = searchParams?.query;
  return {
    title: searchResult
      ? `VosynVerse | Search Result For ${searchResult}`
      : "VosynVerse | Start Searching Now",
  };
};

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

const SearchResultPage = ({ searchParams }) => {
  // Getting the params from the server directly insteead of making this component a client server
  const query = searchParams?.query ?? "";

  return (
    <Box sx={{ padding: "2rem", maxHeight: "85vh", overflow: "hidden" }}>
      <ComingSoon />
      {query ? (
        <Typography
          sx={{ marginBottom: "2rem", fontSize: "1.125rem", fontWeight: "700" }}
        >
          Showing results for: &quot;<strong>{query}</strong>&quot;
        </Typography>
      ) : (
        <Typography
          sx={{ marginBottom: "2rem", fontSize: "1.25rem", fontWeight: "bold" }}
        >
          Start Searching in the Search Bar...
        </Typography>
      )}

      {/*Watch Section*/}
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
