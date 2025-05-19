const env = process.env;
class EnvConfigClass {
	gaid = env.GOOGLE_ANALYTICS_ID as string;
	// gtm_id = env.GOOGLE_TAG_MANAGER_ID as string;
	NODE_ENV = env.NODE_ENV as "development" | "production" | "test";
	// server = {};
	mode = {
		prod: this.NODE_ENV === "production",
		dev: this.NODE_ENV === "development",
		test: this.NODE_ENV === "test",
	};
}
/** Environment variables */
export const EnvConfig = new EnvConfigClass();
