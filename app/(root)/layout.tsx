import type { Metadata } from "next";
import { Clerk } from "@clerk/nextjs/server";
import { Inter } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import Navbar from "@/components/shared/Navbar";
import Leftbar from "@/components/shared/Leftbar";
import Rightbar from "@/components/shared/Rightbar";
import Footer from "@/components/shared/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Threads",
  description: "New Threads app using next js",
};

export default function RootLayout({
  children,
}:{
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>

        <Navbar/>
        <main className="flex">

          <Leftbar/>

          <section className="main-container"> 
            <div className="w-full max-w-4xl">
              {children}
            </div>
          </section>

          <Rightbar/>

        </main>
        <Footer/>
        
      </body>
    </html>
    </ClerkProvider>
  );
}
