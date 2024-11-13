import React from "react";

import { Grid2 } from "@mui/material";

const HorizontalScrollDisplayContainer = ({ data, Component }) => {
  return (
    <Grid2
      item
      container
      size={12}
      sx={{
        display: "flex",
        overflowX: "scroll",
        flexWrap: "nowrap",
        columnGap: "1rem",
      }}
    >
      {data?.length > 0 &&
        data?.slice(0, 20).map((item, i) => (
          <Grid2 item sx={{ minWidth: "fit-content" }} key={i}>
            <Component item={item} />
          </Grid2>
        ))}
    </Grid2>
  );
};

export default HorizontalScrollDisplayContainer;
