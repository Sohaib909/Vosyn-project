"use client";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";

import useStatusNotification from "@/hooks/useStatusNotification";
import { setSelectedFile } from "@/reduxSlices/languageSlice";
import { selectUser } from "@/reduxSlices/userSlice";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";

import styles from "./DragAndDrop.module.css";

const DragAndDrap = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  //geting info on username
  const { userProfile } = useSelector(selectUser);

  const { setStatus } = useStatusNotification();

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

  const onDrop = useCallback(async (acceptedFiles) => {
    const currentDate = new Date(); // Capture the current date as the upload date

    const file = acceptedFiles[0];
    const fileType = file.type;
    const fileCat = getFileCategory(fileType);

    const newFiles = acceptedFiles.map((file) => ({
      dateUploaded: currentDate,
      user: userProfile?.userName,
      fileName: file.name,
    }));

    try {
      const res = await axios.post("/api/upload", newFiles); // Change when end point is ready

      if (res.status === 200) {
        dispatch(setSelectedFile(file?.name));
        router.push(`/user-upload/${fileCat}/${file?.name}`); // Replace the last part with id returned by server when end is ready
      }
    } catch (err) {
      setStatus(err?.response?.statusText, "error");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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
