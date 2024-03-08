"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Clipboard, MoreVertical, Share, Trash2 } from "lucide-react";
import { AlertModal } from "./modals/alert-modal";
import { useState } from "react";

interface ActionsProps {
    side?: "left" | "right" | "bottom" | "top";
    align?: "start" | "center" | "end";
    sideOffset?: number;
    alignOffset?: number;
    onCopy?: () => void;
    onDelete?: () => void;
    onShare?: () => void;
    loading?: boolean;
}

export const FileActions = ({
    side,
    align,
    sideOffset,
    alignOffset,
    onCopy,
    onDelete,
    onShare,
    loading,
}: ActionsProps) => {
    const [open, setOpen] = useState(false);

    const enableConfirmModal = () => {
        setOpen(true);
    };

    const closeConfirmModal = () => {
        setOpen(false);
    };

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={closeConfirmModal}
                onConfirm={onDelete}
                loading={loading}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <MoreVertical className="w-4 h-4 cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    side={side}
                    align={align}
                    sideOffset={sideOffset}
                    alignOffset={alignOffset}
                >
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={onCopy}>
                        <Clipboard className="w-4 h-4 mr-2" />
                        Copy Url
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onShare}>
                        <Share className="w-4 h-4  mr-2" />
                        Share
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={enableConfirmModal}>
                        <Trash2 className="w-4 h-4 mr-2 " />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};
