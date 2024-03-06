"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";

interface AlertModalProps {
    isOpen?: boolean;
    onClose?: () => void;
    onConfirm?: () => void;
    loading?: boolean;
}

export const AlertModal = ({ isOpen, onClose, onConfirm, loading }: AlertModalProps) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogTitle>Are you sure</DialogTitle>
                <DialogDescription>This action can not be undone.</DialogDescription>
                <div className="pt-6  space-x-2 flex items-center justify-end w-full">
                    <Button disabled={loading} variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button disabled={loading} variant="destructive" onClick={onConfirm}>
                        Continue
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
