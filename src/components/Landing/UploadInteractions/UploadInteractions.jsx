"use client";

import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import useStatusNotification from "@/hooks/useStatusNotification";
import { setSelectedFile } from "@/reduxSlices/languageSlice";
import { selectUser } from "@/reduxSlices/userSlice";
import { handleFileUpload } from "@/utils/fileUploader";
import { AddOutlined, MicRounded, VideocamRounded } from "@mui/icons-material";
import { Card, CardActions, IconButton } from "@mui/material";
import { useRouter } from "next/navigation";

import RecordMedia from "./RecordMedia/RecordMedia";

import styles from "./UploadInteractions.module.css";

const UploadInteractions = () => {
  const { userProfile } = useSelector(selectUser);

  const fileInputRef = useRef(null);

  const dispatch = useDispatch();

  const router = useRouter();
  const { setStatus } = useStatusNotification();

  /**
   * A method to upload the media and ridirect to the translation page.
   *
   * @param {The event detail} e
   */
  const uploadMedia = async (e) => {
    e.preventDefault();

    const file = e.target.files[0];

    try {
      const { route } = await handleFileUpload(
        file,
        file.type,
        (fileName) => dispatch(setSelectedFile(fileName)),
        { user: userProfile?.userName },
      );
      router.push(route);
    } catch (err) {
      setStatus(err.message || "Upload failed", "error");
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
