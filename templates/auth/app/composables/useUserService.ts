import type { User } from "~/types/user";

export const useUserService = () => {
	const api = useApi();

	const getAll = () => {
		return api<User[]>("/users");
	};

	const getById = (id: number) => {
		return api<User>(`/users/${id}`);
	};

	return {
		getAll,
		getById,
	};
};
