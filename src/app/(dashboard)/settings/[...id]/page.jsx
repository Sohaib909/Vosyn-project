import React from "react";

import { settingItems } from "@/utils/settingItems";
import { Grid2 } from "@mui/material";

import BackButton from "@/components/Buttons/BackButton/BackButton";

const SettingItemPage = ({ params }) => {
  const { id } = params;

  const getPage = () => {
    const pageId = id[id.length - 1];

    for (const item of settingItems || []) {
      // Check if the primary text matches the last part of the id
      const route = item?.primaryText.replace(/ /g, "-").toLowerCase();
      if (route === pageId) {
        return item?.component;
      }

      // Check children if they exist
      if (item?.children) {
        for (const childItem of item.children) {
          const childRoute = childItem?.primaryText
            .replace(/ /g, "-")
            .toLowerCase();

          if (childRoute === pageId) {
            return childItem?.component;
          }
        }
      }
    }

    // Return null or default if no matching component is found
    return null;
  };

  return (
    <Grid2
      sx={{
        backgroundColor: "var(--mui-palette-neutral-800)",
        borderRadius: "12px",
        padding: "1rem",
        minHeight: "100%",
      }}
      container
      size={10}
    >
      <Grid2 item size={{ xs: 12, sm: 3 }}>
        <BackButton />
      </Grid2>
      <Grid2 container item size={{ xs: 12, sm: 9 }}>
        <Grid2 container item spacing={4} size={{ xs: 12, sm: 8 }}>
          {getPage()}
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default SettingItemPage;
