// web/src/routes/courses/index.tsx
import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery, queryOptions } from '@tanstack/react-query'
import type { QueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'

type Course = { id: string; code: string; title: string; description?: string; term?: string }

const coursesQ = queryOptions({
  queryKey: ['courses'],
  queryFn: () => api.courses() as Promise<Course[]>,
})

function CoursesPage() {
  const { data } = useSuspenseQuery(coursesQ)
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Courses</h1>
      <ul className="mt-4 space-y-3">
        {data.map((c) => (
          <li key={c.id} className="rounded-lg border p-4 hover:bg-gray-50 transition">
            <div className="text-lg font-medium">{c.title}</div>
            <div className="text-sm text-gray-500">
              {c.code}{c.term ? ` • ${c.term}` : ''}
            </div>
            {c.description ? <p className="mt-1 text-sm text-gray-700 line-clamp-2">{c.description}</p> : null}
          </li>
        ))}
      </ul>
    </main>
  )
}

type LoaderCtx = { context: { queryClient: QueryClient } }

export const Route = createFileRoute('/courses/')({
  loader: (ctx: LoaderCtx) => ctx.context.queryClient.ensureQueryData(coursesQ),
  component: CoursesPage,
})
