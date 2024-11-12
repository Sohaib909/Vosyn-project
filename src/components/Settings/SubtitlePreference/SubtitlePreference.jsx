"use client";

import React, { useState } from "react";

import {
  Box,
  Divider,
  FormGroup,
  Grid2,
  MenuItem,
  Select,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";

import { ListItemWithSwitch } from "../ListItem/ListItem";

const SubtitlePreference = () => {
  const [showSubtitles, setShowSubtitles] = useState(false);
  const [playDubbedAudio, setPlayDubbedAudio] = useState(false);
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [fontStyle, setFontStyle] = useState("Sans Serif");
  const [fontSize, setFontSize] = useState("Medium");
  const [backgroundColor, setBackgroundColor] = useState("#000000");
  const colors = [
    "#000000",
    "#FFFFFF",
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#00FFFF",
    "#FF00FF",
  ];
  const handleFontSize = (event, newSize) => {
    if (newSize !== null) {
      setFontSize(newSize);
    }
  };

  return (
    <>
      <Typography variant="h5" sx={{ width: "100%" }}>
        Subtitle Preference
      </Typography>

      <FormGroup
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          rowGap: "1rem",
        }}
      >
        <Typography variant="h6">General</Typography>
        <ListItemWithSwitch
          checked={showSubtitles}
          onChange={() => setShowSubtitles(!showSubtitles)}
          heading={"Always show subtitles"}
          subheading={"Automatically show subtitles for all videos"}
        />
        <ListItemWithSwitch
          checked={playDubbedAudio}
          onChange={() => setPlayDubbedAudio(!playDubbedAudio)}
          heading={"Always play dubbed audio"}
          subheading={"Automatically play dubbed audio when available"}
        />
      </FormGroup>

      <Divider sx={{ width: "100%" }} />

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          rowGap: "2rem",
        }}
      >
        <Typography variant="h6">Subtitle Style</Typography>

        <Box
          sx={{
            borderRadius: "4px",
            backgroundColor: backgroundColor,
            height: "10vh",
            alignContent: "center",
            textAlign: "center",
            color: textColor,
          }}
        >
          <Typography sx={{ fontFamily: fontStyle, fontSize: fontSize }}>
            Preview
          </Typography>
        </Box>

        <Grid2 container sx={{ display: "flex", rowGap: "1rem" }}>
          <Grid2 item size={{ xs: 12, md: 3 }}>
            <Typography>Text color</Typography>
          </Grid2>
          <Grid2
            container
            item
            size={{ xs: 12, md: 9 }}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            {colors.map((color) => (
              <Box
                key={color}
                width={24}
                height={24}
                bgcolor={color}
                border={color === textColor ? 2 : 1}
                borderColor={color === textColor ? "primary.main" : "grey.300"}
                onClick={() => setTextColor(color)}
                sx={{ cursor: "pointer" }}
              />
            ))}
          </Grid2>
        </Grid2>

        <Grid2
          container
          sx={{ display: "flex", alignItems: "center", rowGap: "1rem" }}
        >
          <Grid2 item size={{ xs: 12, md: 3 }}>
            <Typography> Font Style</Typography>
          </Grid2>

          <Grid2 item size={{ xs: 12, md: 9 }}>
            <Select
              fullWidth
              size="small"
              value={fontStyle}
              onChange={(e) => setFontStyle(e.target.value)}
            >
              <MenuItem value="Sans Serif">Sans Serif</MenuItem>
              <MenuItem value="Arial">Arial</MenuItem>
              <MenuItem value="monospace">Monospace</MenuItem>
              <MenuItem value="system-ui">System-ui</MenuItem>
            </Select>
          </Grid2>
        </Grid2>

        <Grid2
          container
          sx={{ display: "flex", alignItems: "center", rowGap: "1rem" }}
        >
          <Grid2 item size={{ xs: 12, md: 3 }}>
            <Typography>Font size</Typography>
          </Grid2>

          <Grid2 item size={{ xs: 12, md: 5 }}>
            <ToggleButtonGroup
              size="small"
              value={fontSize}
              exclusive
              onChange={handleFontSize}
              aria-label="font size"
              sx={{ width: "100%", justifyContent: "space-between" }}
            >
              <ToggleButton
                value="Small"
                aria-label="small"
                sx={{ border: "none" }}
              >
                Small
              </ToggleButton>
              <ToggleButton
                value="Medium"
                aria-label="medium"
                sx={{ border: "none" }}
              >
                Medium
              </ToggleButton>
              <ToggleButton
                value="Large"
                aria-label="large"
                sx={{ border: "none" }}
              >
                Large
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid2>
        </Grid2>

        <Grid2
          container
          sx={{ display: "flex", alignItems: "center", rowGap: "1rem" }}
        >
          <Grid2 item size={{ xs: 12, md: 3 }}>
            <Typography>Background color</Typography>
          </Grid2>
          <Grid2
            container
            item
            size={{ xs: 12, md: 9 }}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            {colors.map((color) => (
              <Box
                key={color}
                width={24}
                height={24}
                bgcolor={color}
                border={color === backgroundColor ? 2 : 1}
                borderColor={
                  color === backgroundColor ? "primary.main" : "grey.300"
                }
                onClick={() => setBackgroundColor(color)}
                sx={{ cursor: "pointer" }}
              />
            ))}
          </Grid2>
        </Grid2>
      </Box>
    </>
  );
};

export default SubtitlePreference;
