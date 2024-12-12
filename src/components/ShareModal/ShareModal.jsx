"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";

import { selectDashObject } from "@/reduxSlices/dashObjectSlice";
import { selectPlayer } from "@/reduxSlices/playerSlice";
import { formatTimeStamp } from "@/utils/formatTimeStamp";
import { socialMediaPlatforms } from "@/utils/socialMediaPlatforms";
import { LinkRounded } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Checkbox,
  Grid2,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";

import SocialIcon from "./SocialIcon/SocialIcon";

import styles from "./ShareModal.module.css";

const ShareModal = ({
  open,
  onClose,
  showTimeStamp = true,
  title = "Frosty the snowman",
}) => {
  const { currentTime } = useSelector(selectPlayer);
  const { mediaObj } = useSelector(selectDashObject);
  const [buttonText, setButtonText] = useState("Copy Link");
  const currentLocation =
    typeof window !== "undefined" ? window.location.href : "";

  const handleCopy = () => {
    navigator.clipboard.writeText(window?.location?.href);

    setButtonText("Copied!");

    setTimeout(() => {
      setButtonText("Copy Link");
    }, 2000);
  };

  return (
    <Modal
      data-testid="backdrop"
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "auto",
      }}
    >
      <Grid2
        className={styles.modal}
        container
        spacing={2}
        sx={{
          backgroundColor: "var(--mui-palette-neutral-800)",
          borderRadius: "12px",
        }}
      >
        <Grid2
          container
          size={12}
          sx={{ position: "relative", minHeight: "20rem", padding: "1rem" }}
        >
          <Image
            fill
            src="/mediaFiles/ShareModal/shareModalImage.jpg"
            alt="modalImage"
            className={styles.image}
          />
          <Box
            className={styles.image}
            sx={{
              zIndex: "2",
              width: "100%",
              height: "100%",
              left: "0",
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(1px)",
            }}
          ></Box>
          <Grid2
            size={12}
            sx={{
              display: "flex",
              zIndex: "9999",
              height: "fit-content",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body1"
              sx={{ width: "100%", textAlign: "center" }}
            >
              {title}
            </Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Grid2>

          <Grid2 size={12} sx={{ zIndex: "9999", textAlign: "center" }}>
            <Typography>Preview</Typography>
          </Grid2>
        </Grid2>

        <Grid2 container size={12} spacing={4} sx={{ mb: "2rem" }}>
          <Grid2 size={12} sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h6">
              {mediaObj?.titles?.map((item) => item.title_text)}
            </Typography>
          </Grid2>

          <Grid2
            container
            size={12}
            spacing={4}
            sx={{ justifyContent: "center" }}
          >
            {socialMediaPlatforms?.map((social, index) => (
              <SocialIcon key={index} social={social} />
            ))}
          </Grid2>

          <Grid2
            container
            size={12}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              px: "1rem",
            }}
          >
            <Grid2 size={{ xs: 12, sm: 12, md: 8, lg: 9 }}>
              <TextField
                disabled
                fullWidth
                variant="outlined"
                size="small"
                value={currentLocation}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 12, md: 4, lg: 3 }}>
              <Button
                autoCapitalize="false"
                sx={{
                  backgroundColor: "var(--mui-palette-neutral-100)",
                  color: "black",
                  columnGap: "1rem",
                  width: "100%",
                  height: "100%",
                  "&:hover": {
                    backgroundColor: "var(--mui-palette-neutral-400)",
                    color: "inherit",
                  },
                }}
                onClick={handleCopy}
              >
                <Typography>{buttonText}</Typography>
                <LinkRounded />
              </Button>
            </Grid2>
          </Grid2>

          {showTimeStamp && (
            <Grid2
              size={12}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Checkbox color="inherit" aria-label="start from checkbox" />
              <Typography>Start from</Typography>
              <TextField
                sx={{ ml: "1rem" }}
                className={styles.timeInput}
                value={formatTimeStamp(currentTime)}
              />
            </Grid2>
          )}
        </Grid2>
      </Grid2>
    </Modal>
  );
};

export default ShareModal;
