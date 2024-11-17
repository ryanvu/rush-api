import { config } from 'dotenv'
import { z } from 'zod'

// Load .env file
config()

// Define env schema with Zod
const envSchema = z.object({
  PORT: z.string().default('9871'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  
  // Supabase
  // SUPABASE_URL: z.string().url(),
  // SUPABASE_ANON_KEY: z.string().min(1),
  // SUPABASE_SERVICE_KEY: z.string().min(1),
  
  // Security
  // JWT_SECRET: z.string().min(1),
  CORS_ORIGIN: z.string().default('http://localhost:3000'),
  
  // API
  API_VERSION: z.string().default('v1'),
  API_PREFIX: z.string().default('/api')
})

// Parse and validate environment variables
const env = envSchema.safeParse(process.env)

if (!env.success) {
  console.error('❌ Invalid environment variables:', env.error.format())
  throw new Error('Invalid environment variables')
}

// Export validated environment variables
export const ENV = env.data
