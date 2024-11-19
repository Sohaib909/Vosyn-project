import React from "react";

import { Typography } from "@mui/material";
import Grid2 from "@mui/material/Grid2";

import TextCard from "@/components/MediaDisplay/GeneralTab/TextCard/TextCard.jsx";
import WatchCard from "@/components/MediaDisplay/GeneralTab/Watch/WatchCard/WatchCard.jsx";
import ListenCard from "@/components/MediaDisplay/ListenTab/ListenCard/ListenCard.jsx";

const SearchResultSection = ({ data, section, children }) => {
  return (
    <>
      <Typography
        variant="h5"
        sx={{
          marginTop: "1rem",
          marginBottom: "1rem",
          fontSize: "1.25rem",
          fontWeight: "600",
          color: "rgba(87, 87, 87, 1)",
        }}
      >
        {children}
      </Typography>

      <Grid2
        container
        rowSpacing={4}
        columnSpacing={3}
        sx={{ justifyContent: "flex-start" }}
      >
        {Array.from({ length: 8 }, (_, index) => {
          return (
            <Grid2 item size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              {section === "watch" && <WatchCard item={data} />}
              {section === "listen" && (
                <ListenCard item={data} section="jump-in" />
              )}
              {section === "read" && <TextCard item={data} />}
            </Grid2>
          );
        })}
      </Grid2>
    </>
  );
};

export default SearchResultSection;
