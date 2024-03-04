"use client";

import { Button } from "@/components/ui/button";
import { FolderOpen, Download } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Doc } from "@/convex/_generated/dataModel";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

const getFileUrl = (fileId: string) => {
    return `${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${fileId}`;
};

export const FileItem = ({ data }: { data: Doc<"file"> }) => {
    const url = useMemo(() => getFileUrl(data.fileId), [data.fileId]);
    return (
        <Card>
            <CardHeader>
                <CardTitle className="">{data.name}</CardTitle>
            </CardHeader>
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
                <Button size={"sm"} variant={"outline"}>
                    <Link href={url} target="_blank" className="flex ">
                        <FolderOpen className="w-4 h-4 mr-2" />
                        View
                    </Link>
                </Button>
                <Button size={"sm"} variant={"outline"}>
                    <Download className="w-4 h-4 mr-2" />
                    Delete
                </Button>
            </CardFooter>
        </Card>
    );
};
