"use client";

import React, { useState } from "react";

import {
  Box,
  Button,
  Grid2,
  Slider,
  TextField,
  Typography,
} from "@mui/material";

const ManageRestrictions = () => {
  const [activeRating, setActiveRating] = useState("R");
  const [titleRestrictions, setTitleRestrictions] = useState("");
  const [dailyLimit, setDailyLimit] = useState("");
  const [weeklyLimit, setWeeklyLimit] = useState("");
  const ratings = ["G", "PG", "PG-13", "R", "NC-17"];

  const handleRatingChange = (event, newValue) => {
    setActiveRating(ratings[newValue]);
  };

  return (
    <>
      <Typography variant="h5">Manage Restrictions</Typography>

      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <Typography variant="h6">Select Maturity Rating</Typography>
        <Typography variant="subtitle1" sx={{ opacity: "0.7" }}>
          Choose the maximum content rating for your child.
        </Typography>
        <Box sx={{ width: { xs: "100%", sm: "80%" }, mt: "1rem" }}>
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
            sx={{
              color: "blue",
            }}
          />
        </Box>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <Typography variant="h6">Title Restrictions</Typography>
        <Typography variant="subtitle1" sx={{ opacity: "0.7" }}>
          Manage specific titles to block access for your child regardless of
          Maturity Rating.
        </Typography>
        <Box sx={{ width: { xs: "100%", sm: "50%" }, mt: "1rem" }}>
          <TextField
            fullWidth
            size="small"
            value={titleRestrictions}
            onChange={(e) => setTitleRestrictions(e.target.value)}
            variant="outlined"
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          rowGap: "1rem",
        }}
      >
        <Box>
          <Typography variant="h6">Time Limit</Typography>
          <Typography variant="subtitle1" sx={{ opacity: "0.7" }}>
            Set daily or weekly screen time limits (hours) for your child.
          </Typography>
        </Box>

        <Grid2 spacing={1} container size={{ xs: 12, md: 6 }}>
          <Grid2 item size={{ xs: 12, md: 3 }}>
            <Typography>Daily Limit</Typography>
          </Grid2>
          <Grid2 item size={{ xs: 12, md: "auto" }}>
            <TextField
              id="dailyLimit"
              value={dailyLimit}
              onChange={(e) => setDailyLimit(e.target.value)}
              variant="outlined"
              size="small"
            />
          </Grid2>
        </Grid2>

        <Grid2 spacing={1} container size={{ xs: 12, md: 6 }}>
          <Grid2 item size={{ xs: 12, md: 3 }}>
            <Typography>Weekly Limit</Typography>
          </Grid2>
          <Grid2 item size={{ xs: 12, md: "auto" }}>
            <TextField
              size="small"
              id="weeklyLimit"
              value={weeklyLimit}
              onChange={(e) => setWeeklyLimit(e.target.value)}
              variant="outlined"
            />
          </Grid2>
        </Grid2>
      </Box>

      <Button variant="contained" sx={{ mt: "2vh" }}>
        Save
      </Button>
    </>
  );
};

export default ManageRestrictions;
