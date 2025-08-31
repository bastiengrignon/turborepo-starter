import { z } from 'zod';

const DEFAULT_PORT = '4000';
const SECRET_LENGTH = 32;

import 'dotenv/config';

const envSchema = z.object({
  PORT: z.string().default(DEFAULT_PORT),
  DATABASE_URL: z.string(),
  BETTER_AUTH_SECRET: z.string().length(SECRET_LENGTH),
  BETTER_AUTH_URL: z.url(),
  ENV: z.union([z.literal('development'), z.literal('production'), z.literal('test')]).default('development'),
});

const env = envSchema.parse(process.env);

export default env;
export type Environment = z.infer<typeof envSchema>;
