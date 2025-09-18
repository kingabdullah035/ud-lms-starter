# Sitemap & Navigation

```mermaid
flowchart TD
    A[Login /login] --> B[Dashboard /dashboard]
    B --> C[Courses /courses]
    C --> C1[Course Detail /courses/[courseId]]
    C1 --> D[Assignments /assignments]
    D --> E[Assignment Detail /assignments/[assignmentId]]
    E --> F[Submit /assignments/[assignmentId]/submit]
    E --> G[Quiz /quizzes/[quizId]]
    B --> H[Submissions /submissions]
    B --> I[Profile /profile]
```
