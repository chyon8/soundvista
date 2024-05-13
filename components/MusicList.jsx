"use client"


import FavoriteBlock from "./FavoriteBlock";
import { useAudioContext } from "@/app/AudioContext";
import { useState } from "react";
import DownloadBlock from "./DownloadBlock";
import Image from "next/image";


const MusicList = ({ music,userData }) => {

  const { updateSeekbarData } = useAudioContext();
  const [isPlaying, setIsPlaying] = useState(false);


  const handleClick = async () => {
  try{
  
    setIsPlaying(!isPlaying)

    updateSeekbarData({
      artwork: music.artwork,
      title: music.title,
      audiofile: music.audiofile,
      duration: music.duration,
      isPlaying:!isPlaying
      // Add any other data you want to pass to Seekbar
    });



  }catch(error){
    console.error("Error playing/pausing audio:", error);
  }
  };


  return (
    <div onClick={handleClick} className="flex mb-4 flex-col hover:bg-card-hover bg-card rounded-md shadow-lg p-3 m-2">
      <div className="flex mt-1 ">

        <Image className="w-9 h-9" src={`https://source.unsplash.com/${music.artwork}`} alt="thumbnail" width={9} height={9} />

<div className="ml-4 mt-2 w-1/6 flex ">
        <p className="mr-3  whitespace-nowrap overflow-hidden text-ellipsis ">{music.title}</p>   
</div>


<p className="ml-3 mt-2 w-1/6 overflow-hidden ">{music.duration}</p>


<p className="ml-3 mt-2 w-1/6 overflow-hidden whitespace-nowrap max-sm:hidden">{music.genre.join(', ')}</p>

<p className="ml-5 mt-2 w-1/6 overflow-hidden whitespace-nowrap max-sm:hidden">{music.mood.join(', ')}</p>


        <div className="ml-auto mt-2 flex overflow-hidden">

<div className="flex"> <FavoriteBlock userData={userData} id={music._id}></FavoriteBlock></div>
   

<div className="ml-5 flex "><DownloadBlock userData={userData} id={music._id} audioFileTitle={music.audiofile} ></DownloadBlock></div>
    
        </div>




      </div>
  

  





    </div>
  );
};



export default MusicList;
