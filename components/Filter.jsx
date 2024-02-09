"use client"

import { useState } from "react";
import MusicList from "./MusicList";
import Tabs from "./Tabs";



const Filter = ({filter_mood,filter_genre, allSongs}) => {
  
const [selectedMood, setSelectedMood] = useState('');
const [selectedGenre, setSelectedGenre] = useState('');
  const [filteredSongs, setFilteredSongs] = useState(allSongs);

  const filterSongs = () => {
    // Filter the songs based on selected mood and genre
    const filteredSongs = allSongs.filter((song) => {
      const isMoodMatch = selectedMood === '' || song.mood.includes(selectedMood);
      const isGenreMatch = selectedGenre === '' || song.genre.includes(selectedGenre);
      return isMoodMatch && isGenreMatch;
    });

    // Handle filteredSongs as needed (e.g., pass it to another component)
    setFilteredSongs(filteredSongs);
  };


  const resetFilter = async () => {
    // Reset the filter by clearing the selected mood and genre
    setSelectedMood('');
    setSelectedGenre('');
    // Clear the filteredSongs state
    setFilteredSongs(allSongs);
  };



  




  return (


    <div className="main-body">

<Tabs/>


   <div className="filter-container">
   
   
   <label className=" max-sm:flex"  htmlFor="mood">Mood: </label>

   <select id="mood" onChange={(e)=>setSelectedMood(e.target.value)} value={selectedMood} >
     <option value="" disabled selected>
       Select Mood
     </option>
     {filter_mood.map((mood, index) => (
          <option key={index} value={mood}>
            {mood}
          </option>
        ))}
  
   </select>


   <label className="max-sm:flex" htmlFor="genre">Genre:</label>
   
   <select id="genre" onChange={(e)=> setSelectedGenre(e.target.value)} value={selectedGenre}>
     <option value="" disabled selected>
       Select Genre
     </option>
     {filter_genre.map((genre, index) => (
          <option key={index} value={genre}>
            {genre}
          </option>
        ))}
  
   </select>
   

<div className="button-container flex">
<button onClick={filterSongs}
    className="flex mt-3 ml-2">Apply</button>

<button onClick={resetFilter}
    className="flex mt-3 ml-2">Reset</button>
</div>




</div>


<div className="music-list mt-5">
{filteredSongs.length > 0 ? (
          filteredSongs.map((music) => <MusicList key={music._id} music={music} />)
        ) : (
          <p>No matching songs found.</p>
        )}
     
</div>



    </div>
    
  );
};

export default Filter;
