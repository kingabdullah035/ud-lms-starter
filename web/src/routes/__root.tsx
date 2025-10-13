import { Link, Outlet } from '@tanstack/react-router'

export default function Root() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <header className="border-b border-zinc-200/70 dark:border-white/10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="font-bold text-lg">UD LMS</Link>
          <nav className="flex gap-4 text-sm">
            <Link to="/" activeProps={{ className: 'underline' }}>Home</Link>
            <Link to="/courses" activeProps={{ className: 'underline' }}>Courses</Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>

      <footer className="container mx-auto px-4 py-8 text-zinc-500">
        © 2025 UD LMS
      </footer>
    </div>
  )
}
