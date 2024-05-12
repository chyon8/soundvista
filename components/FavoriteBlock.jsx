"use client"

import { useState,useEffect } from "react";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useSession } from "next-auth/react";



const FavoriteBlock = ({ id,userData }) => {

  const {  data: session, status:sessionStatus } = useSession();


  const [isFavorite, setIsFavorite] = useState(false);


 
/*
  
  useEffect(() => {
  
  

    if (sessionStatus !== "authenticated") {
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/getUserFavorites`, {});

        if (!response.ok) {
          console.error("Failed to fetch user data");
          return;
        }
        const userData = await response.json();
         setFavoritesArray(userData.user.favorites)

       
        
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (session?.user?.email) {
      fetchUserData();
    }
  }, []);




  useEffect(() => {

            
if(Object.keys(favoritesArray).includes(id)){
  setIsFavorite(true);
}
  
  }, [favoritesArray]);

*/


useEffect(() => {

//setFavoritesArray(userData)

if(userData && Object.keys(userData.favorites).includes(id)){
  setIsFavorite(true);
}

 }, [userData]);

 console.log(userData)


  const addToFavorite = async (e) => {
    
    e.stopPropagation();
      
    if (sessionStatus !== "authenticated") {
      return ;
    }
   
    setIsFavorite(!isFavorite);


    try {
      const response = await fetch(`/api/updateFavorite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          userEmail: session?.user?.email,
          isFavorite:!isFavorite
        })
      });

      if (!response.ok) {
        // Handle error
        console.error("Failed to update favorite status");
      }
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

  // Step 2: Update the UI based on the user's favorite status
  const heartIcon = isFavorite ? faHeart : faHeartRegular;

  return (
    <FontAwesomeIcon
      icon={heartIcon}
      className="hover:cursor-pointer hover:text-red-200"
      onClick={addToFavorite}
    />
  );
};

export default FavoriteBlock;
