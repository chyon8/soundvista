"use client"

import { useState,useEffect } from "react";
import MusicList from "./MusicList";
import Tabs from "./Tabs";







const Filter =  ({filter_mood,filter_genre, allSongs,total}) => {

  
const [selectedMood, setSelectedMood] = useState('');
const [selectedGenre, setSelectedGenre] = useState('');
const [filteredSongs, setFilteredSongs] = useState(allSongs);
const [userData,setUserData]= useState(null)
/*
  const filterSongs = () => {




console.log(selectedMood)

console.log(selectedGenre)
   

  
 

    // Handle filteredSongs as needed (e.g., pass it to another component)
    setFilteredSongs(filteredSongs);
  };
*/

/*
  const resetFilter = async () => {
    // Reset the filter by clearing the selected mood and genre
    setSelectedMood('');
    setSelectedGenre('');
    // Clear the filteredSongs state
    setFilteredSongs(allSongs);
  };

*/

  

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(`/api/getUserFavorites`);
      const result = await response.json();
      setUserData(result.user);
      
  
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();

}, []);



  return (


    <div className="main-body">

<Tabs/>


   <div className="filter-container">
   
   
   <label className=" max-sm:flex"  htmlFor="mood">Mood: </label>

   <select style={{border:'1px solid #343434', borderRadius:'16px'}} id="mood" onChange={(e)=>setSelectedMood(e.target.value)} value={selectedMood} >
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
   
   <select style={{border:'1px solid #343434', borderRadius:'16px'}} id="genre" onChange={(e)=> setSelectedGenre(e.target.value)} value={selectedGenre}>
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

  <div  className='mt-3' style={{border:'1px solid #343434 ', borderRadius:'16px'}}>
<a className='p-4' href={`/sort?mood=${selectedMood}&genre=${selectedGenre}`} 
    >Apply</a>
</div>
<div  className='mt-3 ml-2' style={{border:'1px solid #343434 ', borderRadius:'16px'}}>
<a className="p-4" href="/"
  >Reset</a>
    </div>
</div>




</div>

<br />
<p className="text-slate-500">Total: {total}</p> 
<div className="music-list mt-5">
{filteredSongs.length > 0 ? (
          filteredSongs.map((music) => <MusicList userData={userData} key={music._id} music={music} />)
        ) : (
          <p>No matching songs found.</p>
        )}
     
</div>



    </div>
    
  );
};

export default Filter;
