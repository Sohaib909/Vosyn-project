import React from "react";

import { MediaProvider } from "@/contextProviders/MediaRefProvider";
import { Grid2 } from "@mui/material";

import Navbar from "@/components/Navbar/Navbar";

const layout = ({ children }) => {
  return (
    <React.Suspense fallback={null}>
      <Grid2
        container
        component="main"
        sx={{ display: "flex", rowGap: "2rem" }}
      >
        <Navbar />
        <Grid2
          item
          size={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <MediaProvider>{children}</MediaProvider>
        </Grid2>
      </Grid2>
    </React.Suspense>
  );
};

export default layout;
