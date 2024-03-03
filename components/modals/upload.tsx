"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useToast } from "../ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
    title: z.string().min(3, {
        message: "Title must be at least 3 characters.",
    }),
    file: z
        .custom<FileList>((val) => val instanceof FileList, "Required")
        .refine((files) => files.length > 0, "Required"),
});

export const FileUploadModal = () => {
    const createFile = useMutation(api.file.createFile);
    const generateUrl = useMutation(api.file.generateUploadUrl);

    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            file: undefined,
        },
    });

    const fileRef = form.register("file");

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const { title, file } = values;
        try {
            const url = await generateUrl();
            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": file[0]?.type },
                body: file[0],
            });
            const data = await res.json();

            await createFile({
                name: title,
                fileId: data.storageId,
                type: "image",
            });

            toast({
                title: "File uploaded",
                description: "your file is uploaded successfully",
            });
        } catch (error) {
            toast({
                title: "An error occured",
                description: "please try again after some time.",
                variant: "destructive",
            });
        } finally {
            form.reset();
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Upload</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="mb-6">Upload your file</DialogTitle>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={form.formState.isSubmitting}
                                                type="text"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="file"
                                render={() => (
                                    <FormItem>
                                        <FormLabel>File</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={form.formState.isSubmitting}
                                                type="file"
                                                {...fileRef}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button disabled={form.formState.isSubmitting} type="submit">
                                Submit
                            </Button>
                        </form>
                    </Form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
