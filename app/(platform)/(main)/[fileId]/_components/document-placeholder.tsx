"use client";

import { NotFound } from "@/components/not-found";
import { api } from "@/convex/_generated/api";
import { getFileUrl } from "@/lib/utils";
import { Preloaded, usePreloadedQuery } from "convex/react";
import Image from "next/image";

interface DocumentPlaceholderProps {
    preloadedData: Preloaded<typeof api.file.getFileById>;
}

export const DocumentPlaceholder = ({ preloadedData }: DocumentPlaceholderProps) => {
    const data = usePreloadedQuery(preloadedData);
    const link = getFileUrl(data.fileId!);

    if (!data) {
        return <NotFound />;
    }

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div>
                <div className="w-full flex items-end justify-between">
                    <div>
                        <h1 className="text-xl font-medium">{data.name}</h1>
                        <p className="text-sm">Uploaded by {data.uploadedBy}</p>
                    </div>

                    <p className="text-xs text-neutral-700 font-medium">Expires on 20 march 2022</p>
                </div>
                <Image
                    src={link}
                    className="relative aspect-square object-contain"
                    width={500}
                    height={500}
                    alt="image"
                />
            </div>
        </div>
    );
};
