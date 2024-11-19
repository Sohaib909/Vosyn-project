"use client";
import React from "react";

import MuiIcon from "@/utils/MuiIcon";
import {
  Box,
  Button,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";
// Import CSS module
import { useRouter } from "next/navigation";
import styles from "./AccountNavigation.module.css";

//  import { useTheme } from "@mui/material/styles";

function AccountNavigation({ activeTab, onTabChange }) {
  const menuItems = [
    { label: "Profiles", value: "profiles", icon: "ModeEditOutlined" },
    { label: "Viewer's Dashboard", value: "dashboard", icon: "ShareOutlined" },
    { label: "Payment & Subscription", value: "payment", icon: "Payment" },
    { label: "Appearance", value: "appearance", icon: "Contrast" },
    { label: "Language", value: "language", icon: "TranslateOutlined" },
    {
      label: "Login & Security",
      value: "security",
      icon: "AdminPanelSettingsOutlined",
    },
    {
      label: "Keyboard Shortcuts",
      value: "shortcuts",
      icon: "KeyboardOutlined",
    },
    { label: "Help", value: "help", icon: "HelpOutlineOutlined" },
  ];

  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  const handleSignOut = () => {
    console.log("Signing out");
  };

  return (
    <Box className={styles["navigation-menu"]}>
      <Box className={styles["back-button"]}>
        <Button
          startIcon={<MuiIcon name="ArrowBackIosNew" />}
          onClick={handleBackClick}
        >
          Back
        </Button>
      </Box>
      <Box className={styles["search-bar-container"]}>
        <TextField
          variant="standard"
          placeholder="Search"
          slotProps={{
            disableUnderline: true,
            startAdornment: (
              <InputAdornment position="start">
                <MuiIcon name="Search" />
              </InputAdornment>
            ),
          }}
          sx={{
            "input::placeholder": {
              color: "#656565",
              opacity: 1,
            },
          }}
          className={styles["search-bar"]}
        />
      </Box>
      <List className={styles.sidebar}>
        {menuItems.map((item) => (
          <ListItem
            key={item.value}
            button
            className={`${styles["list-item"]} ${
              activeTab === item.value ? styles.active : ""
            }`}
            onClick={() => onTabChange(item.value)}
          >
            <ListItemIcon>
              <MuiIcon name={item.icon} />
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
      <Box className={styles["sign-out-container"]}>
        <ListItem
          button
          className={styles["sign-out-button"]}
          onClick={handleSignOut}
        >
          <ListItemIcon>{<MuiIcon name="Logout" />}</ListItemIcon>
          <ListItemText primary="Sign Out" />
        </ListItem>
      </Box>
    </Box>
  );
}

export default AccountNavigation;
