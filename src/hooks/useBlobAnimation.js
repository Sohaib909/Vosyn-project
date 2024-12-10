import { useAnimationControls } from "framer-motion";

export const useBlobAnimation = (isAirisOpen) => {
  const airisBlobControls = useAnimationControls();
  const searchbarControls = useAnimationControls();
  const titleControls = useAnimationControls();

  const animationVariants = {
    rotate: {
      rotate: 50,
      transition: { ease: "easeIn", duration: 1.2 },
    },
    translateY: {
      opacity: [1, 0],
      y: -530,
      transition: { ease: "easeIn", duration: 1.0 },
    },
    fadeOut: {
      opacity: [1, 0],
      transition: { delay: 0.5, ease: "easeIn", duration: 0.9 },
    },
    fadeIn: {
      opacity: [0, 1],
      transition: { delay: 0.2, ease: "easeOut", duration: 1.6 },
    },
    display: {
      opacity: [0, 1],
      transition: { duration: 0.01 },
    },
  };

  const rotateVariants = animationVariants.rotate;
  const translateYVariants = animationVariants.translateY;
  const fadeOutVariants = animationVariants.fadeOut;
  const fadeInVariants = animationVariants.fadeIn;
  const displayVariants = animationVariants.display;

  const startBlobAnimationSequence = async () => {
    try {
      await airisBlobControls.start(rotateVariants);
      await airisBlobControls.start(translateYVariants);
      if (isAirisOpen) {
        await searchbarControls.start(fadeOutVariants);
        await new Promise((resolve) => setTimeout(resolve, 600));
      }
    } catch (error) {
      // Temporary solution to avoid app crash when closing full sidebar during animation
      console.error(error);
    }
  };

  const startResultsBlockAnimationSequence = async () => {
    try {
      searchbarControls.start(fadeInVariants);
      titleControls.start(displayVariants);
    } catch (error) {
      // Temporary solution to avoid app crash when closing full sidebar during animation
      console.error(error);
    }
  };

  return {
    airisBlobControls,
    searchbarControls,
    titleControls,
    startBlobAnimationSequence,
    startResultsBlockAnimationSequence,
  };
};
