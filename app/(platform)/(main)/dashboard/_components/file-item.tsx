"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Doc, Id } from "@/convex/_generated/dataModel";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import { createUrl, calculateDaysRemaining } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import { deleteAction } from "@/actions/delete-file";
import { FileActions } from "@/components/file-actions";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { ExpireTooltip } from "@/components/expire-tooltip";
import { Info } from "lucide-react";

interface FileItemProps {
    data: {
        _id: Id<"file">;
        _creationTime: number;
        type: "image" | "pdf";
        name: string;
        fileId: Id<"_storage">;
        user: Id<"users">;
        url: string | null;
    };
}

export const FileItem = ({ data }: FileItemProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const deleteFileMutation = useMutation(api.file.deleteFile);

    const href = useMemo(() => createUrl(data.fileId), [data.fileId]); // Link to file (fileId) page

    const expiresOn = useMemo(
        () => calculateDaysRemaining(data?._creationTime || null),
        [data?._creationTime]
    );

    // Move this into separate functions
    const onCopy = useCallback(() => {
        navigator.clipboard.writeText(href || "");
        toast({
            title: "URL copied to clipboard.",
        });
    }, [href]);

    const onDelete = useCallback(async () => {
        setIsLoading(true);
        // Delete action
        if (!data._id) return;
        try {
            //  TODO: Implement this (action)
            // await deleteAction;

            await deleteFileMutation({ fileId: data._id });
            toast({
                title: "File deleted successfully",
            });
        } catch (error) {
            console.log(error);
            toast({
                title: "Something went wrong!",
                description: "Please try again later.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    }, [data._id, deleteFileMutation]);

    return (
        <Card>
            <CardContent className="relative pt-5">
                <ExpireTooltip
                    className="absolute top-4 right-4 z-40 "
                    content={expiresOn || ""}
                    trigger={<Info className="w-3 h-3" />}
                />
                <Link href={href}>
                    {data?.url ? (
                        <div className="relative w-full aspect-square min-w-[180px]">
                            <Image
                                src={data.url}
                                className="object-cover"
                                fill
                                alt={data.name}
                                sizes="180px"
                            />
                        </div>
                    ) : null}
                </Link>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
                <p className="text-base font-medium">{data.name}</p>

                <FileActions
                    side="bottom"
                    sideOffset={-20}
                    align="end"
                    alignOffset={20}
                    onCopy={onCopy}
                    shareUrl={href}
                    onDelete={onDelete}
                    loading={isLoading}
                />
            </CardFooter>
        </Card>
    );
};
