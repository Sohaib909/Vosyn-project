import React, { useCallback } from "react";

import useStatusNotification from "@/hooks/useStatusNotification";
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import axios from "axios";
import { useSWRConfig } from "swr";

import styles from "../PlaylistModal.module.css";

const PlaylistItem = ({ playlistItem, isChecked, mediaId }) => {
  const { setStatus } = useStatusNotification();
  const { mutate } = useSWRConfig();

  const handleCheckboxChange = useCallback(
    async (e) => {
      const isAdding = e.target.checked;
      const url = `/api/playlist/singlePlaylist/${playlistItem?.id}`;

      try {
        // Optimistic UI Update
        mutate(
          `/api/playlist/${mediaId}`,
          (existingData) => {
            // Ensure existingData and existingData.data are defined before proceeding
            if (!existingData || !existingData.data) return existingData;

            // Perform the optimistic update based on whether isAdding is true or false
            const updatedData = isAdding
              ? [...existingData.data, { playlist: playlistItem?.id }]
              : existingData.data.filter(
                  (item) => item.playlist !== playlistItem?.id,
                );

            return {
              ...existingData,
              data: updatedData,
            };
          },
          false, // Don't revalidate immediately; revalidate after mutation
        );

        // Make API call to add or remove playlist
        const res = await axios({
          method: isAdding ? "post" : "delete",
          url,
          data: { id: mediaId },
        });

        if (res?.status === 201 || res?.status === 200) {
          setStatus(
            isAdding
              ? "Successfully added media to playlist."
              : "Successfully removed media from playlist.",
            "success",
          );
          // Revalidate data from server to ensure it's in sync
          mutate(`/api/playlist/${mediaId}`);
        }
      } catch (err) {
        setStatus(
          isAdding
            ? "Unable to add item to playlist! Please try again later."
            : "Unable to remove item from playlist! Please try again later.",
          "error",
        );
        // Rollback the optimistic update if an error occurred
        mutate(`/api/playlist/${mediaId}`);
      }
    },
    [mediaId, mutate, playlistItem?.id, setStatus],
  );

  return (
    <Box>
      <FormControlLabel
        sx={{ "& .Mui-checked": { color: "inherit" } }}
        key={playlistItem?.id}
        control={
          <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
        }
        label={playlistItem?.name}
        className={styles.item}
      />

      {isChecked && (
        <Typography
          variant="caption"
          sx={{ color: "var(--mui-palette-secondary-light)" }}
        >
          already in playlist
        </Typography>
      )}
    </Box>
  );
};

export default PlaylistItem;
