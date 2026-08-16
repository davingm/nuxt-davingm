import { getUserFromEvent } from "../../utils/session";

export default defineEventHandler(async (event) => {
	const user = await getUserFromEvent(event);

	if (!user) {
		throw createError({
			statusCode: 401,
			statusMessage: "Unauthenticated",
		});
	}

	return {
		user: {
			id: user.id,
			name: user.name,
			email: user.email,
			created_at: user.created_at,
		},
	};
});
