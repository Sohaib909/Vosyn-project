"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Delete, PlayArrow } from "@mui/icons-material";
import {
  Box,
  InputAdornment,
  InputBase,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import Image from "next/image";

import UploadInteractions from "@/components/Landing/UploadInteractions/UploadInteractions";

const TranslationPanelFileUpload = ({ mediaType }) => {
  const [isDeleted, setIsDeleted] = useState(false);

  // const selectedFile = useSelector((state) => state.languages.selectedFile);

  const selector = (state) => state.languages.selectedFile;

  const selectedFile = useSelector(selector);

  const FileSelectTextField = styled(TextField)(({ theme }) => ({
    input: {
      color: theme.palette.common["white"],
    },
  }));

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
        {isDeleted && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 1,
              borderRadius: "8px",
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

        {!isDeleted && mediaType !== "audio/video" && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 1,
              border: "1px solid var(--mui-palette-neutral-600)",
            }}
          >
            <FileSelectTextField
              fullWidth
              value={selectedFile}
              className="translation-panel-file-input"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Delete
                      sx={{ cursor: "pointer", color: "#bf5b57" }}
                      onClick={() => setIsDeleted(true)}
                    />
                  </InputAdornment>
                ),
              }}
              inputProps={{
                "data-testid": "file-input",
              }}
            />
          </Box>
        )}

        {!isDeleted && mediaType === "audio/video" && (
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
            <Image
              src="/mediaFiles/AudioPlayback/filecontrol.png"
              alt="file control"
              width={250}
              height={30}
            />

            {/* Delete Button */}
            <Delete
              sx={{ cursor: "pointer", color: "#bf5b57" }}
              onClick={() => setIsDeleted(true)}
            />
          </Box>
        )}
      </Grid>
    </>
  );
};

export default TranslationPanelFileUpload;
