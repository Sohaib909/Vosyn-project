"use client";

import React, { useState } from "react";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CachedIcon from "@mui/icons-material/Cached";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import HistoryIcon from "@mui/icons-material/History";
import LinkIcon from "@mui/icons-material/Link";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import NotificationsIcon from "@mui/icons-material/Notifications";
import TranslateIcon from "@mui/icons-material/Translate";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import {
  Box,
  Card,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import Notification from "@/components/Settings/Notification/Notification";
import ParentalControlSettings from "@/components/Settings/ParentalControlSettings/ParentalControlSettings";
import Playback from "@/components/Settings/Playback/Playback";
import PrivacyData from "@/components/Settings/PrivacyData/PrivacyData";
import SubtitlePreference from "@/components/Settings/SubtitlePreference/SubtitlePreference";
import ThirdPartyAccounts from "@/components/Settings/ThirdParty/ThirdParty";

const SettingsPage = () => {
  const [selectedSetting, setSelectedSetting] = useState(null);
  const [settings] = useState([
    {
      id: 1,
      primaryText: "Playback settings",
      secondaryText: "Set autoplay and audio, video quality",
      component: <Playback onBack={() => setSelectedSetting(null)} />,
      icon: <CachedIcon />,
    },
    {
      id: 2,
      primaryText: "Download settings",
      secondaryText: "Set autoplay and audio, video quality",
      icon: <DownloadForOfflineIcon />,
    },
    {
      id: 3,
      primaryText: "Parental control",
      secondaryText: "Set autoplay and audio, video quality",
      component: (
        <ParentalControlSettings onBack={() => setSelectedSetting(null)} />
      ),
      icon: <LockPersonIcon />,
    },
    {
      id: 4,
      primaryText: "Notification settings",
      secondaryText: "Set autoplay and audio, video quality",
      component: <Notification onBack={() => setSelectedSetting(null)} />,
      icon: <NotificationsIcon />,
    },
    {
      id: 5,
      primaryText: "Link 3rd party",
      secondaryText: "Set autoplay and audio, video quality",
      component: <ThirdPartyAccounts onBack={() => setSelectedSetting(null)} />,
      icon: <LinkIcon />,
    },
    {
      id: 6,
      primaryText: "Data and privacy settings",
      secondaryText: "Set autoplay and audio, video quality",
      component: <PrivacyData onBack={() => setSelectedSetting(null)} />,
      icon: <VerifiedUserIcon />,
    },
    {
      id: 7,
      primaryText: "Subtitle preference",
      secondaryText: "Manage notifications preferences",
      component: <SubtitlePreference onBack={() => setSelectedSetting(null)} />,
      icon: <TranslateIcon />,
    },
    {
      id: 8,
      primaryText: "View history and ratings",
      secondaryText: "Manage notifications preferences",
      icon: <HistoryIcon />,
    },
  ]);
  return (
    <>
      {selectedSetting ? (
        selectedSetting
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            minHeight: "100vh",
          }}
        >
          <Container
            sx={{
              maxWidth: "1200px",
              margin: "0 auto",
              padding: "16px",
              width: "100%",
              boxSizing: "border-box",
              marginTop: "64px",
            }}
          >
            <Typography variant="h4" gutterBottom>
              Settings
            </Typography>
            <Typography variant="subtitle1">
              Playback, download, notification, link 3rd party, subtitle, and
              more.
            </Typography>
            <Card style={{ padding: "16px", marginTop: "16px" }}>
              <List>
                {settings.map((setting) => (
                  <ListItem
                    button
                    key={setting.id}
                    onClick={() => setSelectedSetting(setting.component)}
                    sx={{
                      "&:hover": {
                        cursor: "pointer",
                      },
                    }}
                    aria-label={`Select ${setting.primaryText}`}
                  >
                    <ListItemIcon>
                      <Box
                        style={{
                          width: 40,
                          height: 40,
                          alignContent: "center",
                        }}
                      >
                        {setting.icon}
                      </Box>
                    </ListItemIcon>
                    <ListItemText
                      primary={setting.primaryText}
                      secondary={setting.secondaryText}
                      primaryTypographyProps={{ style: { fontWeight: "bold" } }}
                      secondaryTypographyProps={{ color: "textSecondary" }}
                    />
                    <ArrowForwardIcon />
                  </ListItem>
                ))}
              </List>
            </Card>
          </Container>
        </Box>
      )}
    </>
  );
};
export default SettingsPage;
