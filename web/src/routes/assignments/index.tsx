// import { createFileRoute, Link } from '@tanstack/react-router'
// import { Api, type Assignment } from '@/api'

// export const Route = createFileRoute('/assignments')({
//   loader: () => Api.listAssignments(),
//   component: AssignmentsPage,
// })

// function AssignmentsPage() {
//   const items = Route.useLoaderData() as Assignment[]
//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-semibold">Assignments</h1>
//       <ul className="grid gap-4 md:grid-cols-2">
//         {items.map((a) => (
//           <li key={a.id} className="card">
//             <h3 className="font-medium">{a.title}</h3>
//             {a.description && <p className="text-sm opacity-80">{a.description}</p>}
//             <div className="mt-3">
//               <Link
//                 to="/assignments/$id"
//                 params={{ id: String(a.id) }}
//                 className="px-3 py-1 rounded border hover:bg-zinc-100 dark:hover:bg-zinc-800"
//               >
//                 View
//               </Link>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }
