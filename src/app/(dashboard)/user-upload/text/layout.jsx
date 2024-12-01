import React from "react";

import TranslateIcon from "@mui/icons-material/Translate";
import { Box, Button, Grid2 } from "@mui/material";

import ContextualInfo from "@/components/AudioVideoCommonComponents/ContextualInfo/ContextualInfo";
import Summary from "@/components/Summary/Summary";
import TextAndImageActionBtns from "@/components/TextAndImageActionBtns/TextAndImageActionBtns";
import TranslationPanel from "@/components/TranslationPanel/TranslationPanel";
import TranslationPanelFileUpload from "@/components/TranslationPanel/TranslationPanelFileUpload/TranslationPanelFileUpload";

const layout = ({ children }) => {
  return (
    <Grid2 item container size={12} spacing={4}>
      <Grid2
        item
        container
        spacing={4}
        size={{ xs: 12, sm: 12, md: 8, lg: 8, xl: 9 }}
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
        size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 3 }}
        sx={{ height: "fit-content", marginTop: "7rem", gap: "2rem" }}
      >
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

        <TextAndImageActionBtns />
        <Box
          component="section"
          sx={{
            width: "100%",
          }}
        >
          <ContextualInfo />
        </Box>
        <Summary />
      </Grid2>
    </Grid2>
  );
};

export default layout;
