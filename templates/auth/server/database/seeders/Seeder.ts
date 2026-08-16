export abstract class Seeder {
	abstract run(): Promise<void>;
}
