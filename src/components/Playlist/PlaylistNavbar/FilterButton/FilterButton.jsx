import React, { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

const FilterButton = ({ onFilterApply }) => {
  const [open, setOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [type, setType] = useState("");
  const [language, setLanguage] = useState("");
  const [date, setDate] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
    setIsMenuOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsMenuOpen(false);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    if (name === "type") setType(value);
    if (name === "language") setLanguage(value);
    if (name === "date") setDate(value);
  };

  const handleApplyFilter = () => {
    onFilterApply(type);
    handleClose();
  };

  return (
    <>
      <Button
        onClick={handleClickOpen}
        style={{
          backgroundColor: isMenuOpen ? "#fff" : "",
          margin: "0px 10px 0 10px",
          padding: 0,
          justifyContent: "center",
        }}
      >
        <FilterListOutlinedIcon
          fontSize="large"
          sx={{ color: "var(--mui-palette-neutral-600)" }}
        />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            maxWidth: "600px",
            padding: "16px",
            position: "absolute",
            top: 245,
            right: 260,
            "& .MuiDialogContent-root": {
              overflow: "hidden !important",
              padding: 2,
            },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <Box
            sx={{
              padding: "0px",
              position: "relative",
            }}
          >
            <Typography>Filter by</Typography>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <DialogContent
            sx={{
              padding: "10px 0px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* Type Filter */}
            <Box sx={{ flex: 1 }}>
              <FormControl fullWidth size="medium">
                <InputLabel size="normal">Type</InputLabel>
                <Select
                  value={type}
                  onChange={handleFilterChange}
                  name="type"
                  label="Type"
                  sx={{ width: "170px" }}
                >
                  <MenuItem value={"video"}>Video</MenuItem>
                  <MenuItem value={"audio"}>Audio</MenuItem>
                  <MenuItem value={"text"}>Text</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Language Filter */}
            <Grid sx={{ flex: 1 }}>
              <FormControl fullWidth>
                <InputLabel>Language</InputLabel>
                <Select
                  value={language}
                  onChange={handleFilterChange}
                  name="language"
                  label="Language"
                  sx={{ width: "150px" }}
                >
                  <MenuItem value={"english"}>English</MenuItem>
                  <MenuItem value={"spanish"}>Spanish</MenuItem>
                  <MenuItem value={"french"}>French</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Date Filter */}
            <Box sx={{ flex: 1 }}>
              <FormControl fullWidth>
                <InputLabel>Date</InputLabel>
                <Select
                  value={date}
                  onChange={handleFilterChange}
                  name="date"
                  label="Date"
                  sx={{ width: "170px" }}
                >
                  <MenuItem value={"today"}>Today</MenuItem>
                  <MenuItem value={"this_week"}>This Week</MenuItem>
                  <MenuItem value={"this_month"}>This Month</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
        </Box>
        <DialogActions>
          <Button onClick={handleApplyFilter} color="primary">
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FilterButton;
