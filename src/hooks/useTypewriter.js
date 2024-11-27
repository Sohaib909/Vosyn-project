import { useEffect, useState } from "react";

export default function useTypewriter(
  inputText,
  startTypewriter = true,
  disableTypewriterStart = false,
  step = 5,
) {
  const [outputText, setOutputText] = useState("\u00A0");
  const [isFinishedTyping, setIsFinishedTyping] = useState(
    disableTypewriterStart,
  );

  useEffect(() => {
    if (isFinishedTyping) {
      setOutputText(inputText);
      return;
    }

    if (!inputText) {
      setOutputText("\u00A0"); // Reset to a blank space if no input
      return;
    }

    if (!startTypewriter) return;

    let typewriterIdx = step > inputText.length ? inputText.length : step;
    let typewriterTimeout;
    function updateTypewriter() {
      setOutputText(inputText.slice(0, typewriterIdx));

      if (typewriterIdx === inputText.length) {
        setIsFinishedTyping(true);
      } else {
        const nextIdx = typewriterIdx + step;
        typewriterIdx = nextIdx > inputText.length ? inputText.length : nextIdx;
        typewriterTimeout = setTimeout(updateTypewriter, 16);
      }
    }

    typewriterTimeout = setTimeout(updateTypewriter, 16);

    return () => {
      if (typewriterTimeout) {
        clearTimeout(typewriterTimeout);
      }
    };
  }, [
    isFinishedTyping,
    startTypewriter,
    inputText,
    step,
    setOutputText,
    setIsFinishedTyping,
  ]);

  return { outputText, isFinishedTyping };
}
