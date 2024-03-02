"use client";

import { useAuth } from "@clerk/nextjs";
import { Logo } from "./logo";
import Link from "next/link";

export const Header = () => {
    return (
        <header className="fixed top-0 left-0 w-full h-14 px-4 flex items-center border-b border-[#dce5ed]">
            <Logo />
        </header>
    );
};
