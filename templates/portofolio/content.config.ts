import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
	collections: {
		blog: defineCollection({
			type: "page",
			source: "blog/*.md",
			schema: z.object({
				title: z.string(),
				description: z.string(),
				date: z.string(),
				author: z
					.object({
						name: z.string(),
						avatar: z.string(),
						role: z.string().optional(),
					})
					.optional(),
				tags: z.array(z.string()).default([]),
				readTime: z.string().optional(),
				image: z.string().optional(),
				featured: z.boolean().default(false),
			}),
		}),
	},
});
