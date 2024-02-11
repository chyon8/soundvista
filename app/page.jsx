"use client"

import React, { useState } from "react";
import Filter from "@/components/Filter";
import Pagination from "@/components/Pagination";
import { useSearchParams } from 'next/navigation';

const Dashboard = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || 1;
  const [params, setParams] = useState(page);
  const [data, setData] = useState(null);

  const getMusic = () => {
    fetch(`https://soundvista.vercel.app/api/Music?page=${params}`, {
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
        console.log("Error loading music data: ", error);
      });
  };

  // Call getMusic when the component mounts or when params change
  getMusic();

  if (!data?.music) {
    return <p>loading..</p>;
  }

  const musics = data.music;

  const moodFilter = musics.map((music) => music.mood);
  const uniqueMoodArray = moodFilter.flat().filter((value, index, self) => self.indexOf(value) === index);

  const genreFilter = musics.map((music) => music.genre);
  const uniquegenreArray = genreFilter.flat().filter((value, index, self) => self.indexOf(value) === index);

  return (
    <div className="p-8">
      <div>
        <div className="p-8">
          <Filter filter_mood={uniqueMoodArray} filter_genre={uniquegenreArray} allSongs={musics}></Filter>
          <Pagination page={data?.totalPages} now={data?.page}></Pagination>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
