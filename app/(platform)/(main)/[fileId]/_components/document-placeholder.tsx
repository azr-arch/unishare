"use client";

import { BackButton } from "@/components/back-button";
import { NotFound } from "@/components/not-found";
import { ShareButton } from "@/components/share";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useMediaDownload } from "@/hooks/use-media-download";
import { calculateDaysRemaining, createUrl, getFileUrl } from "@/lib/utils";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

interface DocumentPlaceholderProps {
    preloadedData: Preloaded<typeof api.file.getFileById>;
}

export const DocumentPlaceholder = ({ preloadedData }: DocumentPlaceholderProps) => {
    const { file, uploadedBy, url } = usePreloadedQuery(preloadedData);
    const href = useMemo(() => createUrl(file?.fileId!), [file?.fileId]);
    const { isDownloading, downloadImage } = useMediaDownload({
        srcUrl: url!,
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
                    <h1 className="text-2xl font-semibold">{file.name}</h1>
                    <div className="text-neutral-500  mt-1 font-medium text-xs md:text-sm">
                        <p>Uploaded by {uploadedBy.name}</p>
                        {/* <p>MP4 - 1.5GB</p> */}
                    </div>
                </div>
                <p className="text-xs text-neutral-500 font-medium">Expires on {expiresOn}</p>
            </div>
            <BackButton />

            <div className="relative w-[90vw] lg:max-w-[800px] 2xl:max-w-[1200px]">
                <AspectRatio ratio={16 / 9}>
                    <Image src={url || ""} fill className="object-contain " alt="image" />
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
