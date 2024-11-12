import { useEffect } from "react";

const useKeyboardControls = (
  mediaRef,
  togglePlayPause = () => {},
  handleTimeUpdate = () => {},
) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      const activeElement = document.activeElement;
      const media = mediaRef.current;

      // Ignore key events if the focus is on an input (excluding range inputs)
      if (
        activeElement.tagName.toLowerCase() === "input" &&
        activeElement.type !== "range"
      ) {
        return;
      }

      if (!media) return;

      switch (event.key) {
        case "k": // Toggle play/pause
        case " ":
          event.preventDefault();
          togglePlayPause();
          break;

        case "j": // Rewind by 10 seconds
          event.preventDefault();
          handleTimeUpdate(mediaRef?.current?.currentTime - 10);
          break;

        case "l": // Fast forward by 10 seconds
          event.preventDefault();
          handleTimeUpdate(mediaRef?.current?.currentTime + 10);
          break;

        case "ArrowRight": // Skip forward by 5 seconds
          event.preventDefault();
          handleTimeUpdate(mediaRef?.current?.currentTime + 10);
          break;

        case "ArrowLeft": // Rewind by 5 seconds
          event.preventDefault();
          handleTimeUpdate(mediaRef?.current?.currentTime - 10);
          break;

        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mediaRef, togglePlayPause, handleTimeUpdate]);
};

export default useKeyboardControls;
