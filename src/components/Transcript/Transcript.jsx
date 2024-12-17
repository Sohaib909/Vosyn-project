import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import useStatusNotification from "@/hooks/useStatusNotification";
import { selectDashObject } from "@/reduxSlices/dashObjectSlice";
import { selectPlayer } from "@/reduxSlices/playerSlice";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";
import useSWR from "swr";

import Dialogue from "./Dialouge/Dialouge";

import styles from "./Transcript.module.css";

const fetcher = (url) => fetch(url).then((res) => res.json());

//  convert a duration string into seconds
const parseDurationToSeconds = (durationString) => {
  const [hours, minutes, seconds] = durationString.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds;
};

const Transcript = ({ transcriptJson }) => {
  const transcriptList = useRef();
  const [transcripts, setTranscripts] = useState([]);
  const [activeItemId, setActiveItemId] = useState(transcriptJson[0].timestamp);
  const { playing, dubbedLanguage } = useSelector(selectPlayer);
  const [transcriptData, setTranscriptData] = useState([]);
  const { currentTime } = useSelector(selectPlayer);
  const [autoScroll, setAutoScroll] = useState(true);
  const { hasEnded } = useSelector(selectPlayer);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [showResumeScrolling, setShowResumeScrolling] = useState(false);
  const { showTranslatedTranscript } = useSelector(selectPlayer);
  const LIST_ITEM_HEIGHT = showTranslatedTranscript ? 73 : 53;
  const [isAnyTranscriptflagged, setIsAnyTranscriptflagged] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const { setStatus } = useStatusNotification();
  const { mediaObj } = useSelector(selectDashObject);

  const shouldFetch = mediaObj?.id && dubbedLanguage;
  const { error: transcriptError } = useSWR(
    shouldFetch
      ? `/api/transcript/?video=${mediaObj.id}&language=${dubbedLanguage}`
      : null,
    fetcher,
    {
      onSuccess: (newData) => {
        if (newData.file_url) {
          fetch(newData.file_url)
            .then((response) => response.json())
            .then((transcriptJsonData) => {
              setTranscriptData(transcriptJsonData);
            })
            .catch((error) => {
              console.error("Error fetching transcript content:", error);
            });
        }
      },
      onError: (error) => {
        console.error("Error fetching transcript:", error);
      },
    },
  );
  if (transcriptError) {
    setStatus(`${transcriptError?.message}. Please try again later.`, "error");
  }

  useEffect(() => {
    const mappedTranscripts = transcriptData.map((transcript, index) => {
      if (
        index !== 0 &&
        transcriptJson &&
        transcriptJson[index - 1]?.timestamp
      ) {
        return {
          ...transcript,
          startTime:
            parseDurationToSeconds(transcriptJson[index - 1].timestamp) + 1,
        };
      } else {
        return { ...transcript, startTime: 0 };
      }
    });

    // Deduplicate by filtering out duplicate timestamps
    const deduplicatedTranscripts = mappedTranscripts.filter(
      (item, idx, array) =>
        idx === array.findIndex((t) => t.timestamp === item.timestamp),
    );

    setTranscripts(deduplicatedTranscripts);
  }, [transcriptData]);

  useEffect(() => {
    if (!hasEnded) {
      // Find the active transcript item based on the current time
      const activeTranscript = transcripts.find((item) => {
        const startTime = item.startTime;
        const endTime = parseDurationToSeconds(item.timestamp);

        // Compare currentTime with transcript's timestamp range
        return currentTime >= startTime && currentTime <= endTime;
      });

      if (activeTranscript) {
        // Update the active transcript ID
        setActiveItemId(activeTranscript.timestamp);
      }
    }
  }, [currentTime, playing, transcripts, transcriptJson]);

  useEffect(() => {
    if (transcripts) {
      if (autoScroll) {
        if (activeItemId === transcripts[0]?.timestamp) {
          transcriptList.current.scrollBy({
            top: 0,
            left: 0,
          });
        } else {
          transcriptList.current.scrollBy({
            top: LIST_ITEM_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
        }
      }
      const activeItemIdx = transcripts.findIndex((transcript) => {
        return transcript.timestamp === activeItemId;
      });
      setActiveItemIndex(activeItemIdx != -1 ? activeItemIdx : 0);

      if (!showResumeScrolling && autoScroll) {
        setCurrentItemPosition(activeItemIdx);
      }
    }
  }, [activeItemId, transcripts, hasEnded]);

  useEffect(() => {
    if (transcripts) {
      transcriptList.current.onscrollend = (e) => {
        const top = e.target.scrollTop;
        if (!isAnyTranscriptflagged) {
          if (
            top > activeItemIndex * LIST_ITEM_HEIGHT ||
            top < activeItemIndex * LIST_ITEM_HEIGHT
          ) {
            setAutoScroll(false);
            setShowResumeScrolling(true);
          } else {
            setAutoScroll(true);
            setShowResumeScrolling(false);
          }
        }
      };
    }
  });

  useEffect(() => {
    const item = transcripts.find((transcript) => transcript.flagged == true);
    if (item !== undefined) {
      setIsAnyTranscriptflagged(true);
    } else {
      setIsAnyTranscriptflagged(false);
    }
  }, [transcripts]);

  const handleflagging = (timestamp) => {
    const copiedTranscript = [...transcripts];
    const filteredElIndex = copiedTranscript.findIndex(
      (transcript) => transcript.timestamp === timestamp,
    );
    copiedTranscript[filteredElIndex].flagged =
      !transcripts[filteredElIndex].flagged;
    setTranscripts(copiedTranscript);
    setAutoScroll(false);
  };

  const handleSubmitSuggestionText = (text, id) => {
    const copiedTrascripts = [...transcripts];
    const selectedItemIndex = copiedTrascripts.findIndex(
      (transcript) => transcript.timestamp === id,
    );
    const copiedObject = {
      ...copiedTrascripts[selectedItemIndex],
      suggestedText: text,
    };
    copiedTrascripts[selectedItemIndex] = copiedObject;
    setTranscripts(copiedTrascripts);
  };

  const setCurrentItemPosition = (index) => {
    transcriptList.current.scroll({
      top: index * LIST_ITEM_HEIGHT,
      behavior: "smooth",
    });
  };

  return (
    <Box className={styles.transcripts_container}>
      <Box className={styles.transcript_list} ref={transcriptList}>
        <Snackbar
          open={isSnackbarOpen}
          autoHideDuration={5000}
          onClose={() => {
            setIsSnackbarOpen(false);
          }}
          sx={{ width: "100%" }}
        >
          <Alert
            onClose={() => {
              setIsSnackbarOpen(false);
            }}
            severity="warning"
            variant="filled"
            sx={{ width: "20%" }}
          >
            {snackMessage}
          </Alert>
        </Snackbar>
        {
          <Box style={{ marginBottom: LIST_ITEM_HEIGHT * 3 }}>
            {transcripts.map((transcript, index) => {
              return (
                <Dialogue
                  key={transcript.timestamp}
                  transcript={transcript}
                  handleflagging={handleflagging}
                  showFlagAndTime={true}
                  setCurrentItemPosition={setCurrentItemPosition}
                  index={index}
                  setAutoScroll={setAutoScroll}
                  setShowResumeScrolling={setShowResumeScrolling}
                  handleSubmitSuggestionText={handleSubmitSuggestionText}
                  activeItemIndex={activeItemIndex}
                  isAnyTranscriptflagged={isAnyTranscriptflagged}
                  transcriptList={transcriptList}
                  LIST_ITEM_HEIGHT={LIST_ITEM_HEIGHT}
                  setIsSnackbarOpen={setIsSnackbarOpen}
                  setSnackMessage={setSnackMessage}
                />
              );
            })}
            <Box
              className={
                !showResumeScrolling
                  ? styles.scroll_badge
                  : [styles.scroll_badge, styles.show]
              }
              sx={{
                boxShadow: 1,
              }}
              onClick={() => {
                if (!isAnyTranscriptflagged) {
                  setCurrentItemPosition(activeItemIndex);
                  setAutoScroll(true);
                } else {
                  setSnackMessage("Please complete the open suggestion");
                  setIsSnackbarOpen(true);
                }
              }}
            >
              <Typography variant="body1">Resume AutoScrolling</Typography>
            </Box>
          </Box>
        }
      </Box>
    </Box>
  );
};

export default Transcript;
