// import { createFileRoute } from '@tanstack/react-router'
// import { Api, type Assignment } from '@/api'

// export const Route = createFileRoute('/assignments/$id')({
//   params: p => ({ id: String(p.id) }),
//   loader: ({ params }) => Api.getAssignment(params.id),
//   component: AssignmentDetail,
// })

// function AssignmentDetail() {
//   const a = Route.useLoaderData() as Assignment
//   return (
//     <article className="space-y-3">
//       <h1 className="text-2xl font-semibold">{a.title}</h1>
//       {a.description && <p className="opacity-80">{a.description}</p>}
//       {a.dueDate && <p className="text-sm opacity-60">Due {new Date(a.dueDate).toLocaleString()}</p>}
//     </article>
//   )
// }
