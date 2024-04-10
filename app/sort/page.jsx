"use client"

import React, { useState, useCallback } from "react";
import Filter from "@/components/Filter";
import Pagination from "@/components/Pagination";
import { useSearchParams } from 'next/navigation';
import Skeleton from "@/components/Skeleton";

const Dashboard = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || 1;
  const mood = searchParams.get('mood') || "";
  const genre = searchParams.get('genre') || "";
  const [params, setParams] = useState({ page, mood, genre });
  const [data, setData] = useState(null);
  const [moodFilter, ] = useState([
    'uplifting','nostalgic','cute','epic','rainy','happy','dramatic','tense','dark',
    'sad','inspiring', 'calm', 'atmospheric','sentimental','dreamy','chill'
  ]);
  const [genreFilter, ] = useState([
    'lofi','hiphop','jazz','rnb','soul','disco','rock','indie','electronic','ballad',
    'pop','citypop','funk'
  ]);

  const getMusic = useCallback(() => {
    fetch(`https://soundvista.vercel.app/api/Music/Sort?page=${params.page}&mood=${params.mood}&genre=${params.genre}`, {
     // fetch(`http://localhost:3000/api/Music/Sort?page=${params.page}&mood=${params.mood}&genre=${params.genre}`, {

      cache: "no-store",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch music data");
        }
        return res.json();
      })
      .then((result) => {
        setData(result);
      })
      .catch((error) => {
        console.error("Error loading music data:", error);
      });
  }, [params]);

  // Call getMusic whenever params change
  getMusic();

  if (!data?.music) {
    return <Skeleton/>;
  }

  const musics = data.music;

  
  return (
    <div className="p-8">
      <div>
        <div className="p-8">
          <Filter total={data?.totalCount} filter_mood={moodFilter} filter_genre={genreFilter} allSongs={musics}></Filter>
          <Pagination page={data?.totalPages} now={data?.page}></Pagination>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
