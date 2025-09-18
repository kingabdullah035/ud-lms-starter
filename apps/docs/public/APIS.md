# API Contracts (Route Handlers)

- `POST /api/submissions`
  - body: { assignmentId, code?, fileUrl?, videoUrl? }
  - returns: { submissionId, results, status }

- `POST /api/run`
  - body: { language, code, assignmentId }
  - returns: { public: [...], hidden: [...], passed }

- `GET /api/quizzes/[quizId]`
  - returns: { id, title, questions: [{id, prompt, options, correct?}] } // correct optional for learners

- `POST /api/quiz-takes`
  - body: { quizId, answers: [{questionId, choice}] }
  - returns: { score, breakdown }
