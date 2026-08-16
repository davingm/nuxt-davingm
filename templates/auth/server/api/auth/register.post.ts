import { randomUUID } from "node:crypto";
import bcrypt from "bcryptjs";
import { createSession, createUser, findUserByEmail } from "../../utils/db";
import { setSessionCookie } from "../../utils/session";

export default defineEventHandler(async (event) => {
	const body = await readBody(event).catch(() => ({}));

	const name = (body.name || "").trim();
	const email = (body.email || "").trim().toLowerCase();
	const password = body.password || "";
	const passwordConfirmation =
		body.password_confirmation || body.passwordConfirmation || "";

	// Validations
	if (!name) {
		throw createError({ statusCode: 400, statusMessage: "Nama wajib diisi" });
	}

	if (!email || !email.includes("@")) {
		throw createError({ statusCode: 400, statusMessage: "Email tidak valid" });
	}

	if (!password || password.length < 6) {
		throw createError({
			statusCode: 400,
			statusMessage: "Password minimal 6 karakter",
		});
	}

	if (password !== passwordConfirmation) {
		throw createError({
			statusCode: 400,
			statusMessage: "Konfirmasi password tidak cocok",
		});
	}

	// Check existing user
	const existingUser = await findUserByEmail(email);
	if (existingUser) {
		throw createError({
			statusCode: 409,
			statusMessage: "Email sudah terdaftar",
		});
	}

	// Hash password
	const hashedPassword = await bcrypt.hash(password, 10);

	// Create user
	const user = await createUser(name, email, hashedPassword);

	// Create session (expires in 7 days)
	const token = randomUUID();
	const sessionId = randomUUID();
	const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

	await createSession(sessionId, user.id, token, expiresAt);
	setSessionCookie(event, token, expiresAt);

	return {
		statusCode: 201,
		message: "Registrasi berhasil",
		user: {
			id: user.id,
			name: user.name,
			email: user.email,
			created_at: user.created_at,
		},
	};
});
