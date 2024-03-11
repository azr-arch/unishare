"use client";

import { NotFound } from "@/components/not-found";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { api } from "@/convex/_generated/api";
import { calculateDaysRemaining, getFileUrl } from "@/lib/utils";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { Download, Share } from "lucide-react";
import Image from "next/image";
import { useMemo } from "react";

interface DocumentPlaceholderProps {
    preloadedData: Preloaded<typeof api.file.getFileById>;
}

export const DocumentPlaceholder = ({ preloadedData }: DocumentPlaceholderProps) => {
    const data = usePreloadedQuery(preloadedData);
    const link = getFileUrl(data.fileId!);

    const expiresOn = useMemo(
        () => calculateDaysRemaining(data._creationTime),
        [data._creationTime]
    );

    if (!data._id) {
        return <NotFound />;
    }

    // Make this functionality a separate component
    const onShare = async () => {
        // Share functionality
        try {
            await navigator.share({
                title: "Hey, check out this amazing file I found on UniShare: File. You can view it here: ${url}",
                url: link,
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

    const onDownload = () => console.log("downloading");

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="space-y-4">
                <div className="w-full flex items-end justify-between ">
                    <div>
                        <h1 className="text-xl font-medium">{data.name}</h1>
                        <p className="text-sm">Uploaded by {data.uploadedBy.name}</p>
                    </div>

                    <p className="text-xs text-neutral-700 font-medium">
                        Expires on
                        <br />
                        <span className="text-sm">{expiresOn}</span>
                    </p>
                </div>

                <div className="relative w-[70vw] max-h-[70vh] aspect-video shadow-md">
                    <Image
                        src={link}
                        className="relative aspect-square object-cover"
                        alt="image"
                        fill
                    />
                </div>

                <div className="flex items-center px-4 gap-x-6">
                    <Button variant={"outline"} onClick={onShare}>
                        <Share className="w-4 h-4  mr-2" />
                        Share
                    </Button>

                    <Button variant={"outline"} onClick={onDownload}>
                        <Download className="w-4 h-4  mr-2" />
                        Download
                    </Button>
                </div>
            </div>
        </div>
    );
};
