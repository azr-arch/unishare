"use client";

import { NotFound } from "@/components/not-found";
import { ShareButton } from "@/components/share";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { api } from "@/convex/_generated/api";
import { useMediaDownload } from "@/hooks/use-media-download";
import { calculateDaysRemaining, createUrl, getFileUrl } from "@/lib/utils";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { Download, Share } from "lucide-react";
import Image from "next/image";
import { useMemo } from "react";

interface DocumentPlaceholderProps {
    preloadedData: Preloaded<typeof api.file.getFileById>;
}

export const DocumentPlaceholder = ({ preloadedData }: DocumentPlaceholderProps) => {
    const { file, uploadedBy, url } = usePreloadedQuery(preloadedData);

    const link = useMemo(() => getFileUrl(file?.fileId!), [file?.fileId]);
    const href = useMemo(() => createUrl(file?.fileId!), [file?.fileId]);
    const { isDownloading, downloadImage } = useMediaDownload({
        srcUrl: link,
        fileName: file?.name,
    });

    const expiresOn = useMemo(
        () => calculateDaysRemaining(file?._creationTime || null),
        [file?._creationTime]
    );

    if (!file || !uploadedBy) {
        return <NotFound />;
    }

    return (
        <div className="space-y-4">
            <div className="w-full flex items-end justify-between ">
                <div>
                    <h1 className="text-xl font-medium">{file.name}</h1>
                    <p className="text-sm">Uploaded by {uploadedBy.name}</p>
                </div>

                <p className="text-xs text-neutral-700 font-medium">
                    Expires on
                    <br />
                    <span className="text-sm">{expiresOn}</span>
                </p>
            </div>

            <div className="relative w-[50vw] min-w-[500px] max-w-[1200px]">
                <AspectRatio ratio={16 / 9}>
                    <Image src={url || ""} fill className="rounded-md object-contain" alt="image" />
                </AspectRatio>
            </div>

            <div className="flex items-center px-4 gap-x-6">
                <ShareButton variant="default" shareUrl={href} />

                <Button variant={"outline"} disabled={isDownloading} onClick={downloadImage}>
                    <Download className="w-4 h-4  mr-2" />
                    Download
                </Button>
            </div>
        </div>
    );
};
