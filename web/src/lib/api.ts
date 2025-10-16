// web/src/lib/api.ts
const BASE = import.meta.env.VITE_API_BASE ?? '' // '' in dev if proxying to local
export const api = {
  courses: async () => {
    const r = await fetch(`${BASE}/api/courses`, { credentials: 'include' })
    if (!r.ok) throw new Error(`GET /api/courses ${r.status}`)
    return r.json()
  },
  assignments: async () => {
    const r = await fetch(`${BASE}/api/assignments`, { credentials: 'include' })
    if (!r.ok) throw new Error(`GET /api/assignments ${r.status}`)
    return r.json()
  },
}
