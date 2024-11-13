import React from "react";

import useQueryParam from "@/hooks/useQueryParam";
import { Grid2 } from "@mui/material";

import SectionHeader from "../SectionHeader/SectionHeader";

const Built = ({ data, Component, handleClick }) => {
  const { getAllParams } = useQueryParam();
  const params = getAllParams();

  return (
    <Grid2 container item size={12} spacing={2} sx={{ height: "100%" }}>
      <SectionHeader
        heading="Built For You"
        subheading="Recommendations from vosynverse made to meet your interests"
        handleClick={handleClick}
      />

      <Grid2
        item
        container
        size={12}
        spacing={2}
        sx={{ overflowY: "auto", height: "84%" }}
      >
        {data.map((item, i) => (
          <Grid2
            item
            size={{
              xs: 12,
              md: params.tab === "video" || params.tab === "text" ? 6 : 12,
            }}
            key={i}
          >
            <Component item={item} />
          </Grid2>
        ))}
      </Grid2>
    </Grid2>
  );
};

export default Built;
