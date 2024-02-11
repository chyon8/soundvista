
"use client"

import Filter from "@/components/Filter";
import Pagination from "@/components/Pagination";
import { useSearchParams } from 'next/navigation'
import { useState } from "react";



  

const Dashboard = async () => {

    
    const searchParams = useSearchParams()
    const page = searchParams.get('page') || 1
    const mood = searchParams.get('mood') || ""
    const genre = searchParams.get('genre') || ""
    const [params,setParams]= useState({page:page,mood:mood,genre:genre})
    console.log(params)
   
   
const getMusic = async () => {
    try {
   


      const res = await fetch(`https://soundvista.vercel.app/api/Music/Sort?page=${params.page}&mood=${params.mood}&genre=${params.genre}`, {

    
        cache: "no-store",
        
     
      });
  
      if (!res.ok) {
        throw new Error("Failed to fetch topics");
      }
  
      return res.json();
   
    } catch (error) {
      console.log("Error loadinag topics: ", error);
    }

  };


  const data = await getMusic();


  if (!data?.music) {
    return <p>No music.</p>;
  }

  const musics = data.music;


  const moodFilter = musics.map((music=>
  music.mood))

  const uniqueMoodArray = moodFilter.flat().filter((value, index, self) => self.indexOf(value) === index);




  const genreFilter = musics.map((music=>
  music.genre))

  const uniquegenreArray = genreFilter.flat().filter((value, index, self) => self.indexOf(value) === index);




  return (


    
    <div className="p-8">
      


    
      <div>

<div className="p-8">




<Filter filter_mood={uniqueMoodArray} filter_genre={uniquegenreArray} allSongs={musics}  ></Filter>

<Pagination page={data?.totalPages} now={data?.page}  ></Pagination>   





</div>
       

              </div>

           


             
            </div>



          )
 
 
};

export default Dashboard;




