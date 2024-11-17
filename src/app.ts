import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import { prettyJSON } from 'hono/pretty-json'
import { ENV } from './shared/config/env'

// Type for Hono env
type Bindings = {
  ENV: typeof ENV
}

// Create app with env bindings
const app = new Hono<{ Bindings: Bindings }>()

// Add env to context
app.use('*', async (c, next) => {
  c.env = { ENV }
  await next()
})

app.use('*', logger())
app.use('*', cors({
  origin: ENV.CORS_ORIGIN
}))
app.use('*', prettyJSON())

app.get('/', (c) => {
  return c.json({ 
    message: 'Rush API',
    version: c.env.ENV.API_VERSION,
    environment: c.env.ENV.NODE_ENV
  })
})

export { app }
