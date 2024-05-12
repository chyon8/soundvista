"use client"

import React, { useState, useEffect } from "react";
import Filter from "@/components/Filter";
import Pagination from "@/components/Pagination";
import { useSearchParams } from 'next/navigation';
import Skeleton from "@/components/Skeleton";

const Dashboard = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || 1;
  const [params, setParams] = useState(page);
  const [data, setData] = useState(null);
  const [mood, ] = useState([
    'uplifting','nostalgic','cute','epic','rainy','happy','dramatic','tense','dark',
    'sad','inspiring', 'calm', 'atmospheric','sentimental','dreamy','chill'
  ]);
  const [genre, ] = useState([
    'lofi','hiphop','jazz','rnb','soul','disco','rock','indie','electronic','ballad',
    'pop','citypop','funk'
  ]);
 

  useEffect(() => {
    const getMusic = async () => {
      try {
        const response = await   fetch(`https://soundvista.vercel.app/api/Music?page=${params}`, {
         // fetch(`http://localhost:3000/api/Music?page=${params}`, {
          cache: "no-store",
        });
        
        const result = await response.json();
        setData(result);
       
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getMusic();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  



  if (!data?.music ) {
    return <Skeleton/>
    ;
  }


  const musics = data.music;

 


  return (
    <div className="p-8 max-sm:p-5">
      
      <div>
        <div className="p-8">
          <Filter total={data?.totalCount} filter_mood={mood} filter_genre={genre} allSongs={musics}></Filter>
          <Pagination page={data?.totalPages} now={data?.page}></Pagination>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
