import React from "react";

import Grid2 from "@mui/material/Grid2";

const JumpIn = ({ data, Component }) => {
  return (
    <Grid2
      container
      spacing={2}
      sx={{
        display: "flex",
        width: "100%",
      }}
    >
      {data.slice(0, 6).map((item, i) => (
        <Grid2
          item
          size={{ md: 4, sm: 6, xs: 12 }}
          key={i}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Component item={item} section="jump-in" />
        </Grid2>
      ))}
    </Grid2>
  );
};

export default JumpIn;
