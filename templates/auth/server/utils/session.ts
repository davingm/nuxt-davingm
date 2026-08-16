import type { H3Event } from "h3";
import { deleteCookie, getHeader, parseCookies, setCookie } from "h3";
import { type UserRecord, findSessionByToken } from "./db";

export const SESSION_COOKIE_NAME = "auth_token";

export function getSessionToken(event: H3Event): string | null {
	// Check cookie first
	const cookies = parseCookies(event);
	if (cookies[SESSION_COOKIE_NAME]) {
		return cookies[SESSION_COOKIE_NAME];
	}

	// Check Bearer authorization header
	const authHeader = getHeader(event, "authorization");
	if (authHeader?.startsWith("Bearer ")) {
		return authHeader.substring(7).trim();
	}

	return null;
}

export function setSessionCookie(
	event: H3Event,
	token: string,
	expiresAt: Date,
) {
	setCookie(event, SESSION_COOKIE_NAME, token, {
		httpOnly: true,
		sameSite: "lax",
		secure: process.env.NODE_ENV === "production",
		expires: expiresAt,
		path: "/",
	});
}

export function clearSessionCookie(event: H3Event) {
	deleteCookie(event, SESSION_COOKIE_NAME, {
		path: "/",
	});
}

export async function getUserFromEvent(
	event: H3Event,
): Promise<UserRecord | null> {
	const token = getSessionToken(event);
	if (!token) return null;

	const sessionData = await findSessionByToken(token);
	if (!sessionData) {
		clearSessionCookie(event);
		return null;
	}

	return sessionData.user;
}
