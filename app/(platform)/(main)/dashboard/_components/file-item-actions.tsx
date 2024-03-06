"use client";

import { FileActions } from "@/components/file-actions";

interface FileItemActionsProps {
    url?: string;
    id?: string;
}

export const FileItemActions = ({ url, id }: FileItemActionsProps) => {
    // Todo complete this
    const onCopy = () => {};
    const onShare = () => {};
    const onDelete = () => {};

    return (
        <FileActions
            side="bottom"
            sideOffset={-20}
            align="end"
            alignOffset={20}
            onCopy={onCopy}
            onShare={onShare}
            onDelete={onDelete}
        />
    );
};
