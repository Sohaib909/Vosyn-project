import React, { useEffect, useState } from "react";

import { getUserSettings, updateSettings } from "@/app/api/settings/settings";
import ArrowBackIosNew from "@mui/icons-material/ArrowBackIosNew";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  Switch,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

const Notification = ({ onBack }) => {
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

  const formatKey = (key) => {
    return key
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await getUserSettings();
        console.log("Notification settings:", response);
        if (response) setSettings(response);
        if (response.enable_notifications) setIsNotificationsEnabled(true);
      } catch (error) {
        console.error("Error fetching notification settings:", error);
      }
    };

    fetchSettings();
  }, []);

  const Label = ({ heading, subheading, padding = true }) => (
    <Box sx={{ pl: padding ? "2vw" : "0vw" }}>
      <Typography style={{ fontWeight: "bold" }}>{heading}</Typography>
      <Typography sx={{ opacity: "0.7", pt: "5px" }}>{subheading}</Typography>
    </Box>
  );

  const handleToggle = async (event) => {
    const { name, checked } = event.target;

    console.log(name, checked);
    const updatedSettings = { ...settings, [name]: checked };

    if (name === "enable_notifications") setIsNotificationsEnabled(checked);

    setSettings(updatedSettings);
    try {
      const response = await updateSettings(updatedSettings);
      console.log("Updated settings response:", response);
    } catch (error) {
      console.error("Error updating settings:", error);
    }
  };

  return (
    <Box
      sx={{
        width: "80%",
        mx: "10%",
        mt: "10vh",
      }}
    >
      <Grid container spacing={2}>
        <Grid item size={2}>
          <div>
            <Button
              startIcon={<ArrowBackIosNew />}
              onClick={onBack}
              sx={{
                textTransform: "none",
                bgcolor: "transparent",
                px: "8px",
                "&:hover": {
                  color: "#fff",
                },
              }}
            >
              Back
            </Button>
          </div>
        </Grid>

        <Grid item size={8}>
          <Typography variant="h5">Notification Settings</Typography>
          <Typography variant="subtitle1" sx={{ opacity: "0.7" }}>
            Manage how and when you receive notifications
          </Typography>
          <FormGroup sx={{ mt: "4vh" }}>
            <FormControlLabel
              control={
                <Switch
                  name="enable_notifications"
                  checked={settings.enable_notifications}
                  onChange={handleToggle}
                  inputProps={{ "aria-label": "Enable Notifications" }}
                />
              }
              label={
                <Label
                  heading="Enable Notifications"
                  subheading="All notifications are disabled"
                />
              }
            />
            <Box
              disabled={!isNotificationsEnabled}
              sx={{
                pl: "1vw",
                pt: "4vh",
                display: "flex",
                flexDirection: "column",
                gap: "2vh",
              }}
            >
              {displayKeys.map((key) => (
                <FormControlLabel
                  key={key}
                  control={
                    <Switch
                      name={key}
                      disabled={!isNotificationsEnabled}
                      checked={settings[key]}
                      onChange={handleToggle}
                      inputProps={{ "aria-label": key }}
                    />
                  }
                  label={
                    <Label
                      heading={formatKey(key)}
                      subheading={`Manage notifications for ${formatKey(key).toLowerCase()}`}
                    />
                  }
                />
              ))}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                mt: "5vh",
                cursor: "pointer",
              }}
            >
              <Label
                heading="Email Notifications"
                subheading="Receive notifications via email for important updates"
                padding={false}
              />
              <KeyboardArrowRightIcon />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                mt: "5vh",
                cursor: "pointer",
              }}
            >
              <Label
                heading="Desktop Notifications"
                subheading="Display pop-up notifications on your desktop"
                padding={false}
              />
              <KeyboardArrowRightIcon />
            </Box>
          </FormGroup>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Notification;
