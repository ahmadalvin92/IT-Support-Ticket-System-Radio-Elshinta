import Navbar from '../components/Navbar'

export default function MainLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-black tracking-tight text-slate-900">{title}</h1>
          {subtitle && <p className="mt-2 text-slate-600">{subtitle}</p>}
        </div>
        {children}
      </main>
    </div>
  )
}