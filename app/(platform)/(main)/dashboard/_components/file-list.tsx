"use client";

import { api } from "@/convex/_generated/api";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { FileItem } from "./file-item";

interface FileListProps {
    preloadedData: Preloaded<typeof api.file.getFiles>;
}

export const FileList = ({ preloadedData }: FileListProps) => {
    const data = usePreloadedQuery(preloadedData);
    return (
        <div className="w-full h-full px-4 py-6 flex items-center flex-wrap gap-4">
            {data.length > 0 ? (
                data.map((item) => <FileItem data={item} key={item._id} />)
            ) : (
                <p className="text-lg text-neutral-600 font-medium">
                    No files found! upload one now
                </p>
            )}
        </div>
    );
};
