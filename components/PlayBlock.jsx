
"use client"

import { faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState,useEffect } from "react";
import { useAudioContext } from "@/app/AudioContext";

const PlayBlock = () => {
 
  const [isPlaying, setIsPlaying] = useState(false);

 const { seekbarData } = useAudioContext();




useEffect(() => {
  setIsPlaying(seekbarData ? seekbarData.isPlaying : false);
}, [seekbarData]);

  const playMusic = async () => {
    try {
    
      const audioTag = document.getElementById('music')

      if (audioTag.src) {
        if (isPlaying) {
          audioTag.pause();
        } else {
          audioTag.play();

        }
        setIsPlaying(!isPlaying);
      }
    } catch (error) {
      console.error("Error playing/pausing audio:", error);
    }
  };
  return (
    <div>
   

      <FontAwesomeIcon
        icon={isPlaying ? faStop : faPlay}
        className="text-blue-400 hover:cursor-pointer hover:text-blue-200"
        onClick={playMusic}
      />
    </div>
  );
};

export default PlayBlock;

