import bcrypt from "bcryptjs";
import { createUser, findUserByEmail } from "../../utils/db";
import { Seeder } from "./Seeder";

export class UserSeeder extends Seeder {
	async run(): Promise<void> {
		const adminEmail = "admin@example.com";
		const adminPassword = "password";
		const adminName = "Admin";

		const existing = await findUserByEmail(adminEmail);
		if (existing) {
			console.log(`  [UserSeeder] Pengguna admin (${adminEmail}) sudah ada.`);
			return;
		}

		const hashedPassword = await bcrypt.hash(adminPassword, 10);
		await createUser(adminName, adminEmail, hashedPassword);
		console.log(
			`  [UserSeeder] Pengguna admin (${adminEmail}) berhasil dibuat.`,
		);
	}
}
