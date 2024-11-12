import React, { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import useStatusNotification from "@/hooks/useStatusNotification";
import {
  resetRecordingState,
  selectRecorder,
  setRecordedBlob,
  setRecording,
} from "@/reduxSlices/recordingSlice";
import { Close } from "@mui/icons-material";
import { Box, DialogContent, IconButton, Modal } from "@mui/material";
import axios from "axios";

import RecordAudio from "../RecordAudio/RecordAudio";
import RecordVideo from "../RecordVideo/RecordVideo";

import styles from "./RecordMedia.module.css";

const RecordMedia = ({ mediaType, children }) => {
  const dispatch = useDispatch();
  const { isRecording, hasPermissions } = useSelector(selectRecorder);
  const mediaRecorderRef = useRef(null);
  const videoRef = useRef(null); // Correct ref for video element

  const [open, setOpen] = useState(false);

  const { setStatus } = useStatusNotification();

  const startRecording = useCallback(async () => {
    try {
      setOpen(true);

      const constraints =
        mediaType === "audio" ? { audio: true } : { audio: true, video: true };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      if (mediaType === "video") {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }

      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = async (event) => {
        const blob = new Blob([event.data], {
          type: mediaType === "audio" ? "audio/wav" : "video/mp4",
        });

        dispatch(setRecordedBlob({ blob, type: mediaType }));

        try {
          const response = await axios.post("/api/recordings", blob);
          if (response.status === 200) {
            setStatus("Media uploaded successfully!", "success");
          }
        } catch {
          setStatus("Failed to upload media.", "error");
        }
      };

      mediaRecorderRef.current.start();
      dispatch(setRecording(true));
    } catch (err) {
      setStatus("Permission denied:", "error");
    }
  }, [dispatch, mediaType, hasPermissions]);

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
    }
    dispatch(setRecording(false));
    dispatch(resetRecordingState());
    setOpen(false);
  };

  return (
    <>
      {children(startRecording)}

      <Modal
        open={open}
        onClose={stopRecording}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: "3rem",
        }}
      >
        <DialogContent className={styles.inputContainer}>
          <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <IconButton
              onClick={stopRecording}
              sx={{ color: "white", alignSelf: "end" }}
              aria-label="close"
            >
              <Close />
            </IconButton>

            {mediaType === "audio" ? (
              <RecordAudio />
            ) : (
              <RecordVideo
                isRecording={isRecording}
                stopRecording={stopRecording}
                videoRef={videoRef} // Pass the correct ref here
              />
            )}
          </Box>
        </DialogContent>
      </Modal>
    </>
  );
};

export default RecordMedia;
