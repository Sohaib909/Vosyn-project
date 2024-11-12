import React from "react";

import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";

import CustomSwitch from "@/components/Buttons/Switch/CustomSwitch";

export const ListItemWithSwitch = ({
  heading,
  subheading = "",
  onChange,
  checked = false,
  name,
  disabled = false,
}) => {
  return (
    <Box
      aria-labelledby={`${heading}-label`}
      sx={{ display: "flex", columnGap: "1rem", alignItems: "center" }}
    >
      <FormControlLabel
        control={
          <CustomSwitch
            onChange={onChange}
            checked={checked}
            name={name}
            disabled={disabled}
          />
        }
      />
      <Box>
        <Typography id={`${heading}-label`}>{heading}</Typography>
        <Typography variant="caption" sx={{ opacity: "0.7" }}>
          {subheading}
        </Typography>
      </Box>
    </Box>
  );
};

export const ListItemWithCheckbox = ({
  heading,
  subheading,
  onChange,
  checked,
}) => {
  return (
    <Box
      aria-labelledby={`${heading}-label`}
      sx={{ display: "flex", columnGap: "1rem" }}
    >
      <FormControlLabel
        control={
          <Checkbox
            onChange={onChange}
            checked={checked}
            color="inherit"
            typeof="radio"
          />
        }
      />
      <Box>
        <Typography id={`${heading}-label`}>{heading}</Typography>
        <Typography variant="caption" sx={{ opacity: "0.7" }}>
          {subheading}
        </Typography>
      </Box>
    </Box>
  );
};

export const ListItemWithIcon = ({
  heading,
  subheading,
  start,
  end,
  onClick = () => {},
}) => {
  return (
    <Box
      component="button"
      aria-labelledby={`${heading}-label`}
      sx={{
        display: "flex",
        columnGap: "1rem",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center",
        border: "none",
        backgroundColor: "transparent",
        cursor: "pointer",
        "&:hover": {
          cursor: "pointer",
          backgroundColor: "var(--mui-palette-neutral-700)",
          borderRadius: "4px",
        },
        padding: "10px",
      }}
      onClick={onClick}
    >
      <Box
        sx={{
          display: "flex",
          columnGap: start && "2rem",
          alignItems: "center",
        }}
      >
        {start}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography id={`${heading}-label`}>{heading}</Typography>
          <Typography variant="subtitle2" sx={{ opacity: "0.7" }}>
            {subheading}
          </Typography>
        </Box>
      </Box>
      {end}
    </Box>
  );
};
