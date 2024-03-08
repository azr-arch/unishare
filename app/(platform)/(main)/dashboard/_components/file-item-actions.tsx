"use client";

import { deleteAction } from "@/actions/delete-file";
import { FileActions } from "@/components/file-actions";
import { toast } from "@/components/ui/use-toast";
import { Id } from "@/convex/_generated/dataModel";
import { useState } from "react";

interface FileItemActionsProps {
    url?: string;
    id?: Id<"file">;
}

export const FileItemActions = ({ url, id }: FileItemActionsProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const onCopy = () => {
        navigator.clipboard.writeText(url!);
        toast({
            title: "URL copied to clipboard.",
        });
    };

    const onShare = async () => {
        // Share functionality
        try {
            console.log("l");
            await navigator.share({
                title: "Hey, check out this amazing file I found on UniShare: File. You can view it here: ${url}",
                url: url,
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

    const onDelete = async () => {
        setIsLoading(true);
        // Delete action
        if (!id) return;
        try {
            await deleteAction({ id });
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <FileActions
            side="bottom"
            sideOffset={-20}
            align="end"
            alignOffset={20}
            onCopy={onCopy}
            onShare={onShare}
            onDelete={onDelete}
            loading={isLoading}
        />
    );
};
