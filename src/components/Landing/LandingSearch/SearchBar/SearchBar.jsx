import React, { useRef } from "react";

import logo from "@/Images/airis-logo.svg";
import { SendRounded } from "@mui/icons-material";
import { Box, Button, Grid2, TextField } from "@mui/material";
import Image from "next/image";

const SearchBar = ({
  searchInput,
  setSearchInput,
  isProcessingMessage,
  sendMessageToGemini,
}) => {
  const searchInputRef = useRef(null);

  const handleEnterKeyPress = (event) => {
    if (
      event.key === "Enter" &&
      searchInputRef.current === document.activeElement &&
      searchInput.length &&
      !isProcessingMessage
    ) {
      sendMessageToGemini();
    }
  };

  return (
    <Grid2 item sx={{ display: "flex", alignItems: "center", width: "100%" }}>
      {/* <SearchRounded sx={{ fontSize: 32 }} />
       */}
      <Image
        alt="video result thumbnail"
        src={logo}
        height={60}
        sx={{ transition: "opacity 2000ms ease-out 200ms" }}
      />
      <TextField
        autoComplete="off"
        fullWidth
        placeholder="Start exploring by searching or uploading anything"
        onChange={(e) => setSearchInput(e.target.value)}
        value={searchInput}
        inputRef={searchInputRef}
        onKeyDown={handleEnterKeyPress}
        sx={{
          "& fieldset": { border: "none" },
          "& input": { padding: "10px" },
        }}
      />

      <Box sx={{ display: "flex", columnGap: "1rem" }}>
        <Button
          variant="contained"
          onClick={sendMessageToGemini}
          sx={{ borderRadius: 3 }}
          disabled={
            searchInput.length === 0 || isProcessingMessage ? true : false
          }
          aria-label="Send message to VosynAssist"
        >
          <SendRounded />
        </Button>
      </Box>
    </Grid2>
  );
};

export default SearchBar;
