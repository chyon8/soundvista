"use client"

import { useState,useEffect } from "react";
import { faDownload,faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const DownloadBlock = ({ id,audioFileTitle,userData }) => {

  const {  data: session, status:sessionStatus } = useSession();
  const [isDownload, setIsDownload] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
const router = useRouter()

useEffect(() => {

  
  if(userData && Object.keys(userData.downloads).includes(id)){
    setIsFavorite(true);
  }
  
   }, [userData]);
  

  const addToDownload = async (e) => {
    e.stopPropagation();

    
    
    if (sessionStatus !== "authenticated") {
      return;
    }


    if (!isSubscribed) {

        console.log("User is not subscribed. Download is not allowed.");
        router.push('/access')
        return;
      }

   

    setIsDownload(!isDownload);

    try {
     
      const response = await fetch(`/api/updateDownload`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          audioFileTitle,
          userEmail: session?.user?.email,
          isDownload:!isDownload
        })
      });
    

      if (!response.ok) {
        // Handle error
        console.error("Failed to update download status");
      } 
      else{
        response.json().then((data)=>{
           
          window.open(data.generatedUrl,'_blank');

       


        })
      }
    } catch (error) {
      console.error("Error updating download status:", error);
    }

    
  };



  // Step 2: Update the UI based on the user's favorite status

//icon={isFavorite ? faHeart : faHeartRegular}
  return (
    <FontAwesomeIcon
      icon={isDownload ?faCheck  :faDownload}
      className="hover:cursor-pointer hover:text-red-200"
      onClick={addToDownload}
    />
  );
};

export default DownloadBlock;
