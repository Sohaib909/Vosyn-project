"use client";

import React, { useEffect, useState } from "react";

import { getUserSettings, updateSettings } from "@/app/api/settings/settings";
import ArrowBackIosNew from "@mui/icons-material/ArrowBackIosNew";
import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  Link,
  Switch,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

const PrivacyData = ({ onBack }) => {
  const Label = ({ heading, subheading, padding = true }) => (
    <Box sx={{ pr: padding ? "2vw" : "0vw" }}>
      <Typography style={{ fontWeight: "bold" }}>{heading}</Typography>
      <Typography sx={{ opacity: "0.7", pt: "5px" }}>{subheading}</Typography>
    </Box>
  );

  const [allSettings, setAllSettings] = useState({
    location_tracking: false,
    generate_relevant_content: false,
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const settingsData = await getUserSettings();
        if (settingsData) setAllSettings(settingsData);
        console.log(settingsData, "Fetched settings data");
      } catch (error) {
        console.error("Error fetching user settings:", error);
      }
    };

    fetchSettings();
  }, []);

  const handleSwitchChange = async (event) => {
    const { name, checked } = event.target;
    const updatedSettings = { ...allSettings, [name]: checked };

    setAllSettings(updatedSettings);

    console.log(updatedSettings, "This is updated settings");

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
          <Typography variant="h5">Privacy and Data</Typography>
          <Typography variant="subtitle1" sx={{ opacity: "0.7", mb: "5vh" }}>
            Manage how your data is used and customize your privacy settings
          </Typography>

          <Label
            heading="Ads"
            subheading={
              <>
                You may see ads based on general factors, such as the topic of
                the video. For more information on how ads work, including
                specifics for family accounts with children, please visit our{" "}
                <Link sx={{ textDecoration: "none", cursor: "pointer" }}>
                  Help Center
                </Link>
                .
              </>
            }
            padding={false}
          />
          <FormGroup sx={{ mt: "5vh" }}>
            <FormControlLabel
              control={
                <Switch
                  name="location_tracking"
                  checked={allSettings.location_tracking}
                  onChange={handleSwitchChange}
                />
              }
              labelPlacement="start"
              label={
                <Label
                  heading={"Location Tracking"}
                  subheading={
                    <>
                      Location tracking allows us to provide location-specific
                      content and recommendations. You may receive tailored
                      suggestions based on your geographic location. For more
                      details on our location tracking policy, please refer to
                      our{" "}
                      <Link sx={{ textDecoration: "none", cursor: "pointer" }}>
                        Privacy Policy
                      </Link>
                    </>
                  }
                />
              }
              sx={{ mt: "2vh", ml: "0" }}
            />
            <FormControlLabel
              control={
                <Switch
                  name="generate_relevant_content"
                  checked={allSettings.generate_relevant_content}
                  onChange={handleSwitchChange}
                />
              }
              labelPlacement="start"
              label={
                <Label
                  heading={"Use Data to Generate Relevant Content"}
                  subheading={
                    <>
                      We utilize your viewing history and preferences to
                      generate personalized content recommendations. This helps
                      enhance your experience by suggesting shows and movies
                      that align with your interests. For further information on
                      data usage, consult our{" "}
                      <Link sx={{ textDecoration: "none", cursor: "pointer" }}>
                        Privacy Policy
                      </Link>
                    </>
                  }
                />
              }
              sx={{ mt: "5vh", ml: "0" }}
            />
          </FormGroup>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PrivacyData;
