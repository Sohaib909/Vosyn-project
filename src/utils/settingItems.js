import CachedIcon from "@mui/icons-material/Cached";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import HistoryIcon from "@mui/icons-material/History";
import LinkIcon from "@mui/icons-material/Link";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import NotificationsIcon from "@mui/icons-material/Notifications";
import TranslateIcon from "@mui/icons-material/Translate";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

import Notification from "@/components/Settings/Notification/Notification";
import ManageRestrictions from "@/components/Settings/ParentalControlSettings/Manage/Manage";
import ParentalControlSettings from "@/components/Settings/ParentalControlSettings/ParentalControlSettings";
import UpdatePassword from "@/components/Settings/ParentalControlSettings/UpdatePassword/UpdatePassword";
import Playback from "@/components/Settings/Playback/Playback";
import PrivacyData from "@/components/Settings/PrivacyData/PrivacyData";
import SubtitlePreference from "@/components/Settings/SubtitlePreference/SubtitlePreference";
import ThirdPartyAccounts from "@/components/Settings/ThirdParty/ThirdParty";

export const settingItems = [
  {
    id: 1,
    primaryText: "Playback settings",
    secondaryText: "Set autoplay and audio, video quality",
    component: <Playback />,
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
    component: <ParentalControlSettings />,
    icon: <LockPersonIcon />,
    children: [
      {
        id: 0,
        primaryText: "Manage restrictions",
        component: <ManageRestrictions />,
      },
      {
        id: 1,
        primaryText: "Reset parental password",
        component: <UpdatePassword />,
      },
    ],
  },
  {
    id: 4,
    primaryText: "Notification settings",
    secondaryText: "Set autoplay and audio, video quality",
    component: <Notification />,
    icon: <NotificationsIcon />,
  },
  {
    id: 5,
    primaryText: "Link 3rd party",
    secondaryText: "Set autoplay and audio, video quality",
    component: <ThirdPartyAccounts />,
    icon: <LinkIcon />,
  },
  {
    id: 6,
    primaryText: "Data and privacy settings",
    secondaryText: "Set autoplay and audio, video quality",
    component: <PrivacyData />,
    icon: <VerifiedUserIcon />,
  },
  {
    id: 7,
    primaryText: "Subtitle preference",
    secondaryText: "Manage notifications preferences",
    component: <SubtitlePreference />,
    icon: <TranslateIcon />,
  },
  {
    id: 8,
    primaryText: "View history and ratings",
    secondaryText: "Manage notifications preferences",
    icon: <HistoryIcon />,
  },
];
