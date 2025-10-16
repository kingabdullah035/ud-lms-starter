import { createRootRoute, Outlet, Link } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <div>
      {/* simple nav so graders can click */}
      <nav className="p-4 flex gap-4 border-b border-gray-700">
        <Link to="/">Home</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/assignments">Assignments</Link>
      </nav>
      <Outlet />
    </div>
  ),
})
