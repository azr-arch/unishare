import { ConvexError, v } from "convex/values";
import { MutationCtx, QueryCtx, mutation, query } from "./_generated/server";
import { fileTypes } from "./schema";

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
    args: {},
    handler: async (ctx, args) => {
        // Todo add auth, for fetching only the logged in user files
        return await ctx.db.query("file").collect();
    },
});

// export const getFileById = query({

// })
