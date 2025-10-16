import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery, queryOptions } from '@tanstack/react-query'
import { api } from '@/lib/api'

type Course = { id: number; title: string } // adjust to your API

const coursesQ = queryOptions({
  queryKey: ['courses'],
  queryFn: () => api<Course[]>('/api/courses'),
})

function CoursesPage() {
  const { data } = useSuspenseQuery(coursesQ)
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Courses</h1>
      <ul className="mt-4 list-disc pl-6">
        {data.map(c => <li key={c.id}>{c.title}</li>)}
      </ul>
    </main>
  )
}

export const Route = createFileRoute('/courses/')({ component: CoursesPage })
