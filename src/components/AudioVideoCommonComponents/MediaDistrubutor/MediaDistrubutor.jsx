"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";

import { selectDashObject } from "@/reduxSlices/dashObjectSlice";
import { PersonAddAlt1Rounded } from "@mui/icons-material";
import { Grid2, Typography } from "@mui/material";

import ButtonWithIconAndText from "../../Buttons/ButtonWithIconAndText/ButtonWithIconAndText";
import ProfileImage from "../../ProfileImage/ProfileImage";

const MediaDistrubutor = () => {
  const { mediaObj } = useSelector(selectDashObject);
  const [subscribers, setSubscribers] = useState(0);

  const handleSub = () => {
    subscribers === 1 ? setSubscribers(0) : setSubscribers(1);
  };

  return (
    <Grid2
      container
      item
      spacing={2}
      size={{ xs: 12, lg: 5 }}
      sx={{
        height: "fit-content",
        flexDirection: "column",
      }}
    >
      <Grid2 size={12} item>
        <Typography variant="h6">
          {mediaObj?.titles?.map((item) => item.title_text)}
        </Typography>
      </Grid2>

      <Grid2 size={12} item container spacing={2} sx={{ alignItems: "center" }}>
        <Grid2 size={{ xs: 2, sm: 1, md: 3, lg: 2, xl: 1.8 }} item>
          <ProfileImage />
        </Grid2>

        <Grid2 sx={{ display: "flex", flexDirection: "column" }}>
          {/** This should be replaced with who this media belongs to and subscribe endpoint*/}
          <Typography variant="body1">YouTube</Typography>
          <Typography
            variant="caption"
            sx={{ opacity: "60%", textWrap: "nowrap" }}
          >
            {subscribers} Subscribers
          </Typography>
        </Grid2>

        <Grid2>
          <ButtonWithIconAndText
            text={subscribers === 0 ? "Subscribe" : "Unsubscribe"}
            method={handleSub}
            icon={<PersonAddAlt1Rounded />}
          />
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default MediaDistrubutor;
