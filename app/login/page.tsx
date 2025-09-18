"use client";
import { useRouter } from "next/navigation";

export default function Login() {
  const r = useRouter();
  return (
    <div className="max-w-md mx-auto mt-12 rounded-2xl p-8 bg-white/5 border border-white/10">
      <h1 className="text-2xl font-semibold">Login</h1>
      <p className="text-sm text-white/70">Use demo to skip auth during development.</p>
      <form className="mt-6 grid gap-3" onSubmit={(e) => { e.preventDefault(); r.push("/dashboard"); }}>
        <input className="rounded-xl px-3 py-2 bg-black/30 border border-white/10" placeholder="Email" />
        <input className="rounded-xl px-3 py-2 bg-black/30 border border-white/10" placeholder="Password" type="password" />
        <button className="rounded-xl px-4 py-2 bg-white text-black font-medium">Continue</button>
      </form>
      <button className="mt-3 text-sm underline" onClick={() => r.push("/dashboard")}>Continue as Demo</button>
    </div>
  );
}
