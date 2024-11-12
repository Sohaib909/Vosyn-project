import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { useMediaRef } from "@/contextProviders/MediaRefProvider";
import { selectPlayer, setCurrentTime } from "@/reduxSlices/playerSlice";
import Forward10RoundedIcon from "@mui/icons-material/Forward10Rounded";
import Replay10RoundedIcon from "@mui/icons-material/Replay10Rounded";
import { Grid2 } from "@mui/material";

import PlaybackButtons from "../../PlaybackButtons/PlaybackButtons";

const SkipButtons = () => {
  const { currentTime } = useSelector(selectPlayer);
  const dispatch = useDispatch();

  const mediaRef = useMediaRef();

  const handleRewind = () => {
    const newTime = Math.max(0, currentTime - 10);
    dispatch(setCurrentTime(newTime));
    mediaRef.current.currentTime = newTime;
  };

  const handleForward = () => {
    const newTime = Math.min(mediaRef.current.duration, currentTime + 10);
    dispatch(setCurrentTime(newTime));
    mediaRef.current.currentTime = newTime;
  };

  return (
    <>
      <Grid2 item size={3} sx={{ width: "fit-content" }}>
        <PlaybackButtons Icon={Replay10RoundedIcon} onClick={handleRewind} />
      </Grid2>

      <Grid2 item size={3} sx={{ width: "fit-content" }}>
        <PlaybackButtons Icon={Forward10RoundedIcon} onClick={handleForward} />
      </Grid2>
    </>
  );
};

export default SkipButtons;
