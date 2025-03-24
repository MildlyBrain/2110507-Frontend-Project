"use client"; //just for testing
import { useEffect } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import TopBar from "@/components/TopBar";
import Sidebar from "@/components/Sidebar";


// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    localStorage.setItem("role", "admin"); // Change to 'user' / 'admin' for testing
    document.cookie = `role=${localStorage.getItem("role")}; path=/; secure; samesite=lax`;
  }, []);

  return (    
        <div>
        <Sidebar/> 
        <TopBar/>
        
        {children}

        </div>
  );
}
