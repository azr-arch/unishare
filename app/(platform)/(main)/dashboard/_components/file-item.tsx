"use client";

import { Button } from "@/components/ui/button";
import { Download, ArrowUpRight, MoreHorizontal, MoreVertical } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Doc } from "@/convex/_generated/dataModel";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { getFileUrl, getWithinUrl } from "@/lib/utils";
import { FileItemActions } from "./file-item-actions";

export const FileItem = ({ data }: { data: Doc<"file"> }) => {
    const url = useMemo(() => getFileUrl(data.fileId), [data.fileId]); // Storage url
    const href = useMemo(() => getWithinUrl(data.fileId), [data.fileId]); // Link to file (fileId) page

    return (
        <Card>
            <CardContent>
                <Image
                    src={url}
                    className="relative aspect-square object-cover"
                    width={180}
                    height={180}
                    alt={data.name}
                />
            </CardContent>
            <CardFooter className="flex items-center justify-between">
                <p className="text-base font-medium">{data.name}</p>
                <FileItemActions url={href} id={data._id} />
            </CardFooter>
        </Card>
    );
};
