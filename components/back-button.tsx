"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export const BackButton = () => {
    const router = useRouter();

    return (
        <Button variant={"secondary"} onClick={router.back}>
            Go Back
        </Button>
    );
};
