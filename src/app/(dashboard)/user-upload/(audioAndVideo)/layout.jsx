import React from "react";

import data from "@/data/videos-new.json";
import { Button, Grid2, Typography } from "@mui/material";

import VideoAudioActionButtons from "@/components/AudioVideoCommonComponents/VideoAudioActionButtons/VideoAudioActionButtons";
import VideoAudioAISummary from "@/components/AudioVideoCommonComponents/VideoAudioAISummary/VideoAudioAISummary";
import TranslationPanel from "@/components/TranslationPanel/TranslationPanel";
import TranslationPanelFileUpload from "@/components/TranslationPanel/TranslationPanelFileUpload/TranslationPanelFileUpload";
import UploadAudioVideoTranscriptPanel from "@/components/UploadAudioVideoTranscriptPanel/UploadVideoPageTranscript/UploadAudioVideoTranscriptPanel";

const layout = ({ children }) => {
  return (
    <Grid2 container component="main" sx={{ px: "2rem" }} spacing={2}>
      <Grid2 item container size={12} spacing={4}>
        <Grid2
          item
          container
          spacing={2}
          size={{ xs: 12, sm: 12, md: 8, lg: 8, xl: 9 }}
        >
          <Grid2 item container size={12} spacing={2}>
            {children}
            <VideoAudioActionButtons />
            <Grid2
              item
              container
              size={12}
              sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
              {/* Title to replace by a component */}
              <Grid2>
                <Typography sx={{ fontSize: "1.5rem" }}>
                  {data.results[0].title_en}
                </Typography>

                <Typography
                  sx={{
                    fontSize: "0.7rem",
                    marginTop: ".5rem",
                    fontWeight: "400",
                  }}
                >
                  沈黙の危険 | クリント・スミス |テッド
                </Typography>
              </Grid2>
            </Grid2>
          </Grid2>
          <VideoAudioAISummary />
          <UploadAudioVideoTranscriptPanel />
        </Grid2>

        <Grid2
          container
          spacing={2}
          size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 3 }}
          sx={{ height: "fit-content" }}
        >
          <TranslationPanel>
            <TranslationPanelFileUpload mediaType={"audio/video"} />
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
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default layout;
