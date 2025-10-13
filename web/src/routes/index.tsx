export default function Home() {
  return (
    <section className="space-y-6">
      <div className="rounded-2xl p-8 bg-gradient-to-b from-zinc-800/20 to-zinc-900/10 dark:from-zinc-800/50 dark:to-zinc-900/50">
        <h1 className="text-3xl md:text-4xl font-semibold">Learn Computer Science, the elegant way.</h1>
        <p className="mt-2 text-zinc-500">Courses, assignments, code runner submissions, quizzes, and feedback—all in one place.</p>
        <div className="mt-4 flex gap-3">
          <a href="/courses" className="px-4 py-2 rounded-lg bg-white text-zinc-900 dark:bg-zinc-100">
            Browse Courses
          </a>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {[
          { title: 'Assignments', desc: 'Beautiful UI with fast workflows.' },
          { title: 'Quizzes', desc: 'Beautiful UI with fast workflows.' },
          { title: 'Feedback', desc: 'Beautiful UI with fast workflows.' },
        ].map((c) => (
          <div key={c.title} className="card">
            <div className="text-lg font-medium">{c.title}</div>
            <div className="text-zinc-500">{c.desc}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
