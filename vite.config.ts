import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [react(), tailwindcss()],
    base: '/',
    resolve: {
        alias: {
            '@': '/src',
        },
    },
    server: {
        // Dev proxy for the Pi backend. Flask's `check_auth` (backend/app.py)
        // hard-checks Origin/Referer against ALLOWED_ORIGIN. The browser's
        // request from localhost would carry Origin: http://localhost:5173,
        // which Flask 403s.
        //
        // The `headers` config option on http-proxy only *adds* headers; it
        // doesn't reliably overwrite the Origin the browser already attached.
        // Using the proxyReq event with setHeader() forces a replace, which
        // is the bulletproof path.
        proxy: {
            '/api': {
                target: 'https://api.adrianeddy.com',
                changeOrigin: true,
                secure: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
                configure: (proxy) => {
                    proxy.on('proxyReq', (proxyReq) => {
                        proxyReq.setHeader('Origin', 'https://www.adrianeddy.com')
                        proxyReq.setHeader(
                            'Referer',
                            'https://www.adrianeddy.com/'
                        )
                    })
                },
            },
        },
    },
})
