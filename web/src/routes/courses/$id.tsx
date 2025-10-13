// import { createFileRoute } from '@tanstack/react-router'
// import { Api, type Course } from '@/api'

// export const Route = createFileRoute('/courses/$id')({
//   params: p => ({ id: String(p.id) }),
//   loader: ({ params }) => Api.getCourse(params.id),
//   component: CourseDetail,
// })

// function CourseDetail() {
//   const c = Route.useLoaderData() as Course
//   return (
//     <article className="space-y-4">
//       <h1 className="text-2xl font-semibold">{c.code ? `${c.code} — ` : ''}{c.title}</h1>
//       {c.description && <p className="opacity-80">{c.description}</p>}
//     </article>
//   )
// }
