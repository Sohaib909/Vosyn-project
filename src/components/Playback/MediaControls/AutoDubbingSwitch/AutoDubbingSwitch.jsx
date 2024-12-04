import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { useMediaRef } from "@/contextProviders/MediaRefProvider";
import useStatusNotification from "@/hooks/useStatusNotification";
import { selectDashObject } from "@/reduxSlices/dashObjectSlice";
import TranslateRoundedIcon from "@mui/icons-material/TranslateRounded";
import { Box, FormControlLabel, Switch, Typography } from "@mui/material";

// import dashjs from "dashjs";
import AvailableLanguages from "./AvailableLanguages/AvailableLanguages";

import styles from "./AutodubbingSwitch.module.css";

const AutoDubbingSwitch = ({ languagesListRef }) => {
  const { setStatus } = useStatusNotification();
  const { mediaObj } = useSelector(selectDashObject);
  const mediaRef = useMediaRef();
  const player = useRef(null);
  // const audioLangIndexRef = useRef(-1);
  // const audioLangRef = useRef(null);
  const languageTimeout = useRef(null);

  const [autoDubbingEnabled, setAutoDubbingEnabled] = useState(false);
  const [showLanguagePopup, setShowLanguagePopup] = useState(false);
  const [changeLanguagePopup, setChangeLanguagePopup] = useState(false);
  // const [audioTracks, setAudioTracks] = useState([]);
  // const [selectedTrackIndex, setSelectedTrackIndex] = useState(0);
  // const [trackSelectionDisplay, setTrackSelectionDisplay] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [sliderVisible, setSliderVisible] = useState(false);

  // Initializes the video player and manages audio tracks
  useEffect(() => {
    // player.current = dashjs.MediaPlayer().create();

    // player.current.initialize(
    //   mediaRef?.current,
    //   mediaObj?.file_stream_cdn_url,
    //   false,
    // );

    // player.current.on(dashjs.MediaPlayer.events.CAN_PLAY, () => {
    //   try {
    //     const tracks = player.current.getTracksFor("audio");
    //     setAudioTracks(tracks);
    //     // Set audio track
    //     if (tracks && tracks.length > 0) {
    //       const trackToSet =
    //         audioLangIndexRef.current === -1
    //           ? tracks[selectedTrackIndex]
    //           : tracks[audioLangIndexRef.current];
    //       player.current.setCurrentTrack(trackToSet);
    //     }

    //     // Set the language of the current audio track
    //     const displayLanguage =
    //       audioLangRef.current === null
    //         ? tracks[selectedTrackIndex].lang
    //         : audioLangRef.current;

    //     setTrackSelectionDisplay(displayLanguage);
    //   } catch (err) {
    //     setStatus(err, "error");
    //   }
    // });

    return () => {
      if (player.current) {
        player.current.reset();
      }
    };
  }, [mediaObj, mediaRef, setStatus]);

  // Switches to a new audio track, updates the UI, and handles playback transitions
  // const handleAudioChange = (langObj) => {
  //   const index = langObj.index - 1;

  //   if (player.current) {
  //     try {
  //       // Pause the video and show the spinner before changing the audio track - handle delays
  //       mediaRef.current.pause();

  //       const selectedTrack = audioTracks[index];

  //       if (!selectedTrack) {
  //         setStatus("Selected track not found", "error");
  //         return;
  //       }

  //       // Switch to the selected audio track
  //       player.current.setCurrentTrack(selectedTrack);

  //       // Update state and UI
  //       setSelectedTrackIndex(index);
  //       setSelectedLanguage(selectedTrack.lang);
  //       setTrackSelectionDisplay(selectedTrack.lang);

  //       // Store selected language and index for future reference
  //       audioLangRef.current = selectedTrack.lang;
  //       audioLangIndexRef.current = index;

  //       // Show a toast notification
  //       setStatus(`Audio is translated to ${selectedTrack.lang}`, "success");

  //       // Resume video playback and hide the spinner after the track is set
  //       mediaRef.current.play();
  //     } catch (error) {
  //       setStatus("Error occurred while changing audio track", "error");
  //     }
  //   }
  // };

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
          <Switch
            onMouseOver={() => autoDubbingEnabled && setShowLanguagePopup(true)}
            onMouseLeave={handleMenuClose}
            checked={autoDubbingEnabled}
            onChange={handleToggleAutoDubbing}
            icon={
              <Box className={styles.switchIcon}>
                <TranslateRoundedIcon sx={{ fontSize: "0.8rem" }} />
              </Box>
            }
            checkedIcon={
              <Box className={styles.switchIcon}>
                <TranslateRoundedIcon sx={{ fontSize: "0.8rem" }} />
              </Box>
            }
          />
        }
      />

      {autoDubbingEnabled && showLanguagePopup && (
        <Box
          className={styles.languagePopup}
          ref={languagesListRef}
          onMouseEnter={handleMouseEnter} // Prevent closing when mouse is over
          onMouseLeave={handleMenuClose}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              columnGap: "2rem",
              justifyContent: "space-between",
            }}
          >
            <Typography>Live dubbing in {selectedLanguage}</Typography>
            <Typography
              sx={{ color: "var(--mui-palette-neutral-300)" }}
              onClick={handleChangeLanguage}
            >
              Change
            </Typography>
          </Box>

          {/* This section shows up when "Change" is clicked */}
          {changeLanguagePopup && (
            <AvailableLanguages
              languageTimeout={languageTimeout}
              // languageList={audioTracks}
              // selectedTrackIndex={selectedTrackIndex}
              // handleAudioChange={handleAudioChange}
              setShowLanguagePopup={setShowLanguagePopup}
              setSelectedLanguage={setSelectedLanguage}
              setChangeLanguagePopup={setChangeLanguagePopup}
            />
          )}
        </Box>
      )}
    </Box>
  );
};

export default AutoDubbingSwitch;
