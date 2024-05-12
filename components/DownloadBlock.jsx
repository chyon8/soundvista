"use client"

import { useState,useEffect } from "react";
import { faDownload,faCheck } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useSession } from "next-auth/react";


const DownloadBlock = ({ id,audioFileTitle,userData }) => {

  const {  data: session, status:sessionStatus } = useSession();


  const [isDownload, setIsDownload] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

/*
  useEffect(() => {

    if (sessionStatus !== "authenticated") {
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/getUserFavorites`, {
        
        });

        if (!response.ok) {
          // Handle error
          console.error("Failed to fetch user data");
          return;
        }

        const userData = await response.json();
    
        const downloadsArray = userData.user.downloads || [];

        const userSubStatus=userData.user.subscribed
        

        // Update the UI based on whether the music id is in the favorites array
        setIsDownload(Object.keys(downloadsArray).includes(id));
        setIsSubscribed(userSubStatus)
        
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Fetch user data when the component mounts or when the session changes
    if (session?.user?.email) {
      fetchUserData();
    }
  }, [id, session]);

*/


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
        // User is not subscribed, handle accordingly (e.g., show a message)
        console.log("User is not subscribed. Download is not allowed.");
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
