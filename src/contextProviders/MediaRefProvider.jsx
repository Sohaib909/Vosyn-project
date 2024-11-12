"use client";

import React, { createContext, useContext, useRef } from "react";

// Create the MediaContext
const MediaContext = createContext();

// Create a provider component
export const MediaProvider = ({ children }) => {
  const mediaRef = useRef(null); // Ref for the media element

  return (
    <MediaContext.Provider value={mediaRef}>{children}</MediaContext.Provider>
  );
};

// Custom hook to use the MediaContext
export const useMediaRef = () => useContext(MediaContext);
