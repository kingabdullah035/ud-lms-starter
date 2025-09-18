import Image from "next/image";

export default function Home() {
  return (
    <section className="grid gap-6">
      <div className="relative rounded-2xl overflow-hidden p-10 bg-white/5 border border-white/10 shadow-lg">
        {/* background image */}
        <Image
          src="/images/hero-vintage-waves.png"
          alt=""
          fill
          priority
          className="object-cover opacity-40"
        />
        {/* content */}
        <div className="relative">
          <h1 className="text-3xl font-bold">Learn Computer Science, the elegant way.</h1>
          <p className="mt-2 text-white/80">
            Courses, assignments, code runner submissions, quizzes, and feedback—all in one place.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="/login" className="rounded-xl px-4 py-2 bg-white text-black font-medium">Get Started</a>
            <a href="/courses" className="rounded-xl px-4 py-2 border border-white/20">Browse Courses</a>
          </div>
        </div>
      </div>

      {/* feature cards */}
      <div className="grid md:grid-cols-3 gap-4">
        {["Assignments", "Quizzes", "Feedback"].map((k) => (
          <div key={k} className="rounded-2xl p-6 bg-white/5 border border-white/10">
            <h3 className="font-semibold">{k}</h3>
            <p className="text-sm text-white/70">Beautiful UI with fast workflows.</p>
          </div>
        ))}
      </div>
    </section>
  );
}
