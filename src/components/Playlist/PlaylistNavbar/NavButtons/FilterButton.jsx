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

import styles from "./FilterButton.module.css";

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
        className={styles.filterPlaylist}
        onClick={handleClickOpen}
        style={{
          backgroundColor: isMenuOpen ? "#fff" : "",
          margin: "0px 10px 0 10px",
        }}
      >
        <FilterListOutlinedIcon fontSize="large" />
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
        <Box className={styles.filterModal}>
          <Box className={styles.filterModalHeader}>
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
          <DialogContent className={styles.filterModalContent}>
            <Box className={styles.filterModalOptions}>
              {/* Type Filter */}
              <Box item xs={12} sm={6} md={4}>
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
              <Grid item xs={12} sm={6} md={4}>
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
              <Box item xs={8}>
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
