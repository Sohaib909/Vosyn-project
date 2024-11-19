import React, { useState } from "react";

import {
  Avatar,
  Box,
  Grid2,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";

import CustomSwitch from "@/components/Buttons/Switch/CustomSwitch";

import styles from "./ProfileSettings.module.css";

const ProfileSettings = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    birthday: "",
    bio: "",
    showName: false,
    showBirthday: false,
    showBio: false,
  });
  const [profilePic, setProfilePic] = useState(
    "https://via.placeholder.com/100",
  );

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSwitchChange = (field) => {
    setProfileData({
      ...profileData,
      [field]: !profileData[field],
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfilePic(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box className={styles["profile-edit-container"]}>
      <Typography variant="h4" className={styles["profile-title"]}>
        Profiles
      </Typography>
      <Typography variant="h9" className={styles["Subtitle"]}>
        Profile Information
      </Typography>
      <Typography variant="h5" className={styles["profile-subtitle"]}>
        Edit Display Information
      </Typography>
      <Grid2 container spacing={4} className={styles["profile-edit-panel"]}>
        {/* Left Panel */}
        <Grid2 item xs={12} md={6} className={styles["left-panel"]}>
          {/* Profile Image Section */}
          <Box className={styles["profile-image-section"]}>
            <Typography variant="body1" className={styles["profile-subtitle"]}>
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
            <Box className={styles["display-info"]}>
              Display Information Privacy
            </Box>
          </Box>
          {/* Name Input */}
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
              sx={{
                "& .MuiOutlinedInput-input": {
                  color: "#000", // Text color
                },
              }}
            />
            {/* Privacy Toggles for name */}
            <Box className={styles["privacy-toggle"]}>
              {/* <Typography variant="body2" className="toggle-label">Display Name on profile?</Typography> */}
              <CustomSwitch
                checked={profileData.showName}
                onChange={() => handleSwitchChange("showName")}
                inputProps={{
                  "aria-label": "Display name on profile",
                }}
              />
            </Box>
          </Box>

          {/* Birthday Input */}
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
              //   placeholder="20XX/MM/DD"
              name="birthday"
              value={profileData.birthday}
              onChange={handleChange}
              // InputLabelProps={{ shrink: true }}
              className={styles["input-field"]}
              aria-label="Birthday"
              sx={{
                "& .MuiInputLabel-root": {
                  shrink: true, // Ensures the label is always shrunk above the input field
                },
                "& .MuiOutlinedInput-input": {
                  color: "#000", // Text color
                },
              }}
            />
            {/* Privacy toggle for birthday info*/}
            <Box className={styles["privacy-toggle"]}>
              {/* <Typography variant="body2" className="toggle-label">Display Birthday on profile?</Typography> */}
              <CustomSwitch
                checked={profileData.showBirthday}
                onChange={() => handleSwitchChange("showBirthday")}
                inputProps={{
                  "aria-label": "Display birthday on profile",
                }}
              />
            </Box>
          </Box>

          {/* Bio Input */}
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
              sx={{
                "& .MuiOutlinedInput-input": {
                  color: "#000", // Text color
                },
              }}
            />
            {/* Privacy toggle for bio*/}
            <Box className={styles["privacy-toggle"]}>
              {/* <Typography variant="body2" className="toggle-label">Display Bio on profile?</Typography> */}
              <CustomSwitch
                checked={profileData.showBio}
                onChange={() => handleSwitchChange("showBio")}
                inputProps={{
                  "aria-label": "Display bio on profile",
                }}
              />
            </Box>
          </Box>
          {/* Show my status*/}
          <Box className={styles["input-row"]}>
            <Typography variant="body1" className={styles["input-label"]}>
              Show my status
            </Typography>
          </Box>
        </Grid2>
        {/* </Grid2> */}
      </Grid2>
    </Box>
  );
};

export default ProfileSettings;
