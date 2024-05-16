"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";

export default function SignInBtn() {
  return (
    <div className="p-4">

<div className="flex">
<Image src="/google-logo.png" height={30} width={30} alt="google" />
<button 
onClick={() => signIn("google")} 
className="flex items-center gap-4 shadow-xl rounded-lg pl-3"
    >Sign In
  </button>
</div>
{/*<button
      onClick={() => signIn("google")}
      className="flex items-center gap-4 shadow-xl rounded-lg pl-3"
    >
      <Image src="/google-logo.png" height={30} width={30} alt="google" />
      <span className="bg-blue-500 text-white px-4 py-3">
        Sign in with Google
      </span>
  </button>*/}


    </div>

  );


}
