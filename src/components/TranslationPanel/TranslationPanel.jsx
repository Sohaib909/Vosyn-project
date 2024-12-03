import React from "react";

import { languages } from "@/data/languages";
import { Box } from "@mui/material";

import TranslationPanelInput from "./TranslationPanelInput/TranslationPanelInput";

const TranslationPanel = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        rowGap: "2rem",
        backgroundColor: "var(--mui-palette-neutral-800)",
        padding: "1.5rem",
        borderRadius: "12px",
        width: "100%",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", rowGap: "1.5rem" }}>
        <TranslationPanelInput
          array={languages}
          label="Translated Language"
          classNameSelect={true}
        />
        <TranslationPanelInput
          array={languages}
          label="Detected Language"
          classNameSelect={true}
        />
      </Box>

      {children}
    </Box>
  );
};

export default TranslationPanel;
