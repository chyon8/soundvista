"use client"

import { useRef, useState } from "react";



const AudioControl =  () => {
 


    const seekBarInput = useRef(null)
   const [currentTime,setCurrentTime]= useState(seekBarInput.current)
 
  

  
 

   const handleSeek = (e) => {
    
    const audio= document.getElementById('music')


    //const newTime = (seekBarInput.current.value / 100) * audio.duration;
    const newTime = seekBarInput.current.value
 
   
    audio.currentTime=(newTime/100) * audio.duration

  

    //audioTag.current.currentTime = newTime;
    setCurrentTime(newTime);


    
  };



  
  
    return (
      <div className="flex w-full ">
    
    <input 
        className="w-full"
        type="range"
        id="seekbar"
        value={currentTime}
        min="0"
    
        max="100"
        step="1"
        onChange={handleSeek}
        ref={seekBarInput}
      />

      </div>
    );
  };


  




export default AudioControl;
