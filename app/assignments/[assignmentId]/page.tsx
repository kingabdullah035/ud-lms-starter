import assignments from "../../../public/data/assignments.json";
import quizzes from "../../../public/data/quizzes.json";

export default function AssignmentDetail({ params }: { params: { assignmentId: string } }) {
  const a = (assignments as any[]).find(x => x.id === params.assignmentId);
  const q = (quizzes as any[]).find(x => x.assignmentId === params.assignmentId);
  if (!a) return <div>Not found</div>;
  return (
    <section className="grid gap-4">
      <h1 className="text-2xl font-semibold">{a.title}</h1>
      <p className="text-white/80">{a.description}</p>
      <div className="flex gap-3">
        <a className="rounded-xl px-4 py-2 bg-white text-black" href={`/assignments/${a.id}/submit`}>Submit</a>
        {q && <a className="rounded-xl px-4 py-2 border border-white/20" href={`/quizzes/${q.id}`}>Take Quiz</a>}
      </div>
    </section>
  );
}
