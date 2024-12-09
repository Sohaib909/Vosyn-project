import React, { useEffect, useState } from "react";

import { Box, Button, Card, Slider, Switch, Typography } from "@mui/material";

import "./SettingsPage.css";

const SettingsAppearance = ({ showSavedAlert, setShowSavedAlert }) => {
  const [textSize, setTextSize] = useState(14);
  const [darkMode, setDarkMode] = useState(true);
  const [contrast, setContrast] = useState(1);

  useEffect(() => {
    localStorage.setItem("isDarkMode", darkMode);

    darkMode
      ? document.body.classList.remove("light-mode")
      : document.body.classList.add("light-mode");
  }, [darkMode]);

  const updateSavedAlert = () => {
    if (showSavedAlert) {
      setShowSavedAlert(false);
      setTimeout(() => {
        setShowSavedAlert(true);
      }, 150);
    } else {
      setShowSavedAlert(true);
    }
  };

  const handleTextSizeChange = (event, newSize) => {
    setTextSize(newSize);
    updateSavedAlert();
  };

  const handleContrastChange = (event, newContrast) => {
    setContrast(newContrast);
    updateSavedAlert();
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    updateSavedAlert();
  };

  const resetToDefault = () => {
    setTextSize(14);
    setContrast(1);
    updateSavedAlert();
  };

  return (
    <Box className="settings-container">
      <Box className="card-container">
        <Card className="appearance-card">
          {/* Text Size Slider */}
          <Typography
            variant="h5"
            sx={{ padding: "32px", marginBottom: "32px" }}
          >
            Edit Display Appearance
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "48px",
                alignItems: "end",
              }}
            >
              <Box className="slider-container">
                <Typography variant="body1" gutterBottom>
                  Text Size
                </Typography>
                <Slider
                  value={textSize}
                  min={10}
                  max={40}
                  onChange={handleTextSizeChange}
                  aria-labelledby="text-size-slider"
                  aria-label="text-size-slider"
                  sx={{ width: "50%" }}
                />
              </Box>
              {/* Contrast Slider */}
              <Box className="slider-container">
                <Typography variant="body1" gutterBottom>
                  Contrast
                </Typography>
                <Slider
                  value={contrast}
                  min={0.5}
                  max={2}
                  step={0.1}
                  onChange={handleContrastChange}
                  aria-labelledby="contrast-slider"
                  aria-label="contrast-slider"
                  sx={{ width: "50%" }}
                />
              </Box>

              {/* Preview Text */}
              <Box className="preview-text-container">
                {/* Dark Mode Toggle */}
                <Box className="toggle-switch">
                  <Typography variant="body1" sx={{ width: "128px" }}>
                    Light/Dark Mode
                  </Typography>
                  <Box className="dark-mode">
                    <Switch checked={darkMode} onChange={toggleDarkMode} />
                  </Box>
                </Box>
                <Box
                  className="preview-text"
                  style={{
                    fontSize: textSize,
                    filter: `contrast(${contrast})`,
                    color: "white",
                    width: "161px",
                    height: "38px",
                    padding: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: `${textSize}px`,
                      textAlign: "center",
                    }}
                  >
                    Preview changes
                  </Typography>
                  {/* (Preview changes) */}
                </Box>
              </Box>

              {/* Reset to Default */}
              <Box className="reset-button">
                <Button
                  className="button-color"
                  variant="contained"
                  onClick={resetToDefault}
                  sx={{
                    backgroundColor: "#3C3C3C",
                    width: "161px",
                    height: "38px",
                    textTransform: "none",
                  }}
                >
                  Default style
                </Button>
              </Box>
            </Box>
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default SettingsAppearance;
