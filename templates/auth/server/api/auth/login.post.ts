import { randomUUID } from "node:crypto";
import bcrypt from "bcryptjs";
import { createSession, findUserByEmail } from "../../utils/db";
import { setSessionCookie } from "../../utils/session";

export default defineEventHandler(async (event) => {
	const body = await readBody(event).catch(() => ({}));

	const email = (body.email || "").trim().toLowerCase();
	const password = body.password || "";

	if (!email) {
		throw createError({ statusCode: 400, statusMessage: "Email wajib diisi" });
	}

	if (!password) {
		throw createError({
			statusCode: 400,
			statusMessage: "Password wajib diisi",
		});
	}

	// Find user
	const user = await findUserByEmail(email);
	if (!user || !user.password) {
		throw createError({
			statusCode: 401,
			statusMessage: "Email atau password salah",
		});
	}

	// Compare password
	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		throw createError({
			statusCode: 401,
			statusMessage: "Email atau password salah",
		});
	}

	// Create session
	const token = randomUUID();
	const sessionId = randomUUID();
	const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

	await createSession(sessionId, user.id, token, expiresAt);
	setSessionCookie(event, token, expiresAt);

	return {
		statusCode: 200,
		message: "Login berhasil",
		user: {
			id: user.id,
			name: user.name,
			email: user.email,
			created_at: user.created_at,
		},
	};
});
