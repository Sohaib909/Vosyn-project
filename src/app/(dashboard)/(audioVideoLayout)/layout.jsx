import React from "react";

import { Button, Grid2 } from "@mui/material";

import CommentSection from "@/components/AudioVideoCommonComponents/CommentSection/CommentSection";
import MediaDistrubutor from "@/components/AudioVideoCommonComponents/MediaDistrubutor/MediaDistrubutor";
import SideDisplayContainer from "@/components/AudioVideoCommonComponents/SideDisplayContainer/SideDisplayContainer";
import VideoAudioActionButtons from "@/components/AudioVideoCommonComponents/VideoAudioActionButtons/VideoAudioActionButtons";
import VideoAudioAISummary from "@/components/AudioVideoCommonComponents/VideoAudioAISummary/VideoAudioAISummary";
import VideoAudioDescription from "@/components/AudioVideoCommonComponents/VideoAudioDescription/VideoAudioDescription";
import BackButton from "@/components/Buttons/BackButton/BackButton";
import TranslationPanel from "@/components/TranslationPanel/TranslationPanel";

const layout = ({ children }) => {
  return (
    <Grid2 container component="main" sx={{ px: "2rem" }} spacing={2}>
      <Grid2 item size={12}>
        <BackButton />
      </Grid2>

      <Grid2 item container size={12} spacing={4}>
        <Grid2
          item
          container
          spacing={4}
          size={{ xs: 12, sm: 12, md: 8, lg: 8, xl: 9 }}
        >
          <Grid2 item container size={12} spacing={2}>
            {children}

            <Grid2
              item
              container
              size={12}
              sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <MediaDistrubutor />
              <VideoAudioActionButtons />
            </Grid2>
          </Grid2>

          <VideoAudioAISummary />
          <VideoAudioDescription />
          <CommentSection />
        </Grid2>

        <Grid2
          container
          spacing={2}
          size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 3 }}
          sx={{ height: "fit-content" }}
        >
          <TranslationPanel>
            <Button
              variant="contained"
              sx={{
                background: "var(--mui-palette-primary-400)",
                "&:hover": {
                  background: "var(--mui-palette-primary-300)",
                },
              }}
            >
              Compare
            </Button>
          </TranslationPanel>

          {/** Make the rendering of playlist dynamic later on */}
          <SideDisplayContainer
            playlistId="ee5be34a-606c-4aca-8d35-1ee75c49007a"
            containerType="playlist"
          />
          <SideDisplayContainer />
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default layout;
