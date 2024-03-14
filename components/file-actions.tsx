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
import { ShareButton } from "./share";
import { Button } from "./ui/button";

interface ActionsProps {
    side?: "left" | "right" | "bottom" | "top";
    align?: "start" | "center" | "end";
    sideOffset?: number;
    alignOffset?: number;
    onCopy?: () => void;
    onDelete?: () => void;
    shareUrl?: string;
    loading?: boolean;
}

const DROP_DOWN_ITEM = "p-0";

export const FileActions = ({
    side,
    align,
    sideOffset,
    alignOffset,
    onCopy,
    onDelete,
    shareUrl,
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
                    <DropdownMenuItem className={DROP_DOWN_ITEM}>
                        <Button
                            variant={"ghost"}
                            className="h-fit px-2 py-1.5 w-full justify-start"
                            onClick={onCopy}
                        >
                            <Clipboard className="w-4 h-4 mr-2" />
                            Copy Url
                        </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem className={DROP_DOWN_ITEM}>
                        <ShareButton
                            variant="ghost"
                            className="h-fit px-2 py-1.5 w-full justify-start"
                            shareUrl={shareUrl}
                        />
                    </DropdownMenuItem>
                    <DropdownMenuItem className={DROP_DOWN_ITEM}>
                        <Button
                            variant={"destructive"}
                            className="h-fit px-2 py-1.5 w-full justify-start bg-white"
                            onClick={enableConfirmModal}
                        >
                            <Trash2 className="w-4 h-4 mr-2 " />
                            Delete
                        </Button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};
