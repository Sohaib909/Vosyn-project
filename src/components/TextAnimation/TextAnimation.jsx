"use client";

import React, { useEffect, useRef } from "react";

import { Box } from "@mui/material";

import "./TextAnimation.css";

const anminatedTexts = [
  "In your language... ",
  "en tu idioma...     ",
  "Dans votre langue...",
];

const TextScramble = ({ phrases }) => {
  const el = useRef(null);
  const scrambleQueue = useRef([]);
  const frameRequest = useRef(null);

  const chars = "!<>-_/[]{}—=+?#_";
  // const chars = "Vosyn";

  const randomChar = () => chars[Math.floor(Math.random() * chars.length)];

  const scrambleText = (oldText, newText) => {
    const length = Math.max(oldText.length, newText.length);
    scrambleQueue.current = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * 200);
      const end = start + Math.floor(Math.random() * 200);
      scrambleQueue.current.push({ from, to, start, end, char: null });
    }
  };

  const updateText = (frame, resolve) => {
    let output = "";
    let complete = 0;

    for (let i = 0; i < scrambleQueue.current.length; i++) {
      let { from, to, start, end, char } = scrambleQueue.current[i];
      if (frame >= end) {
        complete++;
        output += to;
      } else if (frame >= start) {
        if (!char || Math.random() < 0.001) {
          char = randomChar();
          scrambleQueue.current[i].char = char;
        }
        output += `<span style="opacity: 0.5;">${char}</span>`;
      } else {
        output += from;
      }
    }

    if (el.current) el.current.innerHTML = output;

    if (complete === scrambleQueue.current.length) {
      resolve();
    } else {
      frameRequest.current = requestAnimationFrame(() =>
        updateText(frame + 1, resolve),
      );
    }
  };

  const setText = (newText) => {
    const oldText = el.current ? el.current.innerText : "";
    const promise = new Promise((resolve) => {
      scrambleText(oldText, newText);
      frameRequest.current = requestAnimationFrame(() =>
        updateText(0, resolve),
      );
    });
    return promise;
  };

  useEffect(() => {
    let counter = 0;

    const next = () => {
      setText(phrases[counter]).then(() => {
        setTimeout(next, 6000);
      });
      counter = (counter + 1) % phrases.length;
    };

    next();

    return () => {
      if (frameRequest.current) {
        cancelAnimationFrame(frameRequest.current);
      }
    };
  }, [phrases]);

  return (
    <Box sx={{ display: "inline" }}>
      <span ref={el} class="text-gradient" />
    </Box>
  );
};

const TextAnimation = () => {
  return <TextScramble phrases={anminatedTexts} />;
};

export default TextAnimation;
