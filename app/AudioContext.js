"use client"
import React, { createContext, useContext, useState } from 'react';

const AudioContext = createContext();

export const useAudioContext = () => {
  return useContext(AudioContext);
};

export const AudioProvider = ({ children }) => {
  const [seekbarData, setSeekbarData] = useState(null);

  const updateSeekbarData = (data) => {
    setSeekbarData(data);
  };

  return (
    <AudioContext.Provider value={{ seekbarData, updateSeekbarData }}>
      {children}
    </AudioContext.Provider>
  );
};


