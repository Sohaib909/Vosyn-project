import React from "react";

import { Grid2 } from "@mui/material";

import BackButton from "@/components/Buttons/BackButton/BackButton";

const layout = ({ children }) => {
  return (
    <Grid2
      container
      component="main"
      sx={{ px: "2rem" }}
      spacing={2}
      width={"100%"}
    >
      <Grid2 item size={12}>
        <BackButton />
      </Grid2>

      {children}
    </Grid2>
  );
};

export default layout;
