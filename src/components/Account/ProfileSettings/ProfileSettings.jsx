import React from "react";

import Profile from "@/Images/profile.png";
import { Box } from "@mui/material";
import Image from "next/image";

import ComingSoon from "@/components/ComingSoon/ComingSoon";

import styles from "./ProfileSettings.module.css";

const ProfileSettings = () => {
  return (
    <Box
      className={styles["profile-edit-container"]}
      sx={{ position: "relative" }}
    >
      <Box sx={{ width: "100%", height: "75vh", position: "absolute" }}>
        <ComingSoon />
        <Image src={Profile} className={styles["background"]}></Image>
      </Box>

      {/* <Typography variant="h4" className={styles["profile-title"]}>
        Profiles
      </Typography>
      <Typography variant="h9" className={styles["Subtitle"]}>
        Profile Information
      </Typography>
      <Box className={styles["border"]}>
        <Typography variant="h5" className={styles["profile-subtitle"]}>
          Edit Display Information
        </Typography>
        <Grid2 container spacing={4} className={styles["profile-edit-panel"]}>
          <Grid2 item xs={12} md={6} className={styles["left-panel"]}>
            <Box className={styles["profile-image-section"]}>
              <Typography
                variant="body1"
                className={styles["picture-subtitle"]}
              >
                Profile Image
              </Typography>
              <IconButton component="label">
                <Avatar
                  src={profilePic}
                  alt="Profile"
                  sx={{ width: 100, height: 100 }}
                />
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
              </IconButton>
              <Box className={styles["display-info"]}>Display Publicly</Box>
            </Box>
            <Box className={styles["input-row"]}>
              <Typography variant="body1" className={styles["input-label"]}>
                Name
              </Typography>
              <TextField
                id="name"
                placeholder="Add a name"
                variant="outlined"
                name="name"
                value={profileData.name}
                onChange={handleChange}
                className={styles["input-field"]}
              />
              <Box className={styles["privacy-toggle"]}>
                <CustomSwitch
                  checked={profileData.showName}
                  onChange={() => handleSwitchChange("showName")}
                  inputProps={{
                    "aria-label": "Display name on profile",
                  }}
                />
              </Box>
            </Box>
            <Box className={styles["input-row"]}>
              <Typography
                variant="body1"
                className={styles["input-label"]}
                htmlFor="birthday"
              >
                Birthday
              </Typography>
              <TextField
                id="birthday"
                type="date"
                name="birthday"
                value={profileData.birthday}
                onChange={handleChange}
                className={styles["input-field"]}
                aria-label="Birthday"
                sx={{
                  "& .MuiInputLabel-root": {
                    shrink: true, // Ensures the label is always shrunk above the input field
                  },
                }}
              />
              <Box className={styles["privacy-toggle"]}>
                <CustomSwitch
                  checked={profileData.showBirthday}
                  onChange={() => handleSwitchChange("showBirthday")}
                  inputProps={{
                    "aria-label": "Display birthday on profile",
                  }}
                />
              </Box>
            </Box>
            <Box className={styles["input-row"]}>
              <Typography variant="body1" className={styles["input-label"]}>
                Note/Bio
              </Typography>
              <TextField
                id="bio"
                placeholder="Add a note"
                name="bio"
                value={profileData.bio}
                onChange={handleChange}
                multiline
                rows={3}
                variant="outlined"
                className={styles["input-field"]}
              />
              <Box className={styles["privacy-toggle"]}>
                <CustomSwitch
                  checked={profileData.showBio}
                  onChange={() => handleSwitchChange("showBio")}
                  inputProps={{
                    "aria-label": "Display bio on profile",
                  }}
                />
              </Box>
            </Box>
          </Grid2>
        </Grid2>
      </Box> */}
    </Box>
  );
};

export default ProfileSettings;
