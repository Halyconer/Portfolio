// In dev, route through the Vite proxy (see vite.config.ts) so Origin/Referer
// get spoofed to the production origin and Flask's auth check passes.
// In prod, call the ngrok URL directly.
export const API_BASE_URL = import.meta.env.DEV
    ? '/api'
    : 'https://valid-goblin-full.ngrok-free.app'
