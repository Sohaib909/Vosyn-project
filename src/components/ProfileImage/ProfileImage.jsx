import React from "react";

import { Grid2 } from "@mui/material";
import Image from "next/image";

import styles from "./ProfileImage.module.css";

const ProfileImage = ({
  url = "https://www.w3schools.com/howto/img_avatar.png",
}) => {
  return (
    <Grid2 item size={12}>
      <Image fill src={url} alt="profile" className={styles.profileImage} />
    </Grid2>
  );
};

export default ProfileImage;
