import { serve } from '@hono/node-server'
import { app } from './app'
import { ENV } from './shared/config/env'

const port = Number(ENV.PORT)

console.log(`Server is running on port ${port} in ${ENV.NODE_ENV} mode`)

serve({
  fetch: app.fetch,
  port
})

