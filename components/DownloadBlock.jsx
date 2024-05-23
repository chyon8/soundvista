"use client"

import { useState,useEffect } from "react";
import { faDownload,faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const DownloadBlock = ({ id,audioFileTitle,userData }) => {

  const {  data: session, status:sessionStatus } = useSession();
  const [isDownload, setIsDownload] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
const router = useRouter()

useEffect(() => {

 setIsSubscribed(session?.user?.subscribed)

  if(userData && Object.keys(userData.downloads).includes(id)){
    setIsDownload(true);
  }
  
   }, [userData]);
  

  const addToDownload = async (e) => {
    e.stopPropagation();

    
    
    if (sessionStatus !== "authenticated") {
      return;
    }


    if (!isSubscribed) {

        console.log("User is not subscribed. Download is not allowed.");
        router.replace('/access')
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


  return (
    <>
    {isSubscribed ?(<FontAwesomeIcon
      icon={isDownload ?faCheck  :faDownload}
      className="hover:cursor-pointer hover:text-red-200"
      onClick={addToDownload}
    />):(   <Link style={{marginTop:'-5px'}} href={'/access'}>
    <FontAwesomeIcon
      icon={isDownload ?faCheck  :faDownload}
      className="hover:cursor-pointer hover:text-red-200"
      onClick={addToDownload}
    />
    </Link>)}
    </>
 
  );
};

export default DownloadBlock;
