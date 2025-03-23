"use client"
import { getUserRole } from "@/libs/getUserRole";
import Image from "next/image";
import AdminTopBar from "./AdminTopBar";
import Link from 'next/link';
import { useEffect, useState } from "react";

export default function TopBar() {

    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        setRole(getUserRole());
    })

    return (
        <div className="z-50 fixed top-0 left-0 flex items-center p-8 w-full h-[10vh]
        bg-linear-to-r from-red-300 via-emerald-300 to-sky-300">
            <Link href="/">
                <Image
                    src="/img/logo.svg"
                    alt="logo"
                    objectFit="contain"
                    width={150}
                    height={0} // Use a proper height value like 50 or 150, or set it to 'auto'
                />
            </Link>
            {
                role === "admin" ? <AdminTopBar /> : ""
            }

            <div className="w-full h-fit">
                <div className="text-black [text-shadow:2px_2px_0px_white,-2px_-2px_0px_white,2px_-2px_0px_white,-2px_2px_0px_white]
                text-4xl font-bold text-right">
                    Log in
                </div>
            </div>
        </div>
    );


}