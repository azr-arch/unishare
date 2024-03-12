"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { Logo } from "./logo";
import Link from "next/link";
import { Button } from "./ui/button";

export const Header = () => {
    const { user } = useUser();

    return (
        <header className="fixed top-0 left-0 z-50 bg-white shadow-sm w-full h-14 px-4 flex items-center border-b border-[#dce5ed]">
            <Logo />

            <div className="ml-auto p-1.5 hover:bg-neutral-200 transition cursor-pointer duration-200 rounded-full">
                <UserButton afterSignOutUrl="/" />
            </div>

            {!user && (
                <Link href={"/sign-in"}>
                    <Button size={"sm"} className="bg-blue-500 font-semibold">
                        Join
                    </Button>
                </Link>
            )}
        </header>
    );
};
