
import Filter from "@/components/Filter";
import SignInBtn from "@/components/SignInBtn";
import { getServerSession } from 'next-auth';
import User from '@/models/User'; // Adjust the path accordingly



const Access = async () => {

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




  return (


    
    <div className="p-8">

      <p>Please send us the form to get access to music</p>

      <iframe data-tally-src="https://tally.so/embed/n9DJ4K?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1" loading="lazy" width="100%" height="1039" frameborder="0" marginheight="0" marginwidth="0" title="soundvista"></iframe>
   
      <div>

<div className="p-8">




</div>
             

              </div>



             
            </div>



          )
 
 
};

export default Access;



