import quizzes from "../../../../public/data/quizzes.json";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { quizId: string }}) {
  const q = (quizzes as any[]).find(x => x.id === params.quizId);
  if (!q) return new NextResponse("Not found", { status: 404 });
  const safe = { ...q };
  return NextResponse.json(safe);
}
