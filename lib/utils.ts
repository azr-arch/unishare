import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getFileUrl = (fileId: string) => {
    return `${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${fileId}`;
};

export const getWithinUrl = (fileId: string) => {
    // Change this to using env
    return `http://localhost:3000/${fileId}`;
};
