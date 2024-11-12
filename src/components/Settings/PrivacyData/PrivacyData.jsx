"use client";

import React, { useState } from "react";

import useStatusNotification from "@/hooks/useStatusNotification";
import { FormGroup, Grid2, Link, Typography } from "@mui/material";
import axios from "axios";
import useSWR from "swr";

import CustomSwitch from "@/components/Buttons/Switch/CustomSwitch";

import { ListItemWithIcon } from "../ListItem/ListItem";

const fetcher = (url) => axios.get(url).then((res) => res?.data);

const PrivacyData = () => {
  const [allSettings, setAllSettings] = useState({
    location_tracking: false,
    generate_relevant_content: false,
  });

  const { setStatus } = useStatusNotification();

  const { error, mutate } = useSWR("/api/settings", fetcher, {
    onSuccess: (newData) => {
      const response = newData.data.user;

      setAllSettings(response);
    },
  });

  if (error) {
    setStatus("Failed to fetch settings", "error");
  }

  const handleSwitchChange = async (event) => {
    const { name, checked } = event.target;
    const updatedSettings = { ...allSettings, [name]: checked };

    try {
      await axios.patch("/api/settings", updatedSettings);
      mutate();
    } catch (error) {
      setStatus("Failed to update settings", "error");
    }
  };

  return (
    <>
      <Typography variant="h5">Privacy and Data</Typography>

      <ListItemWithIcon
        heading="Ads"
        subheading={
          <>
            You may see ads based on general factors, such as the topic of the
            video. For more information on how ads work, including specifics for
            family accounts with children, please visit our{" "}
            <Link sx={{ textDecoration: "none", cursor: "pointer" }}>
              Help Center
            </Link>
            .
          </>
        }
      />

      <FormGroup>
        <Grid2 container spacing={4}>
          <ListItemWithIcon
            heading="Location Tracking"
            subheading={
              <>
                Location tracking allows us to provide location-specific content
                and recommendations. You may receive tailored suggestions based
                on your geographic location. For more details on our location
                tracking policy, please refer to our{" "}
                <Link sx={{ textDecoration: "none", cursor: "pointer" }}>
                  Privacy Policy
                </Link>
              </>
            }
            end={
              <CustomSwitch
                name="location_tracking"
                checked={allSettings.location_tracking}
                onChange={handleSwitchChange}
              />
            }
          />

          <ListItemWithIcon
            heading={"Use Data to Generate Relevant Content"}
            subheading={
              <>
                We utilize your viewing history and preferences to generate
                personalized content recommendations. This helps enhance your
                experience by suggesting shows and movies that align with your
                interests. For further information on data usage, consult our{" "}
                <Link sx={{ textDecoration: "none", cursor: "pointer" }}>
                  Privacy Policy
                </Link>
              </>
            }
            end={
              <CustomSwitch
                name="generate_relevant_content"
                checked={allSettings.generate_relevant_content}
                onChange={handleSwitchChange}
              />
            }
          />
        </Grid2>
      </FormGroup>
    </>
  );
};

export default PrivacyData;
