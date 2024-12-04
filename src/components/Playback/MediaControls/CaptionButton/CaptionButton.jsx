import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectPlayer,
  setCaptionLanguage,
  setCaptionsEnabled,
} from "@/reduxSlices/playerSlice";
// Correct import for Tooltip
import ClosedCaption from "@mui/icons-material/ClosedCaption";
import ClosedCaptionOffOutlined from "@mui/icons-material/ClosedCaptionOffOutlined";
import { Box, Tooltip, Typography } from "@mui/material";

import styles from "./CaptionButton.module.css";

const CaptionButton = () => {
  const dispatch = useDispatch();
  const { captionsEnabled, captionLanguage } = useSelector(selectPlayer);
  const languageList = ["en", "fr", "es"];
  const [showCaption, setShowCaption] = useState(false);

  let hideTimeout = null;

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

  const handleMouseEnter = () => {
    clearTimeout(hideTimeout);
    setShowCaption(true);
  };

  const handleMouseLeave = () => {
    hideTimeout = setTimeout(() => setShowCaption(false), 1000);
  };

  useEffect(() => {
    return () => clearTimeout(hideTimeout); // Cleanup on component unmount
  }, []);

  return (
    <Box
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{ display: "flex", flexDirection: "column", rowGap: "1rem" }}
    >
      {!captionsEnabled ? (
        <Tooltip title="Captions Off">
          <ClosedCaptionOffOutlined
            onClick={handleCaptionsToggle}
            style={{ cursor: "pointer" }}
            id="controls-btn-captions"
          />
        </Tooltip>
      ) : (
        <ClosedCaption
          onClick={handleCaptionsToggle}
          style={{ cursor: "pointer" }}
          id="controls-btn-captions"
        />
      )}
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
                  backgroundColor:
                    captionLanguage === languageObj
                      ? "var(--mui-palette-primary-main)"
                      : "var(--mui-palette-neutral-500)",
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
