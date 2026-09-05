export interface PortfolioConfig {
	name: string;
	handle: string;
	role: string;
	bio: string;
	email: string;
	location: string;
	github: string;
	twitter: string;
	linkedin: string;
	version: string;
}

export const usePortfolio = () => {
	const config = ref<PortfolioConfig>({
		name: "Davin",
		handle: "@davingm",
		role: "Frontend Engineer & CLI Creator",
		bio: "Building minimalist web experiences, Nuxt tooling, and automated DevOps workflows.",
		email: "davin@davingm.com",
		location: "Jakarta, ID (UTC+7)",
		github: "https://github.com/davingm",
		twitter: "https://x.com/davingm",
		linkedin: "https://linkedin.com",
		version: "4.0.0",
	});

	const getFullTitle = (pageTitle?: string) => {
		return pageTitle
			? `${pageTitle} — ${config.value.name}`
			: `${config.value.name} — ${config.value.role}`;
	};

	return {
		config: readonly(config),
		getFullTitle,
	};
};
