"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
export default function Navbar() {
  const { status,data: session } = useSession();
  return (
    <div className="p-4 flex justify-between items-center shadow-md bg-page">
      <Link className="font-bold text-lg text-blue-700" href={"/"}>
        SoundVista
      </Link>

      <a className="text-lg text-slate-600" href={"access"}>Get Access</a>

  

     

      {status === "authenticated" ? (

<div className="flex">

        <button
          onClick={() => signOut()}
          className="bg-slate-900 text-white px-6 py-2 rounded-md"
        >
          Sign Out
        </button>

        <Link className="font text-sm ml-4 mt-1" href={"/profile"}>
        <Image
          className="rounded-full"
          src={session?.user?.image}
          width={30}
          height={30}
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
