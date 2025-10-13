import { createRouter, createRootRoute, createRoute } from '@tanstack/react-router'
import Root from './routes/__root'
import Home from './routes/index'
import Courses from './routes/courses/index'

// root route
const rootRoute = createRootRoute({
  component: Root,
})

// children
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
})

const coursesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/courses',
  component: Courses,
})

const routeTree = rootRoute.addChildren([homeRoute, coursesRoute])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
