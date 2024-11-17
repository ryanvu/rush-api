import { ENV } from '../config/env';

declare module 'hono' {
  interface ContextVariableMap {
    ENV: typeof ENV
  }
}
