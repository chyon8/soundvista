"use client"

import UserInfo from "@/components/UserInfo";

//import User from '@/models/User'; // Adjust the path accordingly
import { signOut,useSession  } from "next-auth/react";



const getUserProfile = async () => {
    try {
     
// user 결제, 구독 정도 

  
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };


const Profile = () => {
  
  const { status } = useSession();


  return (


    <div className="p-4">

<UserInfo/>

<a className="flex text-lg ml-4 text-slate-600 hover:text-yellow-200 mb-4" href={"access"}>Request Access</a>


{ status !== 'unauthenticated' && (
<button
className="text-white ml-3 mt-3 px-4 py-2 border border-gray-800 rounded-xl"
onClick={() => signOut()}>Sign Out
</button>
)}    
     </div>



          )
 
 
};

export default Profile;



