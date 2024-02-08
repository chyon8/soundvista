"use client"

import { useRef, useState } from "react";



const VolumeControl =  () => {


   const volumeSlider = useRef(null)
   const [volume,setVolume]= useState(volumeSlider.current)
 
  

  
 


  const handleVolume = (e) => {
    
  const audio= document.getElementById('music')
    const newVolume = volumeSlider.current.value ;
    audio.volume=newVolume/100
    //volumeSlider.current.value = newVolume;
    //audioTag.current.volume = newVolume/100;
    setVolume(newVolume);
    
    
  };


  
  
    return (
      <div className="flex ">
    
<input 
        className="w-full"
        type="range"  
        value={volume}
        min="0"
        max="100"
        step="1"
        onChange={handleVolume}
        ref={volumeSlider}
      />

      </div>
    );
  };


  




export default VolumeControl;
