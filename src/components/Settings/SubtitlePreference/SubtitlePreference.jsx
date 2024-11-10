"use client";

import React, { useState } from "react";

import ArrowBackIosNew from "@mui/icons-material/ArrowBackIosNew";
import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Select,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

const SubtitlePreference = ({ onBack }) => {
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

  const Label = ({ heading, subheading }) => (
    <Box sx={{ pl: "2vw" }}>
      <Typography style={{ fontWeight: "bold" }}>{heading}</Typography>
      <Typography sx={{ opacity: "0.7", pt: "5px" }}>{subheading}</Typography>
    </Box>
  );

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
          <Typography variant="h5">Subtitle Preference</Typography>
          <FormGroup sx={{ mt: "3vh" }}>
            <Typography variant="h6">General</Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={showSubtitles}
                  onChange={() => setShowSubtitles(!showSubtitles)}
                />
              }
              label={
                <Label
                  heading={"Always show subtitles"}
                  subheading={"Automatically show subtitles for all videos"}
                />
              }
              sx={{ mt: "2vh" }}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={playDubbedAudio}
                  onChange={() => setPlayDubbedAudio(!playDubbedAudio)}
                />
              }
              label={
                <Label
                  heading={"Always play dubbed audio"}
                  subheading={"Automatically play dubbed audio when available"}
                />
              }
              sx={{ mt: "2vh" }}
            />
            <Divider sx={{ my: 3 }} />

            <Typography variant="h6">Subtitle Style</Typography>
            <Box
              sx={{
                borderRadius: "4px",
                backgroundColor: backgroundColor,
                height: "10vh",
                alignContent: "center",
                textAlign: "center",
                mt: "3vh",
                color: textColor,
              }}
            >
              <Typography sx={{ fontFamily: fontStyle, fontSize: fontSize }}>
                Preview
              </Typography>
            </Box>
            <Box sx={{ display: "flex", mt: "3vh", alignItems: "end" }}>
              <Typography>Text color</Typography>
              <Box display="flex" mt={1}>
                {colors.map((color) => (
                  <Box
                    key={color}
                    width={24}
                    height={24}
                    bgcolor={color}
                    border={color === textColor ? 2 : 1}
                    borderColor={
                      color === textColor ? "primary.main" : "grey.300"
                    }
                    onClick={() => setTextColor(color)}
                    sx={{ cursor: "pointer", mx: 5 }}
                  />
                ))}
              </Box>
            </Box>
            <Box sx={{ display: "flex", mt: "3vh", alignItems: "center" }}>
              <Typography> Font Style</Typography>
              <Select
                value={fontStyle}
                onChange={(e) => setFontStyle(e.target.value)}
                sx={{ marginLeft: "20px" }}
              >
                <MenuItem value="Sans Serif">Sans Serif</MenuItem>
                <MenuItem value="Arial">Arial</MenuItem>
                <MenuItem value="monospace">Monospace</MenuItem>
                <MenuItem value="system-ui">System-ui</MenuItem>
              </Select>
            </Box>
            <Box sx={{ display: "flex", mt: "3vh", alignItems: "center" }}>
              <Typography>Font size</Typography>
              <ToggleButtonGroup
                value={fontSize}
                exclusive
                onChange={handleFontSize}
                aria-label="font size"
              >
                <ToggleButton
                  value="Small"
                  aria-label="small"
                  sx={{ mx: 7, border: "none" }}
                >
                  Small
                </ToggleButton>
                <ToggleButton
                  value="Medium"
                  aria-label="medium"
                  sx={{ mx: 7, border: "none" }}
                >
                  Medium
                </ToggleButton>
                <ToggleButton
                  value="Large"
                  aria-label="large"
                  sx={{ mx: 7, border: "none" }}
                >
                  Large
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <Box sx={{ display: "flex", mt: "3vh", alignItems: "end" }}>
              <Typography>Background color</Typography>
              <Box display="flex" mt={1}>
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
                    sx={{ cursor: "pointer", mx: 5 }}
                  />
                ))}
              </Box>
            </Box>
          </FormGroup>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SubtitlePreference;
