"use client";
import quizzes from "../../../public/data/quizzes.json";
import { useState } from "react";

export default function QuizPage({ params }: any) {
  const q = (quizzes as any[]).find((x) => x.id === params.quizId);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [score, setScore] = useState<number | null>(null);

  if (!q) return <div>Not found</div>;

  async function submit() {
    const r = await fetch("/api/quiz-takes", { method: "POST", body: JSON.stringify({ quizId: q.id, answers }) });
    const data = await r.json();
    setScore(data.score);
  }

  return (
    <section className="grid gap-4">
      <h1 className="text-2xl font-semibold">{q.title}</h1>
      {q.questions.map((qq: any, idx: number) => (
        <div key={qq.id} className="rounded-xl p-4 bg-white/5 border border-white/10">
          <div className="font-medium">{idx + 1}. {qq.prompt}</div>
          <div className="mt-2 grid gap-2">
            {qq.options.map((opt: string, i: number) => (
              <label key={i} className="flex items-center gap-2">
                <input type="radio" name={qq.id} onChange={() => setAnswers({ ...answers, [qq.id]: i })} />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
      <button className="rounded-xl px-4 py-2 bg-white text-black" onClick={submit}>Submit Quiz</button>
      {score !== null && <div className="text-lg">Score: {score}</div>}
    </section>
  );
}
