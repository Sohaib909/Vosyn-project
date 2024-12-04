import React from "react";
import { Grid2 } from "@mui/material";

const layout = ({ children }) => {

  return (
    <Grid2 item container size={12} spacing={4}>
      {children}
    </Grid2>
  );
};

export default layout;
