// web/vite.config.ts
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import tailwind from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  // Load env vars (VITE_* are exposed to the client)
  const env = loadEnv(mode, process.cwd(), '')
  const API_BASE = env.VITE_API_BASE || 'http://localhost:4000'

  return {
    plugins: [react(), tsconfigPaths(), tailwind()],
    server: {
      port: 3000,
      strictPort: true,
      proxy: {
        // Dev-time proxy: http://localhost:3000/api -> API_BASE/api
        '/api': {
          target: API_BASE,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    preview: {
      // vite preview (optional) mirrors the same proxy
      port: 4173,
      proxy: {
        '/api': {
          target: API_BASE,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  }
})
