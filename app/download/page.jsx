
import Filter from "@/components/Filter";
import SignInBtn from "@/components/SignInBtn";
import { getServerSession } from 'next-auth';
import User from '@/models/User'; // Adjust the path accordingly



const getMusic = async () => {
  try {

   

    const res = await fetch("https://soundvista.vercel.app/api/FavMusic", {
      cache: "no-store",
      
   
    });

   

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
   
    
  
  

  } catch (error) {
    console.error('Error fetching user favorites:', error);
    return null;
  }
};

const Dashboard = async () => {
  const data = await getMusic();
  const session = await getServerSession();
  let userEmail

  if(!session){
    return <SignInBtn/>
  }
  else{
    userEmail = session.user.email;
  }
  const user = await User.findOne({ email: userEmail });
  if (!user) {
      // Handle the case where the user is not found
      return null;
    }

  const favList= user.downloads
  const keysArray = Array.from(favList.keys());

const foundMusic = data.music.filter(item => keysArray.includes(item._id));




  // Make sure we have tickets needed for production build.
  if (!foundMusic) {
    return <p>No music.</p>;
  }

  const musics = foundMusic;



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



