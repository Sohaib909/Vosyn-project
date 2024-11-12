"use client";

import React, { useState } from "react";

import useStatusNotification from "@/hooks/useStatusNotification";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Box, Divider, FormGroup, Grid2, Typography } from "@mui/material";
import axios from "axios";
import useSWR from "swr";

import { ListItemWithIcon, ListItemWithSwitch } from "../ListItem/ListItem";

const fetcher = (url) => axios.get(url).then((res) => res?.data);

const Notification = () => {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const [settings, setSettings] = useState({
    enable_notifications: false,
    new_content_alert: false,
    personalized_recommendation: false,
    subscription_updates: false,
    replies_to_my_comment: false,
    mentions: false,
  });

  const displayKeys = [
    "new_content_alert",
    "personalized_recommendation",
    "subscription_updates",
    "replies_to_my_comment",
    "mentions",
  ];

  const { setStatus } = useStatusNotification();

  const formatKey = (key) => {
    return key
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const { error, mutate } = useSWR("/api/settings", fetcher, {
    onSuccess: (newData) => {
      const response = newData.data.user;

      if (response.enable_notifications) setIsNotificationsEnabled(true);
      setSettings(response);
    },
  });

  if (error) {
    setStatus("Failed to fetch settings", "error");
  }

  const handleToggle = async (event) => {
    const { name, checked } = event.target;

    const updatedSettings = { ...settings, [name]: checked };

    if (name === "enable_notifications") setIsNotificationsEnabled(checked);

    setSettings(updatedSettings);
    try {
      await axios.patch("/api/settings", updatedSettings);
      mutate();
    } catch (error) {
      setStatus("Failed to save settings", "error");
    }
  };

  return (
    <>
      <Typography variant="h5" sx={{ width: "100%" }}>
        Notification Settings
      </Typography>

      <FormGroup
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          rowGap: "1rem",
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ width: "100%", mb: "1rem" }}>
            General
          </Typography>

          <ListItemWithSwitch
            name="enable_notifications"
            checked={settings?.enable_notifications}
            onChange={handleToggle}
            heading="Enable Notifications"
            subheading="All notifications are disabled"
          />
        </Box>

        <Divider />

        <Grid2
          container
          spacing={2}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          {displayKeys.map((key) => (
            <ListItemWithSwitch
              key={key}
              name={key}
              disabled={!isNotificationsEnabled}
              checked={settings[key]}
              onChange={handleToggle}
              heading={formatKey(key)}
              subheading={`Manage notifications for ${formatKey(key).toLowerCase()}`}
            />
          ))}
        </Grid2>
      </FormGroup>

      <Divider sx={{ width: "100%" }} />

      <Grid2
        container
        spacing={2}
        sx={{
          cursor: "pointer",
          width: "100%",
        }}
      >
        <ListItemWithIcon
          heading="Email Notifications"
          subheading="Receive notifications via email for important updates"
          end={<KeyboardArrowRightIcon />}
        />

        <ListItemWithIcon
          heading="Desktop Notifications"
          subheading="Display pop-up notifications on your desktop"
          end={<KeyboardArrowRightIcon />}
        />
      </Grid2>
    </>
  );
};

export default Notification;
