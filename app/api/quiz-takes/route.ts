import quizzes from "../../../public/data/quizzes.json";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { quizId, answers } = await req.json();
  const q = (quizzes as any[]).find(x => x.id === quizId);
  if (!q) return new NextResponse("Not found", { status: 404 });

  const correct: Record<string, number> = { "q1-1": 2, "q1-2": 0 };
  let score = 0;
  Object.keys(correct).forEach((k) => { if (answers?.[k] === correct[k]) score++; });
  return NextResponse.json({ score, breakdown: correct });
}
