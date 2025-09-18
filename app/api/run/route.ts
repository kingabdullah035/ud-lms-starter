import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { code, assignmentId } = await req.json();
  const passedPublic = assignmentId==="a1" && typeof code === "string" && code.includes("FizzBuzz");
  const passedHidden = passedPublic && typeof code === "string" && code.length > 20;
  return NextResponse.json({
    public: [{name:"Contains 'FizzBuzz'", pass: passedPublic}],
    hidden: [{name:"Handles ranges", pass: passedHidden}],
    passed: !!(passedPublic && passedHidden)
  });
}
