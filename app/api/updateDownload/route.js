

import User from "@/models/User"; 
import { NextResponse } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner"

export const dynamic = 'force-dynamic';


export async function POST(req) {



  try {
   const body = await req.json();
   const { userEmail, id, isDownload,audioFileTitle } = body;

   const user = await User.findOne({ email: userEmail });


if(user.subscribed){
   if (!user) {
  
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }


  if (isDownload) {
    user.downloads.set(id, true);
  } 

  await user.save()

  //                  download music  


  let fileKey = audioFileTitle+".mp3"
const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION
const accessKey = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_ACESS_KEY

  const client = new S3Client({apiVersion: '2006-03-01', region: bucketRegion,
  credentials:{
    accessKeyId: accessKey,
    secretAccessKey : secretAccessKey,
  },});
  
  let url;


    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: fileKey,
      ResponseContentDisposition: `attachment; `
    });
 
    try {
  
      const expirationTime = 60 * 5; // 5 minutes
      url = await getSignedUrl(client, command, { expiresIn: expirationTime });
  
      console.log('Generated URL:', url);
  
  
    } catch (err) {
      console.error(err);
    }

//                              downlaod music




    return NextResponse.json({ message: "Created",generatedUrl: url }, { status: 201 });


}    //subscribed


  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}
