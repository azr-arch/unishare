"use client";

import { useEffect, useState } from "react";

interface useMediaDownloadProps {
    srcUrl?: string;
    fileName?: string;
}

export const useMediaDownload = ({ srcUrl, fileName = "my-file.png" }: useMediaDownloadProps) => {
    const [isDownloading, setIsDownloading] = useState(false);

    const downloadImage = async () => {
        if (!srcUrl) return;

        try {
            setIsDownloading(true);
            const response = await fetch(srcUrl);
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);

            const anchor = document.createElement("a");
            anchor.href = url;
            anchor.download = fileName;
            anchor.click();

            // Remove the element after downloading
            anchor.remove();

            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error downloading image:", error);
        } finally {
            setIsDownloading(false);
        }
    };

    return { downloadImage, isDownloading };
};
