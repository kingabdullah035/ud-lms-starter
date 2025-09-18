"use client";
import { useState } from "react";

export default function SubmitPage({ params }: { params: { assignmentId: string } }) {
  const [code, setCode] = useState("// write your solution here");
  const [videoUrl, setVideoUrl] = useState("");
  const [result, setResult] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);

  async function run() {
    const r = await fetch("/api/run", { method: "POST", body: JSON.stringify({ language: "javascript", code, assignmentId: params.assignmentId }) });
    const data = await r.json();
    setResult(data);
  }

  async function submit() {
    setSubmitting(true);
    const r = await fetch("/api/submissions", { method: "POST", body: JSON.stringify({ assignmentId: params.assignmentId, code, videoUrl }) });
    const data = await r.json();
    setSubmitting(false);
    setResult(data);
  }

  return (
    <section className="grid gap-4">
      <h1 className="text-2xl font-semibold">Submit: {params.assignmentId}</h1>
      <textarea value={code} onChange={e=>setCode(e.target.value)} className="min-h-[200px] rounded-xl p-3 bg-black/30 border border-white/10 font-mono" />
      <input value={videoUrl} onChange={e=>setVideoUrl(e.target.value)} placeholder="Optional video explanation URL" className="rounded-xl px-3 py-2 bg-black/30 border border-white/10" />
      <div className="flex gap-3">
        <button onClick={run} className="rounded-xl px-4 py-2 border border-white/20">Run Tests</button>
        <button disabled={submitting} onClick={submit} className="rounded-xl px-4 py-2 bg-white text-black">{submitting?"Submitting...":"Submit"}</button>
      </div>
      {result && (
        <pre className="rounded-xl p-3 bg-black/30 border border-white/10 whitespace-pre-wrap text-sm">{JSON.stringify(result, null, 2)}</pre>
      )}
    </section>
  );
}
