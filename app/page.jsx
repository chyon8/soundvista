
import Filter from "@/components/Filter";




const getMusic = async () => {
  try {



    const res = await fetch("https://soundvista.vercel.app/api/Music", {
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

const Dashboard = async () => {
  const data = await getMusic();


  // Make sure we have tickets needed for production build.
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
</div>
             

              </div>



             
            </div>



          )
 
 
};

export default Dashboard;



