"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
export default function Navbar() {
  const { status,data: session } = useSession();
  return (
    <div className="p-4 pl-16 pr-16 flex justify-between items-center shadow-md bg-page">
    

      <a className="text-lg text-slate-600 hover:text-yellow-200" href={"access"}>Get Access</a>

  
      <Link className="font-bold text-lg" href={"/"} style={{color:'#234DA3'}}>
        SoundVista
      </Link>
     

      {status === "authenticated" ? (

<div className="flex">

        <button
        style={{border:'1px solid #343434', borderRadius:'16px'}}
          onClick={() => signOut()}
          className="text-white px-4 py-2 "
        >
          Sign Out
        </button>

        <Link className="font text-sm ml-4 mt-1" href={"/profile"}>
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
          className="bg-slate-900 text-white px-6 py-2 rounded-md"
        >
          Sign In
        </button>
      


        

           
      )}
    </div>
  );
}
