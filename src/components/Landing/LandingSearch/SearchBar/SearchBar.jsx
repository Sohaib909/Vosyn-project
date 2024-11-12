import React from "react";

import {
  MoreHorizRounded,
  SearchRounded,
  SendRounded,
} from "@mui/icons-material";
import { Box, Button, Grid2, IconButton, TextField } from "@mui/material";

const SearchBar = () => {
  return (
    <Grid2 item size={12} sx={{ display: "flex", alignItems: "center" }}>
      <SearchRounded sx={{ fontSize: "2.5rem" }} />
      <TextField
        fullWidth
        placeholder="AI Search...."
        sx={{
          "& fieldset": { border: "none" },
          "& input": { padding: "10px" },
        }}
      />

      <Box sx={{ display: "flex", columnGap: "1rem" }}>
        <IconButton>
          <MoreHorizRounded />
        </IconButton>
        <Button variant="contained">
          <SendRounded />
        </Button>
      </Box>
    </Grid2>
  );
};

export default SearchBar;
