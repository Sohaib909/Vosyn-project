"use client";

import React, { useEffect, useState } from "react";

import { Box } from "@mui/material";
import Image from "next/image";

import Summary from "@/components/Summary/Summary";
import TextAndImageActionBtns from "@/components/TextAndImageActionBtns/TextAndImageActionBtns";
import TranslationPanel from "@/components/TranslationPanel/TranslationPanel";
import TranslationPanelFileUpload from "@/components/TranslationPanel/TranslationPanelFileUpload/TranslationPanelFileUpload";
import TranslationSlider from "@/components/TranslationPanel/TranslationPanelToggle/TranslationPanelToggle";

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

  const handleTranslation = () => {
    if (image) {
      setImage({
        ...image,
        current:
          image.current === image.translated
            ? image.original
            : image.translated,
      });
    }
  };

  return (
    <Box
      display="flex"
      alignItems="start"
      justifyContent="space-between"
      flexDirection="row"
      paddingTop="var(--mui-spacing-4)"
      width={"100%"}
    >
      <Box display="flex" flexDirection="column" flex="1">
        <Box display="flex" flexDirection="column" justifyContent="flex-end">
          {image && (
            <TextAndImageActionBtns
              showRate={true}
              fileUrl={image.translated}
            />
          )}
        </Box>
        <Box
          display="flex"
          flex="1"
          minHeight="70%"
          justifyContent="center"
          mt="1rem"
          sx={{
            border: "2px solid var(--mui-palette-neutral-25)",
            p: 8,
            borderRadius: "1rem",
          }}
        >
          <Box>
            {image && <Image src={image.current} alt="uploaded image" />}
          </Box>
        </Box>
      </Box>

      <Box maxWidth="350px" m="0 0 0 2rem">
        {image && (
          <TranslationPanel fileUrl={image.translated}>
            <TranslationPanelFileUpload mediaType={"image"} />
            <TranslationSlider handleTranslation={handleTranslation} />
          </TranslationPanel>
        )}
        {/* Uncomment once ContextualInfo and Summary are migrated over */}
        {/* <Box className="contextual-info-wrapper">
            <ContextualInfo />
        </Box> */}

        {image && image.current === image.translated && (
          <Box width="100%">
            <Summary summary={`The Gold Dragon`} title="Image Description" />
          </Box>
        )}

        {/* <Box width="100%" m={isMobile && "1rem 0"}>
          <Summary
            summary={`Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`}
            title="Image Description"
          />
        </Box> */}
      </Box>
    </Box>
  );
};

export default ImagePage;
