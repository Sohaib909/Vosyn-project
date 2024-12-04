import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectPlayer,
  setCaptionLanguage,
  setCaptionsEnabled,
  setHovering,
} from "@/reduxSlices/playerSlice";
// Correct import for Tooltip
import ClosedCaption from "@mui/icons-material/ClosedCaption";
import ClosedCaptionOffOutlined from "@mui/icons-material/ClosedCaptionOffOutlined";
import { Box, Tooltip, Typography } from "@mui/material";

import styles from "./CaptionButton.module.css";

const CaptionButton = () => {
  const dispatch = useDispatch();
  const { captionsEnabled } = useSelector(selectPlayer);
  const languageList = ["en", "fr", "es"];
  const [showCaption, setShowCaption] = useState(false);

  const mouseMoveTimer = useRef(null);

  const handleCaptionsToggle = () => {
    dispatch(setCaptionsEnabled(!captionsEnabled));

    if (!captionsEnabled) {
      setShowCaption(true);

      setTimeout(() => {
        setShowCaption(false);
      }, 3000);
    } else {
      // Close the popup immediately when captions are disabled
      setShowCaption(false);
    }
  };

  return (
    <Box
      onMouseEnter={() => {
        clearTimeout(mouseMoveTimer.current);
        dispatch(setHovering(true));
      }}
      onMouseLeave={() => {
        dispatch(setHovering(false));
      }}
      sx={{ display: "flex", flexDirection: "column", rowGap: "1rem" }}
    >
      <Tooltip title={captionsEnabled ? "Captions On" : "Captions Off"}>
        {captionsEnabled ? (
          <ClosedCaption
            onClick={handleCaptionsToggle}
            style={{ cursor: "pointer" }}
            id="controls-btn-captions"
          />
        ) : (
          <ClosedCaptionOffOutlined
            onClick={handleCaptionsToggle}
            style={{ cursor: "pointer" }}
            id="controls-btn-captions"
          />
        )}
      </Tooltip>

      {captionsEnabled && showCaption && (
        <Box className={styles.captionActive}>
          {languageList.length > 0 &&
            languageList.map((languageObj, index) => (
              <Typography
                variant="body2"
                key={index}
                sx={{
                  width: "fit-content",
                  //This is hardCoded data.
                  backgroundColor: "var(--mui-palette-primary-main)",
                  // This should be uncommented for the real data.
                  // backgroundColor:
                  //   selectedTrackIndex === languageObj?.streamInfo.index
                  //     ? "var(--mui-palette-primary-main)"
                  //     : "var(--mui-palette-neutral-500)",
                  borderRadius: "4px",
                  padding: "2px 15px",
                  "&:hover": {
                    backgroundColor: "var(--mui-palette-neutral-400)",
                  },
                  cursor: "pointer",
                }}
                onClick={() => {
                  dispatch(setCaptionLanguage(languageObj));
                  setShowCaption(false);
                }}
              >
                {languageObj}
              </Typography>
            ))}
        </Box>
      )}
    </Box>
  );
};

export default CaptionButton;
