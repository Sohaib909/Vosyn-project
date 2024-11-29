import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectLanguage } from "@/reduxSlices/languageSlice";
import { selectPlayer, setCurrentTime } from "@/reduxSlices/playerSlice";
import CheckIcon from "@mui/icons-material/Check";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import FlagIcon from "@mui/icons-material/Flag";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import styles from "./Dialouge.module.css";

const Dialogue = ({
  transcript,
  handleflagging,
  showFlagAndTime,
  handleSubmitSuggestionText,
  setCurrentItemPosition,
  index,
  setAutoScroll,
  setShowResumeScrolling,
  activeItemIndex,
  isAnyTranscriptflagged,
  transcriptList,
  LIST_ITEM_HEIGHT,
  setIsSnackbarOpen,
  setSnackMessage,
}) => {
  const listItem = useRef();
  const [showSuggestionTextbox, setShowSuggestionTextbox] = useState(false);
  const [suggestionText, setSuggestionText] = useState("");
  const { selectedOriginalLanguage } = useSelector(selectLanguage);
  const { selectedTranslatedLanguage } = useSelector(selectLanguage);
  const { showTranslatedTranscript } = useSelector(selectPlayer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (transcript.flagged) {
      setShowSuggestionTextbox(true);
    } else {
      setShowSuggestionTextbox(false);
    }
  }, [transcript.flagged]);

  const handleTranscriptClick = () => {
    if (!isAnyTranscriptflagged) {
      setAutoScroll(false);
      dispatch(setCurrentTime(transcript.startTime));
      setCurrentItemPosition(index);
      if (index == 0) {
        setAutoScroll(true);
        setShowResumeScrolling(false);
      }
    } else {
      setSnackMessage("Please complete the open suggestion");
      setIsSnackbarOpen(true);
    }
  };

  return (
    <Box
      className={styles.transcript_list_item}
      ref={listItem}
      sx={{
        minHeight: LIST_ITEM_HEIGHT,
        maxHeight: transcript.flagged ? "100%" : LIST_ITEM_HEIGHT,
      }}
    >
      {showFlagAndTime && (
        <>
          {transcript.flagged ? (
            <FlagIcon
              onClick={() => {
                handleflagging(transcript.timestamp);
                setCurrentItemPosition(activeItemIndex);
                if (
                  transcriptList.current.scrollTop ==
                  activeItemIndex * LIST_ITEM_HEIGHT
                ) {
                  setShowResumeScrolling(false);
                  setAutoScroll(true);
                }
              }}
            />
          ) : (
            <FlagOutlinedIcon
              data-testid="FlagOutlinedIcon"
              onClick={() => {
                if (!isAnyTranscriptflagged) {
                  handleflagging(transcript.timestamp);
                  setShowResumeScrolling(true);
                } else {
                  setSnackMessage("Please complete the open suggestion");
                  setIsSnackbarOpen(true);
                }
              }}
            />
          )}
          <Typography variant="body1" className={styles.transcript_time}>
            {transcript.timestamp}
          </Typography>
        </>
      )}
      <Box sx={{ width: "-webkit-fill-available" }}>
        <Box
          className={styles.transcript_content}
          onClick={() => {
            handleTranscriptClick();
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "row", gap: "8px" }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: 500 }}
            >{`${transcript?.speaker[selectedOriginalLanguage]}:`}</Typography>
            <Typography variant="body1">
              {transcript?.text[selectedOriginalLanguage]}
            </Typography>
          </Box>
          {showTranslatedTranscript && (
            <Box sx={{ display: "flex", flexDirection: "row", gap: "8px" }}>
              <Typography
                variant="body1"
                sx={{ fontWeight: 500 }}
              >{`${transcript?.speaker[selectedTranslatedLanguage]}:`}</Typography>
              <Typography variant="body1">
                {transcript?.text[selectedTranslatedLanguage]}
              </Typography>
            </Box>
          )}
        </Box>
        {showSuggestionTextbox && (
          <Box className={styles.suggestion_wrapper}>
            <Typography variant="body1">Suggested Translation :</Typography>
            <Box className={styles.suggestion_content}>
              <input
                type="text"
                name="suggestion_textbox"
                placeholder="Type here"
                onChange={(e) => setSuggestionText(e.target.value)}
                value={suggestionText}
              />
              <Button
                variant="contained"
                onClick={() => {
                  setSuggestionText("");
                  if (
                    transcriptList.current.scrollTop ==
                    activeItemIndex * LIST_ITEM_HEIGHT
                  ) {
                    handleflagging(transcript.timestamp);
                    setShowResumeScrolling(false);
                    setAutoScroll(true);
                  } else {
                    handleflagging(transcript.timestamp);
                    setCurrentItemPosition(activeItemIndex);
                  }
                }}
              >
                <CloseOutlinedIcon />
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  if (suggestionText) {
                    handleSubmitSuggestionText(
                      suggestionText,
                      transcript.timestamp,
                    );
                    if (
                      transcriptList.current.scrollTop ==
                      activeItemIndex * LIST_ITEM_HEIGHT
                    ) {
                      handleflagging(transcript.timestamp);
                      setShowResumeScrolling(false);
                      setAutoScroll(true);
                    } else {
                      handleflagging(transcript.timestamp);
                      setCurrentItemPosition(activeItemIndex);
                    }
                  } else {
                    setSnackMessage("cannot leave suggestion empty ");
                    setIsSnackbarOpen(true);
                  }
                }}
              >
                <CheckIcon />
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Dialogue;
