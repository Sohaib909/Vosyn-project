"use client";

import React from "react";

import { settingItems } from "@/utils/settingItems";
import { ChevronRight } from "@mui/icons-material";
import { Box, Card, Container, Grid2, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

import { ListItemWithIcon } from "@/components/Settings/ListItem/ListItem";

const SettingsPage = () => {
  const router = useRouter();

  const handleClick = (value) => {
    router.push(`/settings/${value.replace(/ /g, "-").toLowerCase()}`);
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        justifyItems: "center",
        maxWidth: "1200px",
        padding: "16px",
        margin: "0 auto",
      }}
    >
      {/* <ComingSoon /> */}
      <Grid2 container size={{ xs: 12, md: 8, xl: 7 }}>
        <Container
          sx={{
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Settings
          </Typography>
          <Typography variant="subtitle1">
            Playback, download, notification, link 3rd party, subtitle, and
            more.
          </Typography>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "1rem",
            }}
          >
            {settingItems.map((setting) => (
              <ListItemWithIcon
                key={setting?.id}
                onClick={() => handleClick(setting.primaryText)}
                aria-label={`Select ${setting.primaryText}`}
                heading={setting.primaryText}
                subheading={setting.secondaryText}
                end={<ChevronRight />}
                start={setting?.icon}
              />
            ))}
          </Card>
        </Container>
      </Grid2>
    </Box>
  );
};
export default SettingsPage;
