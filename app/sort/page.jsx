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

  const getMusic = useCallback(() => {
    fetch(`https://soundvista.vercel.app/api/Music/Sort?page=${params.page}&mood=${params.mood}&genre=${params.genre}`, {

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

  const moodFilter = musics.map((music) => music.mood);
  const uniqueMoodArray = moodFilter.flat().filter((value, index, self) => self.indexOf(value) === index);

  const genreFilter = musics.map((music) => music.genre);
  const uniquegenreArray = genreFilter.flat().filter((value, index, self) => self.indexOf(value) === index);

  return (
    <div className="p-8">
      <div>
        <div className="p-8">
          <Filter total={data?.totalCount} filter_mood={uniqueMoodArray} filter_genre={uniquegenreArray} allSongs={musics}></Filter>
          <Pagination page={data?.totalPages} now={data?.page}></Pagination>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
