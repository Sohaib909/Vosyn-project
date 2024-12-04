"use client";

import {
  ACCOUNT_PAGE_ROUTE, // FRIENDS_PAGE_ROUTE,
  // HISTORY_PAGE_ROUTE,
  // NOTIFICATIONS_PAGE_ROUTE,
  PLAYLIST_PAGE_ROUTE,
  SETTINGS_PAGE_ROUTE,
} from "@/constants/URLs/routes";
// import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
// import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
// import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Box } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./NavLinks.module.css";

const navbarLinks = [
  // { name: "Friends", href: FRIENDS_PAGE_ROUTE, icon: GroupOutlinedIcon },
  // { name: "History", href: HISTORY_PAGE_ROUTE, icon: HistoryOutlinedIcon },
  { name: "Playlists", href: PLAYLIST_PAGE_ROUTE, icon: PlaylistPlayIcon },
  // {
  //   name: "Notifications",
  //   href: NOTIFICATIONS_PAGE_ROUTE,
  //   icon: NotificationsOutlinedIcon,
  // },
  { name: "Settings", href: SETTINGS_PAGE_ROUTE, icon: SettingsOutlinedIcon },
  { name: "Account", href: ACCOUNT_PAGE_ROUTE, icon: PersonOutlinedIcon },
];

/**
 * A component for navigation link buttons in the desktop navbar
 *
 * @returns - NavLinks component
 */
const NavLinks = () => {
  const pathname = usePathname();

  return (
    <Box
      sx={{ display: { xs: "none", md: "flex" } }}
      className={styles.navLinksContainer}
    >
      {navbarLinks.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            aria-label={link.name}
            href={link.href}
            className={`${styles.navLink} ${pathname.startsWith(link.href) ? styles.activeNavLink : styles.inactiveNavLink}`}
          >
            <LinkIcon fontSize="inherit" />
          </Link>
        );
      })}
    </Box>
  );
};

export default NavLinks;
