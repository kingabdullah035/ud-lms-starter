import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const { assignmentId, code, videoUrl } = await req.json();
  return NextResponse.json({
    submissionId: crypto.randomUUID(),
    assignmentId,
    status: "submitted",
    results: { note: "Stored; instructor will review hidden tests" },
    videoUrl: videoUrl || null,
    snippet: typeof code === "string" ? code.slice(0,80) : null
  }, { status: 201 });
}
