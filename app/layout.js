import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import { Inter } from "next/font/google";
import { NextAuthProvider } from "./Providers";
import { AudioProvider } from "./AudioContext";
import { TabsProvider } from "./TabsContext";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sound Vista",
  description: "Loyalty free music for everything",
  
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
<head>
<link rel="shortcut icon" href="images/favicon.ico" />
<script async src="https://tally.so/widgets/embed.js"></script>


</head>
      <body className={inter.className}>
        <NextAuthProvider>
          <AudioProvider>
            <TabsProvider>
          <div className="flex flex-col h-screen max-h-screen">
            <Navbar />
            <div className="flex-grow overflow-y-auto bg-page text-default-text">
         
      {children}
      
<a href="/terms" target="_blank" class="flex justify-center"> 
Terms and Conditions 2024
</a>
     

 
    </div>



   <Footer/>
          </div>
          </TabsProvider>
          </AudioProvider>
        </NextAuthProvider>
    
      </body>
    </html>
  );
}
