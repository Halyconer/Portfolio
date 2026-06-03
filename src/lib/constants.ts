// In dev, route through the Vite proxy (see vite.config.ts) so Origin/Referer
// get spoofed to the production origin and Flask's auth check passes.
// In prod, call the configured API URL (override via VITE_API_URL env var).
const PROD_DEFAULT = 'https://api.adrianeddy.com'

export const API_BASE_URL = import.meta.env.DEV
    ? '/api'
    : (import.meta.env.VITE_API_URL ?? PROD_DEFAULT)
