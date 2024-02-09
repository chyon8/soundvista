

import User from "@/models/User"; 

import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';


export async function POST(req) {

  try {
   const body = await req.json();
   const { userEmail, id, isFavorite } = body;

   const user = await User.findOne({ email: userEmail });


   if (!user) {
  
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }


  if (isFavorite) {
    user.favorites.set(id, true);
  } else {
    user.favorites.delete(id);
  }

  await user.save()


    return NextResponse.json({ message: "Created" }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}
