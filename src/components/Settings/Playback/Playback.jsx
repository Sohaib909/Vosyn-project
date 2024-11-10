"use client";

import React, { useEffect, useState } from "react";

import { SETTINGS_URL, UPDATE_SETTINGS_URL } from "@/constants/URLs/constants";
import ArrowBackIosNew from "@mui/icons-material/ArrowBackIosNew";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Switch,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import axios from "axios";

const Playback = ({ onBack }) => {
  const [autoplayNextEpisode, setAutoplayNextEpisode] = useState(true);
  const [autoplayVideoPreviews, setAutoplayVideoPreviews] = useState(true);
  const [videoQuality, setVideoQuality] = useState("auto");

  const videoQualities = [
    {
      heading: "Auto",
      subheading: "Adjust Based on Network",
      value: "auto",
    },
    {
      heading: "480p",
      subheading: "Standard Definition (SD) medium quality",
      value: "480p",
    },
    {
      heading: "720p",
      subheading: "High Definition (HD) quality",
      value: "720p",
    },
    {
      heading: "1080p",
      subheading: "Full HD quality",
      value: "1080p",
    },
    {
      heading: "4K (Ultra HD)",
      subheading: "Ultra-High Definition",
      value: "4k",
    },
  ];

  const autoplaySettings = [
    {
      heading: "Autoplay Next Episode",
      subheading:
        "Automatically plays the next episode in a series when the current one finishes",
    },
    {
      heading: "Autoplay Video Previews",
      subheading:
        "Automatically plays short video previews while browsing the app",
    },
  ];

  const Label = ({ heading, subheading }) => (
    <Box sx={{ pl: "2vw" }}>
      <Typography style={{ fontWeight: "bold" }}>{heading}</Typography>
      <Typography sx={{ opacity: "0.7", pt: "5px" }}>{subheading}</Typography>
    </Box>
  );

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get(SETTINGS_URL);
        const { autoplay_next_episode, autoplay_video_preview, video_quality } =
          response.data.user;

        setAutoplayNextEpisode(autoplay_next_episode);
        setAutoplayVideoPreviews(autoplay_video_preview);
        setVideoQuality(video_quality);
      } catch (error) {
        console.error("Failed to fetch settings", error);
      }
    };

    fetchSettings();
  }, []);

  const saveSettings = async (newSettings) => {
    try {
      await axios.patch(UPDATE_SETTINGS_URL, newSettings);
    } catch (error) {
      console.error("Failed to save settings", error);
    }
  };

  const handleAutoPlayChange = (e) => {
    const updatedValue = e.target.checked;
    setAutoplayNextEpisode(updatedValue);
    saveSettings({ autoplay_next_episode: updatedValue });
  };

  const handleVideoPreviewsChange = (e) => {
    const updatedValue = e.target.checked;
    setAutoplayVideoPreviews(updatedValue);
    saveSettings({ autoplay_video_preview: updatedValue });
  };

  const handleVideoQualityChange = (value) => {
    setVideoQuality(value);
    saveSettings({ video_quality: value });
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
          <Typography variant="h5">Playback Settings</Typography>
          <Typography variant="subtitle1" sx={{ opacity: "0.7" }}>
            Control your video viewing experience
          </Typography>

          <FormGroup sx={{ mt: "3vh" }}>
            <Typography variant="h6">Autoplay</Typography>
            {autoplaySettings.map((autoplay) => (
              <FormControlLabel
                key={autoplay.heading}
                control={<Switch defaultChecked />}
                checked={
                  autoplay.heading === "Autoplay Next Episode"
                    ? autoplayNextEpisode
                    : autoplayVideoPreviews
                }
                onChange={
                  autoplay.heading === "Autoplay Next Episode"
                    ? handleAutoPlayChange
                    : handleVideoPreviewsChange
                }
                label={
                  <Label
                    heading={autoplay.heading}
                    subheading={autoplay.subheading}
                  />
                }
                sx={{ mt: "2vh" }}
              />
            ))}
            <Divider sx={{ my: 3 }} />
            <Typography variant="h6">Video Quality</Typography>
            {videoQualities.map((quality) => (
              <FormControlLabel
                key={quality.value}
                control={
                  <Checkbox
                    checked={videoQuality === quality.value}
                    onChange={() => handleVideoQualityChange(quality.value)}
                  />
                }
                label={
                  <Label
                    heading={quality.heading}
                    subheading={quality.subheading}
                  />
                }
                sx={{ mt: "2vh" }}
              />
            ))}
          </FormGroup>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Playback;
