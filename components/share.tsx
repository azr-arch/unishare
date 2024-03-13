"use client";

import { Button } from "./ui/button";
import { Share } from "lucide-react";
import { toast } from "./ui/use-toast";
import { useMemo } from "react";
import { createUrl } from "@/lib/utils";

interface ShareButtonProps {
    shareUrl?: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

export const ShareButton = ({ shareUrl, variant = "default" }: ShareButtonProps) => {
    const onShare = async () => {
        // Share functionality
        try {
            await navigator.share({
                title: "Hey, check out this amazing file I found on UniShare: File. You can view it here: ${url}",
                url: shareUrl || "",
            });
        } catch (error) {
            console.log("error sharing file: ", error);
            toast({
                variant: "destructive",
                title: "Not Supported",
                description: "Your browser doesn't support the Web Share API.",
            });
        }
    };

    return (
        <Button variant={variant} onClick={onShare}>
            <Share className="w-4 h-4  mr-2" />
            Share
        </Button>
    );
};
