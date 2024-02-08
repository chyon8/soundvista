"use client"

import { useRef } from "react";
import { useAudioContext } from "@/app/AudioContext";
import PlayBlock from "./PlayBlock";
import VolumeControl from "./VolumeControl";
import AudioControl from "./AudioControl";

const SeekBar =  () => {

   const audioTag = useRef(null);
   



  
   
 
   const { seekbarData } = useAudioContext();






 
const audiofile = seekbarData ? seekbarData.audiofile : null;
const isPlaying = seekbarData ? seekbarData.isPlaying : null;






if (audiofile) {
    if (!isPlaying) {
      
        audioTag.current.pause();
       

       
        
    
      } else {
          audioTag.current.src = `https://soundvista-project.s3.ap-northeast-2.amazonaws.com/${audiofile}.mp3`;
     audioTag.current.play();
   
  
      }
  
}



const timeUpdate =(e)=>{
  e.preventDefault
  const seekBar= document.getElementById('seekbar')
  seekBar.value= (audioTag.current.currentTime/audioTag.current.duration) *100
  // seekBarInput.current.value= (audioTag.current.currentTime/audioTag.current.duration) *100
}









  
  
    return (
      <div className="flex ">
       
      
       <img className="w-9 h-9" src={seekbarData ? `https://source.unsplash.com/${seekbarData.artwork}` : "No image"} alt="" />


        <div className="ml-4 mt-2 w-1/6 flex ">
        <p className="mr-3 w-12 whitespace-nowrap overflow-hidden text-ellipsis "> {seekbarData ? seekbarData.title : "example"}</p>  
        <PlayBlock audiofile={audiofile} ></PlayBlock>
        </div>
   
  <div className="ml-3 mt-2.5 mr-3 ">
        <p className="" > {seekbarData ? seekbarData.duration : ""}</p>
    </div>
 
  <AudioControl/>
  
<VolumeControl/>





  <audio
        preload="auto"
        id="music"
        ref={audioTag}
     onTimeUpdate={timeUpdate}
      ></audio>

      </div>
    );
  };


  




export default SeekBar;

