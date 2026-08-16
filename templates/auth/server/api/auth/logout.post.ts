import { deleteSession } from "../../utils/db";
import { clearSessionCookie, getSessionToken } from "../../utils/session";

export default defineEventHandler(async (event) => {
	const token = getSessionToken(event);

	if (token) {
		await deleteSession(token);
	}

	clearSessionCookie(event);

	return {
		statusCode: 200,
		message: "Logout berhasil",
	};
});
