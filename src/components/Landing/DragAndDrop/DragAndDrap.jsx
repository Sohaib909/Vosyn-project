"use client";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";

import useStatusNotification from "@/hooks/useStatusNotification";
import { setSelectedFile } from "@/reduxSlices/languageSlice";
import { selectUser } from "@/reduxSlices/userSlice";
import { handleFileUpload } from "@/utils/fileUploader";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

import styles from "./DragAndDrop.module.css";

const DragAndDrap = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  //geting info on username
  const { userProfile } = useSelector(selectUser);

  const { setStatus } = useStatusNotification();

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) {
        setStatus("No file selected", "error");
        return;
      }

      try {
        // Pass file and user information to the handleFileUpload utility
        const { route } = await handleFileUpload(
          file,
          file.type,
          (fileName) => dispatch(setSelectedFile(fileName)),
          { user: userProfile?.userName }, // Additional metadata
        );
        router.push(route);
      } catch (err) {
        setStatus(err.message || "Upload failed", "error");
      }
    },
    [dispatch, router, setStatus, userProfile],
  );

  const { getRootProps, getInputProps, isDragActive } = useDro<<<<<<< pod-titanpzone({ onDrop });

  return (
    <Box {...getRootProps()} className={styles.border}>
      <input {...getInputProps()} />
      <Typography sx={{ fontStyle: "italic", textAlign: "center" }}>
        {isDragActive ? "Drop the files here ..." : "Drag and drop"}
      </Typography>
    </Box>
  );
};

export default DragAndDrap;
