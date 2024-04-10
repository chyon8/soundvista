import Music from "@/models/Music";
import { NextResponse } from "next/server";


export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {


    const music = await Music.find().sort({ createdAt: 'desc' }).lean()
    

   
    return NextResponse.json({ music,
       },
       { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}

