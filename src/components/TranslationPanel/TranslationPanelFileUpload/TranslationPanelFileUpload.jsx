"use client";

import React, { useState } from "react";

import { Delete, PlayArrow } from "@mui/icons-material";
import { Box, InputBase, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

import UploadInteractions from "@/components/Landing/UploadInteractions/UploadInteractions";

const TranslationPanelFileUpload = () => {
  const [isDeleted, setIsDeleted] = useState(false);

  return (
    <>
      <Grid sx={{ width: "100%" }}>
        <Typography
          variant="subtitle2"
          sx={{
            marginBottom: "0.25rem",
            fontWeight: "bold !important",
            textAlign: "left",
            color: "var(--mui-palette-neutral-300)",
          }}
        >
          File or Link
        </Typography>
        {!isDeleted ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 1,
            }}
          >
            {/* Play Button */}
            <PlayArrow
              sx={{ cursor: "pointer", color: "white" }}
              onClick={() => console.log("Play audio")}
            />

            {/* File Control Image */}
            <img
              src="/mediaFiles/AudioPlayback/filecontrol.png"
              alt="file control"
              width="85%"
            />

            {/* Delete Button */}
            <Delete
              sx={{ cursor: "pointer", color: "#bf5b57" }}
              onClick={() => setIsDeleted(true)}
            />
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 1,
              borderRadius: "8px",
              overflow: "hidden",
              width: "100%",
            }}
          >
            <InputBase
              placeholder="Input text here ..."
              sx={{
                flex: 1,
                borderRadius: "8px 0 0 8px",
                padding: "10px",
                border: "1px solid var(--mui-palette-neutral-600)",
                color: "var(--mui-palette-common-white)",
              }}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "50%",
              }}
            >
              <UploadInteractions />
            </Box>
          </Box>
        )}
      </Grid>
    </>
  );
};

export default TranslationPanelFileUpload;
