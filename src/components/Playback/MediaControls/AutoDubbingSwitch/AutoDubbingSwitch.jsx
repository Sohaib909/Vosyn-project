import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { useMediaRef } from "@/contextProviders/MediaRefProvider";
import useStatusNotification from "@/hooks/useStatusNotification";
import { selectDashObject } from "@/reduxSlices/dashObjectSlice";
import TranslateRoundedIcon from "@mui/icons-material/TranslateRounded";
import { Box, FormControlLabel } from "@mui/material";

import AvailableLanguages from "./AvailableLanguages/AvailableLanguages";

import styles from "./AutodubbingSwitch.module.css";

const AutoDubbingSwitch = ({ languagesListRef }) => {
  const { setStatus } = useStatusNotification();
  const { mediaObj } = useSelector(selectDashObject);
  const mediaRef = useMediaRef();
  const player = useRef(null);
  const languageTimeout = useRef(null);

  const [autoDubbingEnabled, setAutoDubbingEnabled] = useState(false);
  const [showLanguagePopup, setShowLanguagePopup] = useState(false);
  const [changeLanguagePopup, setChangeLanguagePopup] = useState(false);
  // const [selectedLanguage, setSelectedLanguage] = useState();
  const [sliderVisible, setSliderVisible] = useState(false);

  // Initializes the video player and manages audio tracks
  useEffect(() => {
    return () => {
      if (player.current) {
        player.current.reset();
      }
    };
  }, [mediaObj, mediaRef, setStatus]);

  const handleToggleAutoDubbing = () => {
    setAutoDubbingEnabled(!autoDubbingEnabled);
    setSliderVisible(!sliderVisible);

    if (!autoDubbingEnabled) {
      setShowLanguagePopup(true);
    }
  };

  const handleChangeLanguage = () => {
    setChangeLanguagePopup(!changeLanguagePopup);
  };
  const handleMouseEnter = () => {
    clearTimeout(languageTimeout.current); // Clear the timeout when the mouse enters
  };

  const handleMenuClose = () => {
    languageTimeout.current = setTimeout(() => {
      setChangeLanguagePopup(false);
      setShowLanguagePopup(false);
    }, 3000);
  };

  return (
    <Box className={styles.autoDubbingContainer}>
      <FormControlLabel
        sx={{ margin: "0" }}
        control={
          <Box
            className={styles.switchIcon}
            onClick={() => {
              setShowLanguagePopup(true);
              handleToggleAutoDubbing();
              handleChangeLanguage();
            }}
          >
            <TranslateRoundedIcon sx={{ fontSize: "0.9 rem" }} />
          </Box>
        }
      />

      {autoDubbingEnabled && showLanguagePopup && (
        <Box
          className={styles.languagePopup}
          ref={languagesListRef}
          onMouseEnter={handleMouseEnter} // Prevent closing when mouse is over
          onMouseLeave={handleMenuClose}
        >
          {/* <Box
            sx={{
              width: "100%",
              display: "flex",
              columnGap: "2rem",
              justifyContent: "space-between",
            }}
          >
            <Typography>Live dubbing {selectedLanguage} </Typography>
            <Typography
              sx={{ color: "var(--mui-palette-neutral-300)" }}
              onClick={handleChangeLanguage}
            >
              Change
            </Typography>
          </Box> */}

          {/* This section shows up when "Change" is clicked */}
          {changeLanguagePopup && (
            <AvailableLanguages
              languageTimeout={languageTimeout}
              // languageList={audioTracks}
              // selectedTrackIndex={selectedTrackIndex}
              // handleAudioChange={handleAudioChange}
              setShowLanguagePopup={setShowLanguagePopup}
              // setSelectedLanguage={setSelectedLanguage}
              setChangeLanguagePopup={setChangeLanguagePopup}
            />
          )}
        </Box>
      )}
    </Box>
  );
};

export default AutoDubbingSwitch;
