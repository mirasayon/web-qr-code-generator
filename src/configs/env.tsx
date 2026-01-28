const env = process.env;
export const EnvConfig = {
    gaid: env.GOOGLE_ANALYTICS_ID as string,
    // gtm_id = env.GOOGLE_TAG_MANAGER_ID as string;
    NODE_ENV: env.NODE_ENV as "development" | "production" | "test",
    mode: {
        prod: env.NODE_ENV === "production",
        dev: env.NODE_ENV === "development",
        test: env.NODE_ENV === "test",
    },
};
