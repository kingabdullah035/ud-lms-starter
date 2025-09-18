# Data Model (ERD)

```mermaid
erDiagram
    USER ||--o{ ENROLLMENT : enrolls
    COURSE ||--o{ ENROLLMENT : has
    COURSE ||--o{ ASSIGNMENT : includes
    ASSIGNMENT ||--o{ SUBMISSION : receives
    USER ||--o{ SUBMISSION : makes
    ASSIGNMENT ||--o{ QUIZ : may_have
    QUIZ ||--o{ QUIZTAKE : attempts
    SUBMISSION ||--|| FEEDBACK : gets

    USER {
      string id PK
      string name
      string email
      enum role  // learner|instructor|admin
    }

    COURSE {
      string id PK
      string title
      string description
    }

    ENROLLMENT {
      string id PK
      string userId FK
      string courseId FK
      string roleOverride  // optional
    }

    ASSIGNMENT {
      string id PK
      string courseId FK
      string title
      string description
      datetime dueAt
      enum type // file|code|video|mixed
    }

    SUBMISSION {
      string id PK
      string assignmentId FK
      string userId FK
      string codeUrl // or fileUrl
      string videoUrl // optional
      json  results   // test outcomes
      datetime submittedAt
      enum status // draft|submitted|graded
    }

    FEEDBACK {
      string id PK
      string submissionId FK
      string instructorId FK
      text comments
      int score
      json rubric
      datetime releasedAt
    }

    QUIZ {
      string id PK
      string assignmentId FK
      string title
      json questions
    }

    QUIZTAKE {
      string id PK
      string quizId FK
      string userId FK
      json answers
      int score
      datetime takenAt
    }
```
