"use client"


import SeekBar from "./SeekBar";
import { useAudioContext } from "@/app/AudioContext";




const Footer = ({ audioFile}) => {
  const { seekbarData } = useAudioContext();




  





  return (
   


    <div className={`bg-black text-white p-5 ${seekbarData ? 'block' : 'hidden'}`}>

<SeekBar></SeekBar>




    </div>
    
  );
  
};

export default Footer;
