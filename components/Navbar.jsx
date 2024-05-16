"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
export default function Navbar() {
  const { status,data: session } = useSession();
  return (
    <div className="p-4 pl-16 pr-16  flex justify-between items-center shadow-md bg-page">
    

      <Link className="font-bold text-lg" href={"/"} style={{color:'#234DA3'}}>
        SoundVista
      </Link>
     

      {status === "authenticated" ? (

<div className="flex">


        <Link className="font text-sm ml-2 mt-2" href={"/profile"}>
        <Image
          className="rounded-full"
          src={session?.user?.image}
          width={30}
          height={30}
          alt="user"
        />
            </Link>


</div>


      ) : (

    
        <button
          onClick={() => signIn("google")}

          className="text-white px-4 py-2 border border-gray-800 rounded-xl"
        >
          Sign In
        </button>
      


        

           
      )}
    </div>
  );
}
