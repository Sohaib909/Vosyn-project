"use client";

import React, { useState } from "react";

import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import TranslateIcon from "@mui/icons-material/Translate";
import { Box, Button, Grid2, IconButton } from "@mui/material";

import ContextualInfo from "@/components/AudioVideoCommonComponents/ContextualInfo/ContextualInfo";
import Summary from "@/components/Summary/Summary";
import TextPageCollapsablePanel from "@/components/TextPageCollapsablePanel/TextPageCollapsablePanel";
import TranslationPanel from "@/components/TranslationPanel/TranslationPanel";
import TranslationPanelFileUpload from "@/components/TranslationPanel/TranslationPanelFileUpload/TranslationPanelFileUpload";

const layout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [language, setLanguage] = useState("EN");

  const toggleRightPanel = () => setIsCollapsed(!isCollapsed);
  return (
    <Grid2 item container size={12} spacing={4}>
      <Grid2
        item
        container
        spacing={4}
        size={
          isCollapsed
            ? { xs: 12, sm: 12, md: 11, lg: 11, xl: 11 }
            : { xs: 12, sm: 12, md: 8, lg: 8, xl: 9 }
        }
      >
        <Grid2 item container size={12} spacing={2}>
          {children}

          <Grid2
            item
            container
            size={12}
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          ></Grid2>
        </Grid2>
      </Grid2>

      <Grid2
        container
        spacing={2}
        size={
          isCollapsed
            ? { xs: 12, sm: 12, md: 1, lg: 1, xl: 1 }
            : { xs: 12, sm: 12, md: 4, lg: 4, xl: 3 }
        }
        sx={{ height: "fit-content", gap: "2rem" }}
      >
        {isCollapsed ? (
          <Box
            component="section"
            sx={{
              borderRadius: "12px",
              backgroundColor: "var(--mui-palette-neutral-800)",
              padding: "0 0.75em",
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
              <TextPageCollapsablePanel setLanguage={setLanguage} />
            </Box>
          </Box>
        ) : (
          <Box
            component="section"
            sx={{
              margin: "0 2rem",
              width: "380px",
            }}
            startIcon={<TranslateIcon />}
          >
            <Box
              component="section"
              sx={{
                borderRadius: "12px",
                backgroundColor: "var(--mui-palette-neutral-800)",
              }}
            >
              <Box
                component="section"
                sx={{
                  display: "flex",
                  justifyContent: "left",
                }}
              >
                <IconButton onClick={toggleRightPanel}>
                  <KeyboardDoubleArrowRightIcon sx={{ color: "neutral.25" }} />
                </IconButton>
              </Box>
              <Box component="section">
                <TranslationPanel>
                  <TranslationPanelFileUpload mediaType={"text"} />
                  <Button
                    variant="contained"
                    sx={{
                      marginTop: "7px",
                      background: "var(--mui-palette-primary-400)",
                      "&:hover": {
                        background: "var(--mui-palette-primary-300)",
                      },
                    }}
                    startIcon={<TranslateIcon />}
                  >
                    Translate
                  </Button>
                </TranslationPanel>
              </Box>
            </Box>

            <Box
              component="section"
              sx={{ marginTop: "1rem", marginBottom: "1rem" }}
            >
              <Box
                component="section"
                sx={{
                  width: "100%",
                  marginBottom: "1rem",
                }}
              >
                <ContextualInfo />
              </Box>
              <Summary />
            </Box>
          </Box>
        )}
      </Grid2>
    </Grid2>
  );
};

export default layout;
