import { useCallback, useEffect, useRef, useState } from "react";

export default function useDetectScroll(
  elementRef,
  initialIsScrollingUp = false,
) {
  const [isScrollingUp, setIsScrollingUp] = useState(initialIsScrollingUp);
  const ticking = useRef(false);
  const prevScrollTop = useRef(0);

  const checkScrollDirection = useCallback(() => {
    if (!elementRef.current) return;

    let currentScrollTop = elementRef.current.scrollTop;
    const threshold = 3;
    if (Math.abs(currentScrollTop - prevScrollTop.current) >= threshold) {
      setIsScrollingUp(currentScrollTop < prevScrollTop.current);
      prevScrollTop.current = Math.max(0, currentScrollTop);
    }
    ticking.current = false;
  }, [elementRef]);

  useEffect(() => {
    if (!elementRef.current) return;
    const scrolledElement = elementRef.current;

    prevScrollTop.current = scrolledElement.scrollTop;

    const handleOnScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(checkScrollDirection);
        ticking.current = true;
      }
    };

    scrolledElement.addEventListener("scroll", handleOnScroll);
    return () => {
      scrolledElement.removeEventListener("scroll", handleOnScroll);
    };
  }, [elementRef, checkScrollDirection]);

  return { isScrollingUp, setIsScrollingUp };
}
