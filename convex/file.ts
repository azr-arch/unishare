import { ConvexError, v } from "convex/values";
import { MutationCtx, QueryCtx, internalMutation, mutation, query } from "./_generated/server";
import { fileTypes } from "./schema";
import { Doc } from "./_generated/dataModel";
import { EXPIRE_FILE_DURATION } from "../lib/constants";

export interface CustomFile {
    file: Doc<"file"> | null;
    uploadedBy: Doc<"users"> | null;
}

export const generateUploadUrl = mutation(async (ctx) => {
    return await ctx.storage.generateUploadUrl();
});

const getUser = async (ctx: QueryCtx | MutationCtx) => {
    try {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) return null;

        const user = await ctx.db
            .query("users")
            .withIndex("by_token", (q) => q.eq("tokenId", identity.tokenIdentifier))
            .first();

        if (!user) return null;

        return user;
    } catch (error) {
        console.log("[FILE__GET_USER]: ", error);
    }
};

export const createFile = mutation({
    args: {
        name: v.string(),
        fileId: v.id("_storage"),
        type: fileTypes,
    },
    handler: async (ctx, args) => {
        const user = await getUser(ctx);

        if (!user) throw new ConvexError("You are not allowed to perfom this action");

        await ctx.db.insert("file", {
            name: args.name,
            fileId: args.fileId,
            type: args.type,
            user: user._id,
        });
    },
});

export const getFiles = query({
    handler: async (ctx) => {
        // Todo add auth, for fetching only the logged in user files
        const user = await getUser(ctx);

        if (!user) {
            return [];
        }

        const filesOfUser = await ctx.db
            .query("file")
            .filter((q) => q.eq(q.field("user"), user._id))
            .collect();

        return filesOfUser;
    },
});

export const getFileById = query({
    args: {
        fileId: v.string(),
    },
    handler: async (ctx, args): Promise<CustomFile> => {
        const file = await ctx.db
            .query("file")
            .filter((q) => q.eq(q.field("fileId"), args.fileId))
            .first();

        const uploadedBy = await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("_id"), file?.user))
            .first();

        return {
            file,
            uploadedBy,
        };
    },
});

export const deleteFile = mutation({
    args: {
        fileId: v.string(),
    },
    handler: async (ctx, { fileId }) => {
        const user = await getUser(ctx);

        if (!user) throw new ConvexError("Unauthorized request.");

        const selectedFile = await ctx.db
            .query("file")
            .filter((q) => q.eq(q.field("_id"), fileId))
            .first();

        // Check if the file is uploaded by current user
        if (!selectedFile || selectedFile.user !== user._id) {
            throw new ConvexError("Unauthorized access.");
        }

        // empyting the storage too!
        await ctx.storage.delete(selectedFile.fileId);
        return await ctx.db.delete(selectedFile._id);
    },
});

const hasExpired = (file: Doc<"file">) => {
    const todaysDate = Date.now();
    const createdDate = new Date(file._creationTime).getTime();

    // Calculate the difference in milliseconds
    const diffInMilliseconds = todaysDate - createdDate;

    // Convert the difference to days
    const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);

    // Check if the file is older than 7 days
    return diffInDays > EXPIRE_FILE_DURATION;
};

export const deleteExpiredFiles = internalMutation({
    handler: async (ctx) => {
        try {
            // Collect all the files
            const files = await ctx.db.query("file").collect();

            // Filter out files which are older than 7 days
            const filesToRemove = files.filter(hasExpired);

            console.log("Removing expired files...");
            // Remove the expired files
            for (const file of filesToRemove) {
                // Remove storage file
                await ctx.storage.delete(file.fileId);
                await ctx.db.delete(file._id);
            }

            console.log("All expired files are removed.");
        } catch (error) {
            console.error("[DEL_EXPIRED_FILES]: ", error);
        }
    },
});
