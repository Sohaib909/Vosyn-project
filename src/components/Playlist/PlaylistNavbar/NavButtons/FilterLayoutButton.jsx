// NavButtons/FilterLayoutButtons.jsx
import React, { useState } from "react";

import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import SortByAlphaOutlinedIcon from "@mui/icons-material/SortByAlphaOutlined";
import {
  Box,
  Button,
  Divider,
  Menu,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import FilterButton from "./FilterButton";

import styles from "./FilterLayoutButtons.module.css";

const FilterLayoutButtons = ({ onFilterApply }) => {
  const [layouts, setLayouts] = useState("list");
  const [isAlphaOpen, setIsAlphaOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLayoutChange = (_event, layout) => {
    setLayouts(layout);
  };

  const handleSortClick = (event) => {
    setAnchorEl(event.currentTarget);
    setIsAlphaOpen(true);
  };

  const handleSortClose = () => {
    setAnchorEl(null);
    setIsAlphaOpen(false);
  };

  return (
    <Box className={styles.filterButtons}>
      <FilterButton onFilterApply={onFilterApply} />
      <ToggleButtonGroup
        className={styles.layout}
        aria-label="playlists layout"
        value={layouts}
        onChange={handleLayoutChange}
        exclusive
      >
        <ToggleButton
          className={`${styles.toggle} ${layouts === "list" ? "styles.active" : ""}`}
          value="list"
          aria-label="list layout"
          disableTouchRipple
        >
          <ListAltOutlinedIcon />
        </ToggleButton>
        <ToggleButton
          className={`${styles.toggle} ${layouts === "grid" ? "styles.active" : ""}`}
          value="grid"
          aria-label="grid layout"
          disableTouchRipple
        >
          <DashboardOutlinedIcon />
        </ToggleButton>
      </ToggleButtonGroup>
      <Button
        className={styles.sortAlpha}
        onClick={handleSortClick}
        style={{
          backgroundColor: isAlphaOpen ? "#fff" : "",
          margin: "0px 10px 0 10px",
          padding: "9px",
          width: "50px",
          height: "50px",
        }}
      >
        <SortByAlphaOutlinedIcon />
      </Button>
      <Menu
        sx={{
          margin: "16px 0 0 0",
          display: "flex",
          justifyContent: "center",
        }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleSortClose}
        disableScrollLock={true}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <MenuItem dividers onClick={handleSortClose}>
          By Bookmarked Date
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleSortClose}>By Upload Date</MenuItem>
        <Divider />
        <MenuItem onClick={handleSortClose}>Most Watched</MenuItem>
        <Divider />
        <MenuItem onClick={handleSortClose}>By Type</MenuItem>
      </Menu>
    </Box>
  );
};

export default FilterLayoutButtons;
