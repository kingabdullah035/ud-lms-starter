
import "./globals.css";


export const metadata = { title: "UD LMS", description: "Learn CS beautifully" };


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-slate-100">
        <header className="sticky top-0 z-40 border-b border-white/10 backdrop-blur bg-black/30">
          <nav className="mx-auto max-w-6xl flex items-center gap-6 p-4 text-sm">
            <a href="/" className="font-semibold">UD LMS</a>
            <a href="/dashboard">Dashboard</a>
            <a href="/courses">Courses</a>
            <a href="/submissions">Submissions</a>
            <a href="/profile">Profile</a>
            <a href="/login" className="ml-auto underline">Login</a>
          </nav>
        </header>
        <main className="mx-auto max-w-6xl p-6">{children}</main>
        <footer className="mx-auto max-w-6xl p-6 text-xs text-white/60">
          © {new Date().getFullYear()} UD LMS
        </footer>
      </body>
    </html>
  );
}
