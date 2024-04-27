import { Id } from "@/convex/_generated/dataModel";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getFileUrl = (fileId: Id<"_storage">) => {
    if (!fileId) return;
    return `${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${fileId}`;
};

export const createUrl = (fileId: string) => {
    return `${process.env.NEXT_PUBLIC_URL}/${fileId}`;
};

export const ICON_STYLES = "w-4 h-4 mr-2";

export function calculateDaysRemaining(startDate: number | null) {
    if (!startDate) return null;
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 7); // Add 15 days to the start date

    return endDate.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    // For returning exact days remaining
    // if (now > endDate) {
    //     return 0; // The period has already ended
    // } else {
    //     const timeDifference = endDate.getTime() - now.getTime();
    //     const daysRemaining = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    //     return daysRemaining;
    // }
}
