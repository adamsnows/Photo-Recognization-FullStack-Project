import { z } from "zod";

const envs = z.object({
    NODE_ENV: z.enum(["development", "production"]),
    PORT: z.coerce.number(),
    HOST: z.string().default("0.0.0.0"),
    API_URL: z.string().default("http://localhost:3333"),
});

export const parsedEnvs = Object.freeze(envs.parse(process.env))