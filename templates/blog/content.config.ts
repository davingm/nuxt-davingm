import { defineCollection, defineContentConfig, z } from "@nuxt/content";

const skillSchema = z.object({
	name: z.string(),
	icon: z.string(),
	highlight: z.boolean().optional(),
});

const skillCategorySchema = z.object({
	title: z.string(),
	icon: z.string(),
	description: z.string(),
	skills: z.array(skillSchema),
});

const navItemSchema = z.object({
	label: z.string(),
	to: z.string(),
});

const searchItemSchema = z.object({
	title: z.string(),
	subtitle: z.string().optional(),
	to: z.string(),
	icon: z.string(),
	category: z.string(),
});

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

		wwwProfile: defineCollection({
			type: "data",
			source: "www/profile.yml",
			schema: z.object({
				name: z.string(),
				handle: z.string(),
				role: z.string(),
				bio: z.string(),
				location: z.string(),
				email: z.string(),
				avatar: z.string(),
				availability: z.string(),
			}),
		}),

		wwwSocial: defineCollection({
			type: "data",
			source: "www/social.yml",
			schema: z.object({
				github: z.string(),
				twitter: z.string(),
				linkedin: z.string(),
			}),
		}),

		wwwSite: defineCollection({
			type: "data",
			source: "www/site.yml",
			schema: z.object({
				brandName: z.string(),
				brandDomain: z.string(),
				version: z.string(),
				cliRepoUrl: z.string(),
				seo: z.object({ title: z.string(), description: z.string() }),
				nav: z.array(navItemSchema),
				footer: z.object({
					status: z.string(),
					credit: z.string(),
					links: z.array(z.object({ label: z.string(), to: z.string() })),
				}),
				search: z.object({
					placeholder: z.string(),
					empty: z.string(),
					trigger: z.string(),
					pages: z.array(searchItemSchema),
				}),
			}),
		}),

		wwwOverview: defineCollection({
			type: "data",
			source: "www/overview.yml",
			schema: z.object({
				seo: z.object({ title: z.string(), description: z.string() }),
				hero: z.object({
					heading: z.string(),
					bio: z.string(),
					cli: z.object({
						label: z.string(),
						description: z.string(),
						command: z.string(),
					}),
					actions: z.array(
						z.object({
							label: z.string(),
							to: z.string().optional(),
							variant: z.string(),
							icon: z.string().optional(),
							trailingIcon: z.string().optional(),
							socialKey: z.string().optional(),
						}),
					),
				}),
				skills: z.object({
					heading: z.string(),
					subheading: z.string(),
					categories: z.array(skillCategorySchema),
				}),
				testimonials: z.object({
					heading: z.string(),
					subheading: z.string(),
					items: z.array(
						z.object({
							quote: z.string(),
							author: z.string(),
							role: z.string(),
							company: z.string(),
							avatar: z.string(),
						}),
					),
				}),
				faq: z.object({
					heading: z.string(),
					subheading: z.string(),
					items: z.array(
						z.object({ title: z.string(), content: z.string() }),
					),
				}),
				contact: z.object({
					heading: z.string(),
					subheading: z.string(),
					actions: z.object({
						copyEmail: z.string(),
						copyEmailSuccess: z.string(),
						sendEmail: z.string(),
						dmTwitter: z.string(),
						github: z.string(),
					}),
				}),
				latestPosts: z.object({
					heading: z.string(),
					subheading: z.string(),
					viewAll: z.string(),
					viewAllMobile: z.string(),
					readPost: z.string(),
					defaultReadTime: z.string(),
				}),
			}),
		}),

		wwwExperience: defineCollection({
			type: "data",
			source: "www/experience.yml",
			schema: z.object({
				items: z.array(
					z.object({
						role: z.string(),
						company: z.string(),
						location: z.string(),
						period: z.string(),
						description: z.string(),
						achievements: z.array(z.string()),
						skills: z.array(z.string()),
					}),
				),
			}),
		}),

		wwwProjects: defineCollection({
			type: "data",
			source: "www/projects.yml",
			schema: z.object({
				seo: z.object({ title: z.string(), description: z.string() }),
				heading: z.string(),
				subheading: z.string(),
				categories: z.array(z.string()),
				searchPlaceholder: z.string(),
				emptyState: z.string(),
				actions: z.object({ liveDemo: z.string(), source: z.string() }),
				items: z.array(
					z.object({
						title: z.string(),
						description: z.string(),
						category: z.string(),
						tags: z.array(z.string()),
						stars: z.number().optional(),
						demoUrl: z.string().optional(),
						githubUrl: z.string().optional(),
						highlights: z.array(z.string()),
						status: z.enum(["Active", "Maintained", "Beta"]),
					}),
				),
			}),
		}),

		wwwGallery: defineCollection({
			type: "data",
			source: "www/gallery.yml",
			schema: z.object({
				seo: z.object({ title: z.string(), description: z.string() }),
				heading: z.string(),
				subheading: z.string(),
				categories: z.array(z.string()),
				items: z.array(
					z.object({
						id: z.string(),
						title: z.string(),
						category: z.string(),
						date: z.string(),
						location: z.string(),
						camera: z.string(),
						image: z.string(),
						description: z.string(),
					}),
				),
			}),
		}),

		wwwFriends: defineCollection({
			type: "data",
			source: "www/friends.yml",
			schema: z.object({
				seo: z.object({ title: z.string(), description: z.string() }),
				heading: z.string(),
				subheading: z.string(),
				joinButton: z.string(),
				visitWebsite: z.string(),
				prTemplate: z.string(),
				modal: z.object({
					title: z.string(),
					description: z.string(),
					copyButton: z.string(),
					copySuccess: z.string(),
					submitButton: z.string(),
				}),
				items: z.array(
					z.object({
						name: z.string(),
						handle: z.string(),
						avatar: z.string(),
						role: z.string(),
						bio: z.string(),
						location: z.string(),
						siteUrl: z.string(),
						githubUrl: z.string().optional(),
						tags: z.array(z.string()),
					}),
				),
			}),
		}),
	},
});
