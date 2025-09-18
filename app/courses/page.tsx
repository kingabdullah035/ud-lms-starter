import Image from "next/image";
import courses from "../../public/data/courses.json";

export default function Courses() {
  return (
    <section className="grid gap-4">
      <div className="overflow-hidden rounded-2xl border border-white/10">
        <Image
          src="/images/banner-grid-tan.png"
          alt="Courses banner"
          width={1600}
          height={176}
          priority
          className="w-full h-44 object-cover"
        />
      </div>

      <h1 className="text-2xl font-semibold">Courses</h1>
      <div className="grid md:grid-cols-3 gap-4">
        {(courses as any[]).map((c) => (
          <a key={c.id} href={`/courses/${c.id}`} className="rounded-2xl p-6 bg-white/5 border border-white/10 hover:bg-white/10">
            <h3 className="font-semibold">{c.title}</h3>
            <p className="text-sm text-white/70">{c.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
