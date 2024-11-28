import React from "react";

import { Grid2 } from "@mui/material";

const YouMightAlsoLike = ({ data, Component }) => {
  return (
    <Grid2 container size={12}>
      {data.slice(0, 6).map((item, i) => {
        return (
          <Grid2 key={i} item sx={{ display: "flex" }} size={2}>
            <Component item={item} section="youMightLike" />
          </Grid2>
        );
      })}
    </Grid2>
  );
};

export default YouMightAlsoLike;
