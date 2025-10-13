import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import tailwind from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const API_BASE = env.VITE_API_BASE || 'http://localhost:4000'

  return {
    plugins: [react(), tsconfigPaths(), tailwind()],
    server: {
      port: 3000,
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
