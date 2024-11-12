"use client";

import React, { useState } from "react";

import useStatusNotification from "@/hooks/useStatusNotification";
import { Divider, FormGroup, Grid2, Typography } from "@mui/material";
import axios from "axios";
import useSWR from "swr";

import { ListItemWithCheckbox, ListItemWithSwitch } from "../ListItem/ListItem";

const fetcher = (url) => axios.get(url).then((res) => res?.data);

const Playback = () => {
  const [autoplayNextEpisode, setAutoplayNextEpisode] = useState(true);
  const [autoplayVideoPreviews, setAutoplayVideoPreviews] = useState(true);
  const [videoQuality, setVideoQuality] = useState("Auto");

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

  const { setStatus } = useStatusNotification();

  const { error, mutate } = useSWR("/api/settings", fetcher, {
    onSuccess: (newData) => {
      const { autoplay_next_episode, autoplay_video_preview, video_quality } =
        newData.data.user;

      setAutoplayNextEpisode(autoplay_next_episode);
      setAutoplayVideoPreviews(autoplay_video_preview);
      setVideoQuality(video_quality);
    },
  });

  if (error) {
    setStatus("Failed to fetch settings", "error");
  }

  const saveSettings = async (newSettings) => {
    try {
      await axios.patch("/api/settings", newSettings);
      mutate();
    } catch (error) {
      setStatus("Failed to save settings", "error");
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
    <>
      <Typography sx={{ width: "100%" }} variant="h5">
        Playback Settings
      </Typography>

      <FormGroup sx={{ width: "100%" }}>
        <Typography variant="h6" sx={{ width: "100%", mb: "1rem" }}>
          Autoplay
        </Typography>
        <Grid2
          container
          spacing={2}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          {autoplaySettings.map((autoplay) => (
            <ListItemWithSwitch
              key={autoplay?.heading}
              heading={autoplay?.heading}
              subheading={autoplay?.subheading}
              onChange={
                autoplay?.heading === "Autoplay Next Episode"
                  ? handleAutoPlayChange
                  : handleVideoPreviewsChange
              }
              checked={
                autoplay?.heading === "Autoplay Next Episode"
                  ? autoplayNextEpisode
                  : autoplayVideoPreviews
              }
            />
          ))}
        </Grid2>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" sx={{ width: "100%", mb: "1rem" }}>
          Video Quality
        </Typography>
        <Grid2
          container
          spacing={2}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          {videoQualities.map((quality) => (
            <ListItemWithCheckbox
              key={quality?.heading}
              heading={quality?.heading}
              subheading={quality?.subheading}
              onChange={() => handleVideoQualityChange(quality?.value)}
              checked={videoQuality === quality?.heading}
            />
          ))}
        </Grid2>
      </FormGroup>
    </>
  );
};

export default Playback;
