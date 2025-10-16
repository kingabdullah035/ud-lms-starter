const API_BASE =
  (import.meta.env.VITE_API_BASE ?? '').replace(/\/$/, '') // strip trailing slash

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}/api${path}`, { headers: { Accept: 'application/json' } })
  if (!res.ok) throw new Error(await res.text())
  return res.json() as Promise<T>
}

export const api = {
  courses: () => getJson('/courses'),
  assignments: () => getJson('/assignments'),
}
