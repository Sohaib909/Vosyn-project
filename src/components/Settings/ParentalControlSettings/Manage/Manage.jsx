"use client";

import React, { useState } from "react";

import ArrowBackIosNew from "@mui/icons-material/ArrowBackIosNew";
import { Box, Button, Slider, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

const ManageRestrictions = ({ onBack }) => {
  const [activeRating, setActiveRating] = useState("R");
  const [titleRestrictions, setTitleRestrictions] = useState("");
  const [dailyLimit, setDailyLimit] = useState("");
  const [weeklyLimit, setWeeklyLimit] = useState("");
  const ratings = ["G", "PG", "PG-13", "R", "NC-17"];
  const handleRatingChange = (event, newValue) => {
    setActiveRating(ratings[newValue]);
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
        </Grid>

        <Grid item size={8}>
          <Typography variant="h5">Manage Restrictions</Typography>
          <Typography variant="h6" sx={{ mt: "4vh" }}>
            Select Maturity Rating
          </Typography>
          <Typography variant="subtitle1" sx={{ opacity: "0.7" }}>
            Choose the maximum content rating for your child.
          </Typography>
          <Box sx={{ width: { xs: "100%", sm: "80%" }, mt: "5vh" }}>
            <Slider
              value={ratings.indexOf(activeRating)}
              onChange={handleRatingChange}
              step={1}
              min={0}
              max={ratings.length - 1}
              marks={ratings.map((rating, index) => ({
                value: index,
                label: rating,
              }))}
              valueLabelDisplay="on"
              sx={{
                color: "blue",
              }}
            />
          </Box>
          <Typography variant="h6" sx={{ mt: "4vh" }}>
            Title Restrictions
          </Typography>
          <Typography variant="subtitle1" sx={{ opacity: "0.7" }}>
            Manage specific titles to block access for your child regardless of
            Maturity Rating.
          </Typography>
          <TextField
            value={titleRestrictions}
            onChange={(e) => setTitleRestrictions(e.target.value)}
            variant="outlined"
            sx={{ mt: "3vh" }}
          />
          <Typography variant="h6" sx={{ mt: "4vh" }}>
            Time Limit
          </Typography>
          <Typography variant="subtitle1" sx={{ opacity: "0.7" }}>
            Set daily or weekly screen time limits (hours) for your child.
          </Typography>
          <Box
            sx={{
              display: "flex",
              mt: "3vh",
              mr: "30%",
              alignItems: "center",
              gap: "2vw",
            }}
          >
            <Typography>Daily Limit</Typography>
            <TextField
              id="dailyLimit"
              value={dailyLimit}
              onChange={(e) => setDailyLimit(e.target.value)}
              variant="outlined"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              mt: "3vh",
              mr: "30%",
              alignItems: "center",
              gap: "2vw",
            }}
          >
            <Typography>Weekly Limit</Typography>
            <TextField
              id="weeklyLimit"
              value={weeklyLimit}
              onChange={(e) => setWeeklyLimit(e.target.value)}
              variant="outlined"
            />
          </Box>
          <Button variant="contained" sx={{ mt: "2vh" }}>
            Save
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ManageRestrictions;
