
import Filter from "@/components/Filter";

import { getServerSession } from 'next-auth';
import User from '@/models/User'; // Adjust the path accordingly
import SignInBtn from "@/components/SignInBtn";



const getMusic = async () => {
  try {
   

    const res = await fetch(`https://soundvista.vercel.app/api/FavMusic`, {
     // const res = await fetch(`http://localhost:3000/api/FavMusic`, {
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
  let userEmail
  const data = await getMusic();
  const session = await getServerSession();
 

  if(!session){
    return <SignInBtn/>
  }
  else{
     userEmail = session.user.email;
  }


  const user = await User.findOne({ email: userEmail });
  if (!user) {
      return null;
    }

  const favList= user.favorites
  const keysArray = Array.from(favList.keys());

const foundMusic = data?.music.filter(item => keysArray.includes(item._id));




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



