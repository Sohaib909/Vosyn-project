import { languages } from "@/data/languages";
import { AppBar, Box, Toolbar } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

import NavLinks from "@/components/Navbar/NavbarLinks/NavLinks";
import SearchBar from "@/components/Navbar/SearchBar/SearchBar";

import TranslationPanelInput from "../TranslationPanel/TranslationPanelInput/TranslationPanelInput";

import styles from "./Navbar.module.css";

/**
 * A component for both the mobile and desktop Navbar
 *
 * @returns - Navbar component
 */
const Navbar = () => {
  return (
    <AppBar
      elevation={0}
      sx={{
        position: "static",
        backgroundColor: "transparent",
        height: "fit-content",
      }}
    >
      <Toolbar className={styles.navContainer}>
        <Link href="/home?tab=watch">
          <Image
            src="/mediaFiles/Logos/vosyn_logo_long.png"
            width={684}
            height={195}
            alt="VosynVerse home"
            priority={true}
            className={styles.vosynLogo}
          />
        </Link>
        <Box sx={{ display: "flex", columnGap: "1rem" }}>
          <Box
            sx={{
              backgroundColor: "var(--mui-palette-neutral-800)",
              borderRadius: "0.75rem",
              boxShadow: "0 0 8px 1px var(--mui-palette-neutral-600)",
              "& fieldset": { border: "none" },
              "& .MuiListItemText-root": {
                display: {
                  xs: "none",
                  sm: "block",
                },
              },
            }}
          >
            <TranslationPanelInput array={languages} label="" />
          </Box>
          <SearchBar />
        </Box>
        <NavLinks />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
