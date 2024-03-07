"use server";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { fetchMutation } from "convex/nextjs";
import { revalidatePath } from "next/cache";

export const deleteAction = async ({ id }: { id: Id<"file"> }) => {
    try {
        await fetchMutation(api.file.deleteFile, { fileId: id });
        revalidatePath("/dashboard");
    } catch (error) {
        console.log("[DELETE_ERROR]: ", error);
    }
};
