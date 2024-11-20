import React from "react";

import { Search } from "@mui/icons-material";
import {
  Box,
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

const HomeFilterMenuItem = ({
  value,
  setValue,
  options,
  label,
  isOpen,
  setIsOpen,
}) => {
  return (
    <Box sx={{ marginBottom: "16px" }}>
      <Typography
        sx={{
          fontSize: "1rem",
          color: "var(--mui-palette-text-secondary)",
          marginBottom: "10px",
          fontWeight: 500,
        }}
      >
        {label}:
      </Typography>
      <FormControl fullWidth>
        <Select
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
          displayEmpty
          startAdornment={
            <InputAdornment position="start">
              <Search sx={{ color: "var(--mui-palette-text-disabled)" }} />
            </InputAdornment>
          }
          renderValue={(selected) =>
            selected ? (
              <Typography
                sx={{
                  fontSize: "18px",
                  color: "var(--mui-palette-text-primary)",
                }}
              >
                {selected}
              </Typography>
            ) : (
              <Typography
                sx={{
                  fontSize: "18px",
                  color: "var(--mui-palette-text-disabled)",
                  textAlign: "center",
                  width: "100%",
                  paddingRight: "25px",
                }}
              >
                Search Filters
              </Typography>
            )
          }
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: "var(--mui-palette-background-paper)",
                color: "var(--mui-palette-text-primary)",
                boxShadow: "none",
                border: "1px solid var(--mui-palette-divider)",
              },
            },
          }}
          sx={{
            width: "350px",
            borderRadius: "15px",
            border: "1px solid var(--mui-palette-divider)",
            marginBottom: isOpen ? "235px" : "0",
            "& .MuiSelect-icon": {
              color: "var(--mui-palette-text-primary)",
              fontSize: "24px",
              visibility: "visible",
            },
          }}
        >
          {options.map((option, idx) => (
            <MenuItem
              sx={{
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "var(--mui-palette-action-hover)",
                },
              }}
              key={idx}
              value={option}
            >
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default HomeFilterMenuItem;
