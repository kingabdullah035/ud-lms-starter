import assignments from "../../../public/data/assignments.json";

export default function CourseDetail({ params }: { params: { courseId: string } }) {
  const list = (assignments as any[]).filter(a => a.courseId === params.courseId);
  return (
    <section className="grid gap-4">
      <h1 className="text-2xl font-semibold">Course: {params.courseId}</h1>
      <div className="grid gap-3">
        {list.map(a => (
          <a key={a.id} href={`/assignments/${a.id}`} className="rounded-xl p-4 bg-white/5 border border-white/10 hover:bg-white/10">
            <div className="font-medium">{a.title}</div>
            <div className="text-sm text-white/70">{a.description}</div>
          </a>
        ))}
      </div>
    </section>
  );
}
