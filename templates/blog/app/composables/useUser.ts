export interface UserProfile {
	name: string;
	handle: string;
	role: string;
	bio: string;
	location: string;
	email: string;
	avatar: string;
	availability: string;
}

export interface UserSocial {
	github: string;
	twitter: string;
	linkedin: string;
}

export interface UserSite {
	brandName: string;
	brandDomain: string;
	version: string;
	cliRepoUrl: string;
	seo: { title: string; description: string };
	nav: { label: string; to: string }[];
	footer: {
		status: string;
		credit: string;
		links: { label: string; to: string }[];
	};
	search: {
		placeholder: string;
		empty: string;
		trigger: string;
		pages: {
			title: string;
			subtitle?: string;
			to: string;
			icon: string;
			category: string;
		}[];
	};
}

export interface UserExperience {
	role: string;
	company: string;
	location: string;
	period: string;
	description: string;
	achievements: string[];
	skills: string[];
}

export interface UserProject {
	title: string;
	description: string;
	category: string;
	tags: string[];
	stars?: number;
	demoUrl?: string;
	githubUrl?: string;
	highlights: string[];
	status: "Active" | "Maintained" | "Beta";
}

export interface FeaturedProject {
	title: string;
	description: string;
	tags: string[];
	stars?: number;
	demoUrl?: string;
	githubUrl?: string;
	status: "Production" | "Open Source" | "Beta";
}

export const useUserProfile = () =>
	queryCollection("wwwProfile").first() as Promise<UserProfile>;

export const useUserSocial = () =>
	queryCollection("wwwSocial").first() as Promise<UserSocial>;

export const useUserSite = () =>
	queryCollection("wwwSite").first() as Promise<UserSite>;

export const useUserOverview = () =>
	queryCollection("wwwOverview").first() as Promise<any>;

export const useUserExperience = async (): Promise<UserExperience[]> => {
	const data = await queryCollection("wwwExperience").first();
	return (data as any)?.items ?? [];
};

export const useUserProjects = () =>
	queryCollection("wwwProjects").first() as Promise<any>;

export const useUserGallery = () =>
	queryCollection("wwwGallery").first() as Promise<any>;

export const useUserFriends = () =>
	queryCollection("wwwFriends").first() as Promise<any>;
