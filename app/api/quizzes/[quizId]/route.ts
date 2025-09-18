






import quizzes from "../../../../public/data/quizzes.json";
import { NextResponse } from "next/server";

// Loosen the context type to avoid validator complaints
export async function GET(_: Request, ctx: any) {
  const { params } = ctx as { params: { quizId: string } };
  const q = (quizzes as any[]).find((x) => x.id === params.quizId);
  if (!q) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(q);
}
