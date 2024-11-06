import vosynLogo from "@/Images/Logos/vosyn_logo_long.png";
import { AppBar, Toolbar } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

import NavLinks from "@/components/Navbar/NavLinks";
import SearchBar from "@/components/Navbar/SearchBar";

import styles from "./Navbar.module.css";

/**
 * A component for both the mobile and desktop Navbar
 *
 * @returns - Navbar component
 */
const Navbar = () => {
  return (
    <AppBar elevation={0}>
      <Toolbar className={styles.navContainer}>
        <Link href="/home">
          <Image
            src={vosynLogo}
            width={684}
            height={195}
            alt="Vosyn Logo"
            priority={true}
            className={styles.vosynLogo}
          />
        </Link>
        <SearchBar />
        <NavLinks />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
