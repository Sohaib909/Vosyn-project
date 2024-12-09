import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { logout } from "@/reduxSlices/authSlice";
import { setUserInfo } from "@/reduxSlices/userSlice";
import {
  AccountCircle,
  Contrast,
  Language,
  Security,
} from "@mui/icons-material";
import { Box, Icon } from "@mui/material";
import { useRouter } from "next/navigation";

import "./SettingsPage.css";

const SettingsHome = () => {
  // State for hovered index and delayed remove
  // const [hoveredIndex, setHoveredIndex] = useState(null);
  // const [delayedRemove, setDelayedRemove] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    // Fetch user profile on component mount
    getUserProfile();
  }, []);

  // Function to fetch user profile
  const getUserProfile = async () => {
    try {
      let res = await fetch("/api/auth/profile");

      // Dispatch user info if request successful
      dispatch(setUserInfo(res?.data));
      if (res?.status === 200) {
        dispatch(setUserInfo(res?.data));
      }
    } catch (err) {
      // Handle unauthorized user
      let statusCode = err?.response?.status;
      if (statusCode === 401) {
        console.log("user not authenticated, logged out");
        localStorage.clear();
        dispatch(logout());
        router.push("/auth?type=login");
      }
    }
  };

  // Function to handle login/logout
  const handleLoginLogout = async () => {
    try {
      let res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.status === 204 || res.status === 200) {
        console.log("user authenticated, logged out");
        localStorage.clear();
        dispatch(logout());
        await router.push("/auth?type=login");
      }
    } catch (err) {
      let statusCode = err?.response?.status;
      if (statusCode === 401) {
        console.log("user not authenticated, logged out");
        localStorage.clear();
        dispatch(logout());
        await router.push("/auth?type=login");
      }
    }
  };

  // Function to handle mouse leave
  // const handleMouseLeave = () => {
  //   setDelayedRemove(
  //     setTimeout(() => {
  //       setHoveredIndex(null);
  //     }, 100),
  //   );
  // };

  // Function to handle mouse enter
  // const handleMouseEnter = (index) => {
  //   clearTimeout(delayedRemove);
  //   setHoveredIndex(index);
  // };

  // List of settings
  const settingsList = [
    {
      icon: AccountCircle,
      title: "Account",
      desc: "Coming Soon",
    },
    {
      icon: Security,
      title: "Privacy & Security",
      desc: "Coming Soon",
    },
    {
      icon: Language,
      title: "Language Preferences",
      desc: "Coming Soon",
    },
    {
      icon: Contrast,
      title: "Appearance",
      desc: "Coming Soon",
    },
  ];

  return (
    <>
      {/* Render settings items */}
      <Box className="all-settings">
        {settingsList.map((settingsItem, index) => (
          <Box
            // className={`setting-item
            //  ${
            //    hoveredIndex !== null &&
            //    (hoveredIndex === index ? "" : "not-hovered")
            //  }
            //  `}
            className="setting-item"
            // onMouseEnter={() => handleMouseEnter(index)}
            // onMouseLeave={handleMouseLeave}
            // onClick={() => {
            //   setCurrPage(settingsItem.title);
            // }}
            key={index}
          >
            <Icon component={settingsItem.icon} />
            <Box className="setting-title">
              {" "}
              {/*{hoveredIndex === index ? "Coming Soon" : settingsItem.title}*/}
              {settingsItem.title}
            </Box>
            <Box className="setting-desc">
              {/*{hoveredIndex === index ? " " : settingsItem.desc}*/}
              {settingsItem.desc}
            </Box>
          </Box>
        ))}
      </Box>

      {/* Logout section */}
      <Box className="logout-container">
        <Box className="logout-question">Need to logout of your account?</Box>
        <Box onClick={handleLoginLogout} className="logout-btn">
          Log out
        </Box>
      </Box>
    </>
  );
};

export default SettingsHome;
