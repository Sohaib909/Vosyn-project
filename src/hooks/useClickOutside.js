import { useEffect, useRef, useState } from "react";

export default function useClickOutside(
  initialIsVisible = false,
  enableEscapeHide = true,
) {
  const [isVisible, setIsVisible] = useState(initialIsVisible);
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsVisible(false);
    }
  };

  const handleHideOnEscape = (event) => {
    if (event.key === "Escape") {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    if (enableEscapeHide) {
      document.addEventListener("keydown", handleHideOnEscape);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
      if (enableEscapeHide) {
        document.removeEventListener("keydown", handleHideOnEscape);
      }
    };
  }, [enableEscapeHide]);

  return { ref, isVisible, setIsVisible };
}
