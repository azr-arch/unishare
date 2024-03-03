import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const fileTypes = v.union(
    v.literal("image"),
    v.literal("pdf")
    // Todo add more types
);

export default defineSchema({
    file: defineTable({
        name: v.string(),
        type: fileTypes,
        // url: v.string(),
        fileId: v.id("_storage"),
        user: v.id("users"),
    }),
    users: defineTable({
        name: v.string(),
        image: v.string(),
        tokenId: v.string(),
    }).index("by_token", ["tokenId"]),
});
