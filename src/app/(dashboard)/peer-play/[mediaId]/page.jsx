import React from "react";

import { Grid2 } from "@mui/material";

import MediaDistrubutor from "@/components/AudioVideoCommonComponents/MediaDistrubutor/MediaDistrubutor";
import BackButton from "@/components/Buttons/BackButton/BackButton";
import ChatBox from "@/components/ChatBox/ChatBox";
import Playback from "@/components/Playback/Playback";
import TranslationPanel from "@/components/TranslationPanel/TranslationPanel";

const PeerPlay = ({ params }) => {
  const { mediaId } = params;

  return (
    <Grid2 container component="main" sx={{ px: "2rem" }} spacing={2}>
      <Grid2 size={12}>
        <BackButton />
      </Grid2>

      <Grid2 container size={12} spacing={4}>
        <Grid2
          container
          spacing={4}
          size={{ xs: 12, sm: 12, md: 8, lg: 8, xl: 9 }}
        >
          <Grid2 container size={12} spacing={2}>
            <Playback id={mediaId} type="video" />
            <MediaDistrubutor />
          </Grid2>
        </Grid2>

        <Grid2
          container
          size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 3 }}
          spacing={2}
        >
          <TranslationPanel />
          <ChatBox />
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default PeerPlay;
