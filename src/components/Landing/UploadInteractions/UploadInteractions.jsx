"use client";

import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import useStatusNotification from "@/hooks/useStatusNotification";
import { setSelectedFile } from "@/reduxSlices/languageSlice";
import { selectUser } from "@/reduxSlices/userSlice";
import { AddOutlined, MicRounded, VideocamRounded } from "@mui/icons-material";
import { Card, CardActions, IconButton } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";

import RecordMedia from "./RecordMedia/RecordMedia";

import styles from "./UploadInteractions.module.css";

const UploadInteractions = () => {
  const { userProfile } = useSelector(selectUser);

  const fileInputRef = useRef(null);

  const dispatch = useDispatch();

  const router = useRouter();

  // Function to determine file category
  const getFileCategory = (type) => {
    if (type.startsWith("video/")) {
      return "video";
    } else if (type.startsWith("audio/")) {
      return "audio";
    } else if (type.startsWith("text/") || type.startsWith("application/")) {
      return "text";
    } else if (type.startsWith("image/")) {
      return "image";
    } else {
      return "unknown";
    }
  };

  const { setStatus } = useStatusNotification();

  /**
   * A method to upload the media and ridirect to the translation page.
   *
   * @param {The event detail} e
   */
  const uploadMedia = async (e) => {
    e.preventDefault();

    const file = e.target.files;

    const fileType = file[0].type;
    const fileName = file[0].name;

    const fileCat = getFileCategory(fileType);

    const date = new Date();

    // This will need to be sent to the backend when we have the api endpoint.
    const mediaData = {
      dateUploaded: date.toUTCString(),
      user: userProfile?.username,
      fileName: fileName,
    };

    try {
      const res = await axios.post("/api/upload", mediaData);

      if (res.status === 200) {
        dispatch(setSelectedFile(fileName));
        router.push(`/user-upload/${fileCat}/${fileName}`); // Replace the last part with id returned by server when end is ready
      }
    } catch (err) {
      setStatus(err?.response?.statusText, "error");
    }
  };

  return (
    <Card className={styles.actionsCardContainer}>
      <CardActions className={styles.actionsContainer}>
        {/* Video Recording */}
        <RecordMedia mediaType="video">
          {(startRecording) => (
            <IconButton
              className={styles.iconColor}
              aria-label="record-video"
              onClick={startRecording}
            >
              <VideocamRounded />
            </IconButton>
          )}
        </RecordMedia>

        {/* Audio Recording */}
        <RecordMedia mediaType="audio">
          {(startRecording) => (
            <IconButton
              className={styles.iconColor}
              aria-label="record-audio"
              onClick={startRecording}
            >
              <MicRounded />
            </IconButton>
          )}
        </RecordMedia>

        <IconButton
          className={styles.iconColor}
          onClick={() => fileInputRef.current.click()}
          aria-label="upload-media"
        >
          <AddOutlined />
          <input
            type="file"
            ref={fileInputRef}
            onChange={uploadMedia}
            className={styles.hiddenInput}
          />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default UploadInteractions;
