export default async function Dashboard() {
  return (
    <section className="grid gap-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-4">
        <a href="/courses" className="rounded-2xl p-6 bg-white/5 border border-white/10 hover:bg-white/10">My Courses</a>
        <a href="/submissions" className="rounded-2xl p-6 bg-white/5 border border-white/10 hover:bg-white/10">My Submissions</a>
        <a href="/profile" className="rounded-2xl p-6 bg-white/5 border border-white/10 hover:bg-white/10">Profile</a>
      </div>
    </section>
  );
}
