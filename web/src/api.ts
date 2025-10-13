async function getJSON<T>(path: string, init?: RequestInit): Promise<T> {
    const res = await fetch(path, { headers: { Accept: 'application/json' }, ...init })
    if (!res.ok) throw new Error(`${path} -> ${res.status}`)
    return res.json() as Promise<T>
  }
  
  export type Assignment = { id: string; title: string; description?: string; dueDate?: string }
  export type Course = { id: string; code?: string; title: string; description?: string }
  
  export const Api = {
    listAssignments: () => getJSON<Assignment[]>('/api/assignments'),
    getAssignment: (id: string) => getJSON<Assignment>(`/api/assignments/${id}`),
    listCourses: () => getJSON<Course[]>('/api/courses'),
    getCourse: (id: string) => getJSON<Course>(`/api/courses/${id}`),
  }
  