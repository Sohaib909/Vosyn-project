// NavButtons/FilterLayoutButtons.jsx
import React, { useEffect, useState } from "react";

import useQueryParam from "@/hooks/useQueryParam";
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

import FilterButton from "../FilterButton/FilterButton";

const FilterLayoutButtons = ({ onFilterApply }) => {
  const { updateQueryParam, getAllParams } = useQueryParam();
  const params = getAllParams();

  const [layouts, setLayouts] = useState(params.layout || "list");
  const [sortBy, setSortBy] = useState(null);
  const [isAlphaOpen, setIsAlphaOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if ((!params.layout, params.sort)) {
      updateQueryParam("layout", "list");
      updateQueryParam("sort", sortBy);
    }
  }, [params, updateQueryParam]);

  const handleLayoutChange = (_event, layout) => {
    updateQueryParam("layout", layout);
    setLayouts(layout);
  };

  const handleSortClick = (event) => {
    setAnchorEl(event.currentTarget);
    setIsAlphaOpen(true);
  };

  const handleSortClose = (value) => {
    setAnchorEl(null);
    setIsAlphaOpen(false);
    if (params.sort === value) {
      updateQueryParam("sort", setSortBy(null));
    } else {
      setSortBy(value);
      updateQueryParam("sort", value);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <FilterButton onFilterApply={onFilterApply} />
      <ToggleButtonGroup
        aria-label="playlists layout"
        value={layouts}
        onChange={handleLayoutChange}
        exclusive
        sx={{
          border: "1px solid var(--mui-palette-neutral-600)",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <ToggleButton
          value="list"
          aria-label="list layout"
          disableTouchRipple
          sx={{
            color: "inherit",
            ...(layouts === "list" && {
              background: "var(--mui-palette-neutral-400)",
              border: "1px solid var(--mui-palette-neutral-600)",
            }),
          }}
        >
          <ListAltOutlinedIcon />
        </ToggleButton>
        <ToggleButton
          value="grid"
          aria-label="grid layout"
          disableTouchRipple
          sx={{
            color: "inherit",
            ...(layouts === "grid" && {
              background: "var(--mui-palette-neutral-400)",
              border: "1px solid var(--mui-palette-neutral-600)",
            }),
          }}
        >
          <DashboardOutlinedIcon />
        </ToggleButton>
      </ToggleButtonGroup>
      <Button
        onClick={handleSortClick}
        style={{
          backgroundColor: isAlphaOpen ? "#fff" : "",
          margin: "0px 10px 0 10px",
          padding: "9px",
          width: "50px",
          height: "50px",
          color: "inherit",
        }}
      >
        <SortByAlphaOutlinedIcon
          sx={{ color: "var(--mui-palette-neutral-600)" }}
        />
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
        <MenuItem onClick={() => handleSortClose("bookmarked")}>
          By Bookmarked Date
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => handleSortClose("uploadDate")}>
          By Upload Date
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => handleSortClose("mostWatched")}>
          Most Watched
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => handleSortClose("type")}>By Type</MenuItem>
      </Menu>
    </Box>
  );
};

export default FilterLayoutButtons;
