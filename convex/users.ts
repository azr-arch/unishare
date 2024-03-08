import { v } from "convex/values";
import { internalMutation } from "./_generated/server";

export const createUser = internalMutation({
    args: {
        tokenId: v.string(),
        name: v.string(),
        image: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("users", {
            tokenId: args.tokenId,
            name: args.name,
            image: args.image,
        });
    },
});
