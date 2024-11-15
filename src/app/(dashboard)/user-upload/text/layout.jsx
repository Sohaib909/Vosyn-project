import React from "react";

import { Button, Grid2 } from "@mui/material";

import TextAndImageActionBtns from "@/components/TextAndImageActionBtns/TextAndImageActionBtns";
import TranslationPanel from "@/components/TranslationPanel/TranslationPanel";

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
        sx={{ height: "fit-content" }}
      >
        <TranslationPanel>
          <Button
            variant="contained"
            sx={{
              background: "var(--mui-palette-primary-400)",
              "&:hover": {
                background: "var(--mui-palette-primary-300)",
              },
            }}
          >
            Compare
          </Button>
        </TranslationPanel>

        <TextAndImageActionBtns />
      </Grid2>
    </Grid2>
  );
};

export default layout;
