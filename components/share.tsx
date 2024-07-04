"use client";

import { Button } from "./ui/button";
import { Link, Share } from "lucide-react";
import { toast } from "./ui/use-toast";
import { useMemo } from "react";
import { cn, createUrl } from "@/lib/utils";

interface ShareButtonProps {
    shareUrl?: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    className?: string;
}

export const ShareButton = ({ shareUrl, variant = "default", className }: ShareButtonProps) => {
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
        <Button variant={variant} className={cn("", className)} onClick={onShare}>
            <Link className="w-4 h-4  mr-2" />
            Share
        </Button>
    );
};
