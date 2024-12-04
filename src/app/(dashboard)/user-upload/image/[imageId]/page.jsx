"use client";

import React, { useEffect, useState } from "react";

import TranslateIcon from "@mui/icons-material/Translate";
import { Box, Button, Grid2 } from "@mui/material";
import Image from "next/image";

import ContextualInfo from "@/components/AudioVideoCommonComponents/ContextualInfo/ContextualInfo";
import Summary from "@/components/Summary/Summary";
import TextAndImageActionBtns from "@/components/TextAndImageActionBtns/TextAndImageActionBtns";
import TranslationPanel from "@/components/TranslationPanel/TranslationPanel";
import TranslationPanelFileUpload from "@/components/TranslationPanel/TranslationPanelFileUpload/TranslationPanelFileUpload";

import Original from "../../../../../../public/mediaFiles/Images/Original.png";
import Translated from "../../../../../../public/mediaFiles/Images/Translated.png";

const ImagePage = () => {
  const [image, setImage] = useState(null); // Default to null or loading image

  useEffect(() => {
    // Simulate fetching the original and translated images from an API
    const fetchImages = async () => {
      const originalImage = Original;

      const translatedImage = Translated;

      // Simulate async API call delay
      setTimeout(() => {
        setImage({
          original: originalImage,
          translated: translatedImage,
          current: translatedImage, // Initially show the translated image
        });
      }, 900); // Mock delay
    };

    fetchImages();
  }, []);

  return (
    <Grid2 item container size={12} spacing={4}>
      <Grid2
        item
        container
        spacing={4}
        size={{ xs: 12, sm: 12, md: 8, lg: 8, xl: 9 }}
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignContent: "flex-start",
        }}
      >
        <Box>{image && <TextAndImageActionBtns isImage={"image"} />}</Box>
        <Box
          sx={{
            mb: 4,
            p: "2.5rem",
            border: "1px solid var(--mui-palette-neutral-50)",
            borderRadius: "12px",
            color: "var(--mui-palette-common-white)",
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {image && <Image src={image.current} alt="uploaded image" />}
        </Box>
      </Grid2>

      <Grid2
        container
        spacing={2}
        size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 3 }}
        sx={{ height: "fit-content", gap: "2rem" }}
      >
        <TranslationPanel>
          <TranslationPanelFileUpload mediaType={"text"} />
          <Button
            variant="contained"
            sx={{
              marginTop: "7px",
              background: "var(--mui-palette-primary-400)",
              "&:hover": {
                background: "var(--mui-palette-primary-300)",
              },
            }}
            startIcon={<TranslateIcon />}
          >
            Translate
          </Button>
        </TranslationPanel>
        <Box sx={{ width: "100%", borderRadius: "12px" }}>
          <ContextualInfo />
        </Box>
        {image && image.current === image.translated && (
          <Box width="100%">
            <Summary
              summary={{ en: "The Gold Dragon", fr: "LE DRAGON D'OR" }}
              title="Translation"
            />
          </Box>
        )}

        <Box width="100%">
          <Summary
            summary={{
              en: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
            }}
            title="Image Description"
          />
        </Box>
      </Grid2>
    </Grid2>
  );
};

export default ImagePage;
