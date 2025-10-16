// web/src/routes/assignments/index.tsx
import { createFileRoute } from '@tanstack/react-router'

function AssignmentsPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Assignments</h1>
      <p>Hooked up once the route is registered.</p>
    </main>
  )
}

// NOTE: For a folder index route the routeId is '/assignments/'
// (your routeTree shows courses id is '/courses/' — same pattern)
export const Route = createFileRoute('/assignments/')({
  component: AssignmentsPage,
})
