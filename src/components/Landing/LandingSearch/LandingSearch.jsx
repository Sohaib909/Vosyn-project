import React from "react";

import { Divider, Grid2 } from "@mui/material";

import DragAndDrap from "../DragAndDrop/DragAndDrap";
import UploadInteractions from "../UploadInteractions/UploadInteractions";
import SearchBar from "./SearchBar/SearchBar";

const LandingSearch = () => {
  return (
    <Grid2
      container
      item
      size={12}
      spacing={2}
      sx={{
        backgroundColor: "var(--mui-palette-neutral-800)",
        padding: "2rem",
        borderRadius: "12px",
      }}
    >
      <SearchBar />

      <Divider sx={{ width: "100%" }} />

      <Grid2
        container
        item
        size={12}
        spacing={2}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Grid2 item size={{ xs: 12, sm: 8, md: 8, lg: 9, xl: 9 }}>
          <DragAndDrap />
        </Grid2>
        <Grid2 item size={{ xs: 12, sm: 4, md: 4, lg: 3, xl: 3 }}>
          <UploadInteractions />
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default LandingSearch;
