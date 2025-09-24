
import { PrismaClient, AssignmentType, ProgrammingLanguage, Role, Visibility } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Wipe order respects FKs
  await prisma.testResult.deleteMany();
  await prisma.submissionProblem.deleteMany();
  await prisma.feedback.deleteMany();
  await prisma.grade.deleteMany();
  await prisma.testCase.deleteMany();
  await prisma.problem.deleteMany();
  await prisma.rubricCriterion.deleteMany();
  await prisma.submission.deleteMany();
  await prisma.assignment.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();

  // --- Users ---
  const admin = await prisma.user.create({
    data: {
      email: 'admin@udel.edu',
      name: 'System Admin',
      isAdmin: true,
      avatarUrl: faker.image.avatar(),
    },
  });

  const instructors = await Promise.all(
    Array.from({ length: 3 }).map(() =>
      prisma.user.create({
        data: {
          email: faker.internet.email({ firstName: faker.person.firstName(), lastName: faker.person.lastName(), provider: 'udel.edu' }),
          name: faker.person.fullName(),
          avatarUrl: faker.image.avatar(),
        },
      })
    )
  );

  const learners = await Promise.all(
    Array.from({ length: 14 }).map(() =>
      prisma.user.create({
        data: {
          email: faker.internet.email({ firstName: faker.person.firstName(), lastName: faker.person.lastName(), provider: 'udel.edu' }),
          name: faker.person.fullName(),
          avatarUrl: faker.image.avatar(),
        },
      })
    )
  );

  // Include you as a user
  const abdullah = await prisma.user.create({
    data: {
      email: 'amaruf@udel.edu',
      name: 'Abdullah Maruf',
      avatarUrl: faker.image.avatar(),
    },
  });

  // --- Courses ---
  const now = new Date();
  const fallStart = new Date(now.getFullYear(), 7, 26); // late Aug
  const fallEnd = new Date(now.getFullYear(), 11, 15);  // mid Dec

  const [cisc474, cisc361, sandboxCourse] = await Promise.all([
    prisma.course.create({
      data: {
        code: 'CISC-474-010',
        title: 'Advanced Web Technologies',
        description: 'Project-based course on modern web apps, TypeScript, Next.js, and cloud.',
        term: `Fall ${now.getFullYear()}`,
        startDate: fallStart,
        endDate: fallEnd,
        visibility: Visibility.PUBLISHED,
      },
    }),
    prisma.course.create({
      data: {
        code: 'CISC-361-020',
        title: 'Operating Systems',
        description: 'Processes, scheduling, xv6 labs, C programming.',
        term: `Fall ${now.getFullYear()}`,
        startDate: fallStart,
        endDate: fallEnd,
        visibility: Visibility.PUBLISHED,
      },
    }),
    prisma.course.create({
      data: {
        code: 'SANDBOX-000',
        title: 'Playground Course',
        description: 'Intentionally has no assignments (edge case).',
        term: `Fall ${now.getFullYear()}`,
        startDate: fallStart,
        endDate: fallEnd,
        visibility: Visibility.PUBLISHED,
      },
    }),
  ]);

  // --- Enrollments ---
  const enroll = async (userId: string, courseId: string, role: Role) =>
    prisma.enrollment.create({ data: { userId, courseId, role } });

  await Promise.all([
    enroll(instructors[0].id, cisc474.id, Role.INSTRUCTOR),
    enroll(abdullah.id,        cisc474.id, Role.LEARNER),
    ...learners.slice(0, 8).map(u => enroll(u.id, cisc474.id, Role.LEARNER)),
    enroll(instructors[1].id, cisc361.id, Role.INSTRUCTOR),
    ...learners.slice(8).map(u => enroll(u.id, cisc361.id, Role.LEARNER)),
    enroll(instructors[2].id, sandboxCourse.id, Role.INSTRUCTOR),
  ]);

  // --- Assignments (mix types) ---
  const a1 = await prisma.assignment.create({
    data: {
      courseId: cisc474.id,
      title: 'LMS MVP Proposal',
      type: AssignmentType.URL,
      description: 'Submit a public doc link describing your LMS MVP scope.',
      points: 50,
      availableAt: faker.date.soon({ days: 1, refDate: fallStart }),
      dueAt: faker.date.soon({ days: 14, refDate: fallStart }),
    },
  });

  const a2 = await prisma.assignment.create({
    data: {
      courseId: cisc474.id,
      title: 'Programming Problem Set 1',
      type: AssignmentType.CODE, // Unique: auto-tests
      description: 'Solve two problems: FizzBuzz variants & Roman Numerals.',
      points: 100,
      availableAt: faker.date.soon({ days: 3, refDate: fallStart }),
      dueAt: faker.date.soon({ days: 24, refDate: fallStart }),
      latePenaltyPct: 10,
    },
  });

  const a3 = await prisma.assignment.create({
    data: {
      courseId: cisc474.id,
      title: 'Design Notebook 01',
      type: AssignmentType.NOTEBOOK,
      description: 'Reflect on your design decisions (Markdown or .ipynb).',
      points: 30,
      availableAt: faker.date.soon({ days: 6, refDate: fallStart }),
      dueAt: faker.date.soon({ days: 18, refDate: fallStart }),
    },
  });

  const a4 = await prisma.assignment.create({
    data: {
      courseId: cisc361.id,
      title: 'Syscall Report (PDF)',
      type: AssignmentType.FILE_UPLOAD,
      description: 'Write-up on adding a new xv6 system call.',
      points: 80,
      availableAt: faker.date.soon({ days: 2, refDate: fallStart }),
      dueAt: faker.date.soon({ days: 20, refDate: fallStart }),
    },
  });

  // --- Rubrics (for a2) ---
  await prisma.rubricCriterion.createMany({
    data: [
      { assignmentId: a2.id, order: 1, label: 'Correctness', maxPoints: 70, description: 'Passes public & hidden tests' },
      { assignmentId: a2.id, order: 2, label: 'Code Quality', maxPoints: 20, description: 'Readable, idiomatic, documented' },
      { assignmentId: a2.id, order: 3, label: 'Edge Cases', maxPoints: 10, description: 'Handles tricky inputs' },
    ],
  });

  // --- Problems + Test Cases (for CODE assignment a2) ---
  const fizz = await prisma.problem.create({
    data: {
      assignmentId: a2.id,
      order: 1,
      title: 'FizzBuzz Extended',
      prompt: 'Print numbers 1..n; multiples of 3 -> Fizz, 5 -> Buzz, both -> FizzBuzz.',
      maxPoints: 50,
      language: ProgrammingLanguage.TYPESCRIPT,
      starterCode: `export function fizzbuzz(n: number): string[] { /* your code */ return []; }`,
      timeLimitMs: 2000,
      memoryLimitMb: 256,
    },
  });

  const roman = await prisma.problem.create({
    data: {
      assignmentId: a2.id,
      order: 2,
      title: 'Roman to Integer',
      prompt: 'Convert Roman numerals to integers.',
      maxPoints: 50,
      language: ProgrammingLanguage.TYPESCRIPT,
      starterCode: `export function romanToInt(s: string): number { /* your code */ return 0; }`,
      timeLimitMs: 2000,
      memoryLimitMb: 256,
    },
  });

  await prisma.testCase.createMany({
    data: [
      // FizzBuzz cases
      { problemId: fizz.id, name: 'n=5', input: JSON.stringify({ n: 5 }), expected: JSON.stringify(['1','2','Fizz','4','Buzz']), weight: 1, hidden: false },
      { problemId: fizz.id, name: 'n=15', input: JSON.stringify({ n: 15 }), expected: JSON.stringify(['1','2','Fizz','4','Buzz','Fizz','7','8','Fizz','Buzz','11','Fizz','13','14','FizzBuzz']), weight: 2, hidden: true },
      // Roman cases
      { problemId: roman.id, name: 'III', input: JSON.stringify({ s: 'III' }), expected: JSON.stringify(3), weight: 1, hidden: false },
      { problemId: roman.id, name: 'MCMXCIV', input: JSON.stringify({ s: 'MCMXCIV' }), expected: JSON.stringify(1994), weight: 2, hidden: true },
    ],
  });

  // --- Submissions for a2 (mixed quality & timing) ---
  const enrolled474 = await prisma.enrollment.findMany({ where: { courseId: cisc474.id, role: Role.LEARNER } });

  // Helper to fabricate CODE payload
  const codePayload = (good: boolean) => ({
    type: 'CODE',
    language: 'TYPESCRIPT',
    entrypoint: 'index.ts',
    files: [
      {
        path: 'index.ts',
        content: good
          ? `export function fizzbuzz(n:number){const out=[] as string[];for(let i=1;i<=n;i++){let s="";if(i%3===0)s+="Fizz";if(i%5===0)s+="Buzz";out.push(s||String(i))}return out}
export function romanToInt(s:string){const m=new Map([['I',1],['V',5],['X',10],['L',50],['C',100],['D',500],['M',1000]]);let ans=0;for(let i=0;i<s.length;i++){const v=m.get(s[i])!, nxt=m.get(s[i+1]||'')||0;ans+= v < nxt ? -v : v;}return ans;}
`
          : `export function fizzbuzz(n:number){return Array(n).fill("1")} // buggy
export function romanToInt(s:string){return 0} // todo
`,
      },
    ],
  });

  // Create a mix: some great, some partial, some late resubmits
  for (const [idx, enr] of enrolled474.entries()) {
    const goodFirstTry = idx % 3 !== 0;
    const submitDate = faker.date.soon({ days: 22, refDate: a2.availableAt ?? fallStart });
    const isLate = a2.dueAt ? submitDate > a2.dueAt : false;

    const s1 = await prisma.submission.create({
      data: {
        assignmentId: a2.id,
        userId: enr.userId,
        attempt: 1,
        submittedAt: submitDate,
        isLate,
        payload: codePayload(goodFirstTry),
        status: 'AUTOGRADED',
      },
    });

    // Fake auto-grading results: pass rates vary
    const testCases = await prisma.testCase.findMany({ where: { problem: { assignmentId: a2.id } } });
    let autoScore = 0;
    for (const tc of testCases) {
      const passed = goodFirstTry ? true : faker.number.int({ min: 0, max: 1 }) === 1;
      if (passed) autoScore += tc.weight * 100 / testCases.reduce((a, b) => a + b.weight, 0); // normalized to 100
      await prisma.testResult.create({
        data: {
          submissionId: s1.id,
          testCaseId: tc.id,
          passed,
          runtimeMs: faker.number.int({ min: 20, max: 300 }),
          memoryMb: faker.number.int({ min: 50, max: 180 }),
          stdout: passed ? 'ok' : 'mismatch',
          stderr: passed ? '' : 'AssertionError',
        },
      });
    }

    // Per-problem scores (roughly split)
    const fizzPortion = autoScore * 0.5;
    const romanPortion = autoScore * 0.5;
    await prisma.submissionProblem.createMany({
      data: [
        { submissionId: s1.id, problemId: fizz.id, autoScore: fizzPortion, manualScore: 0, score: fizzPortion },
        { submissionId: s1.id, problemId: roman.id, autoScore: romanPortion, manualScore: 0, score: romanPortion },
      ],
    });

    const manualAdj = goodFirstTry ? 15 : faker.number.int({ min: 0, max: 10 });
    const latePenalty = isLate && a2.latePenaltyPct ? (a2.latePenaltyPct / 100) * (autoScore + manualAdj) : 0;
    const finalScore = Math.max(0, autoScore + manualAdj - latePenalty);

    await prisma.feedback.create({
      data: {
        submissionId: s1.id,
        authorId: instructors[0].id,
        body: goodFirstTry
          ? 'Great job! Clean, idiomatic TypeScript. Nice function decomposition.'
          : 'Partial solution: FizzBuzz prints incorrectly, RomanToInt missing logic. See inline hints.',
        inlineHints: goodFirstTry ? undefined : [{ line: 1, message: 'Return correct array length.' }],
      },
    });

    await prisma.grade.create({
      data: {
        submissionId: s1.id,
        userId: enr.userId,
        assignmentId: a2.id,
        score: Number(finalScore.toFixed(1)),
        graderId: instructors[0].id,
      },
    });

    // Some students do a second (late) attempt that improves score
    if (!goodFirstTry && idx % 4 === 0 && a2.allowResubmit) {
      const s2 = await prisma.submission.create({
        data: {
          assignmentId: a2.id,
          userId: enr.userId,
          attempt: 2,
          submittedAt: faker.date.soon({ days: 28, refDate: a2.availableAt ?? fallStart }),
          isLate: true,
          payload: codePayload(true),
          status: 'AUTOGRADED',
        },
      });

      // Perfect on resubmission
      for (const tc of testCases) {
        await prisma.testResult.create({
          data: {
            submissionId: s2.id,
            testCaseId: tc.id,
            passed: true,
            runtimeMs: faker.number.int({ min: 15, max: 80 }),
            memoryMb: faker.number.int({ min: 40, max: 120 }),
            stdout: 'ok',
            stderr: '',
          },
        });
      }

      await prisma.submissionProblem.createMany({
        data: [
          { submissionId: s2.id, problemId: fizz.id, autoScore: 50, manualScore: 15, score: 65 },
          { submissionId: s2.id, problemId: roman.id, autoScore: 50, manualScore: 10, score: 60 },
        ],
      });

      const s2Final = 100 + 25 - (a2.latePenaltyPct ?? 0); // auto 100 + manual 25 - late penalty%
      await prisma.feedback.create({
        data: {
          submissionId: s2.id,
          authorId: instructors[0].id,
          body: 'Much improved! All tests pass. Late penalty applied.',
        },
      });

      await prisma.grade.create({
        data: {
          submissionId: s2.id,
          userId: enr.userId,
          assignmentId: a2.id,
          score: Math.max(0, s2Final),
          graderId: instructors[0].id,
        },
      });
    }
  }

  // A couple URL / NOTEBOOK / FILE_UPLOAD submissions for variety
  const someLearner = enrolled474[0]?.userId ?? abdullah.id;
  await prisma.submission.create({
    data: {
      assignmentId: a1.id,
      userId: someLearner,
      attempt: 1,
      submittedAt: faker.date.soon({ days: 10, refDate: a1.availableAt ?? fallStart }),
      payload: { type: 'URL', url: 'https://docs.google.com/document/d/lms-mvp' },
      status: 'GRADED',
      autoScore: null,
      manualScore: 45,
      finalScore: 45,
      isLate: false,
    },
  });

  const c361Learner = (await prisma.enrollment.findFirst({ where: { courseId: cisc361.id, role: Role.LEARNER } }))!;
  await prisma.submission.create({
    data: {
      assignmentId: a4.id,
      userId: c361Learner.userId,
      attempt: 1,
      submittedAt: faker.date.soon({ days: 15, refDate: a4.availableAt ?? fallStart }),
      payload: {
        type: 'FILE_UPLOAD',
        files: [{ filename: 'syscall-report.pdf', size: 240_000, storageKey: 'uploads/abc.pdf' }],
      },
      status: 'GRADED',
      manualScore: 72,
      finalScore: 72,
      isLate: false,
    },
  });

  console.log('✅ Seed complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
