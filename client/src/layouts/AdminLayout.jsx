import Navbar from '../components/Navbar'
import { Link, useLocation } from 'react-router'

export default function AdminLayout({ title, subtitle, children }) {
  const location = useLocation()

  const navClass = (path) =>
    `rounded-2xl px-4 py-2 text-sm font-medium transition ${
      location.pathname === path
        ? 'bg-slate-900 text-white shadow'
        : 'bg-white text-slate-700 hover:bg-slate-100'
    }`

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-8">

        {/* 🔥 LOGO + BRAND */}
        <div className="mb-6 flex items-center gap-4">
          <img
            src="/logo-elshinta.png"
            alt="Elshinta"
            className="h-12 w-12 rounded-xl object-contain bg-white p-1 shadow"
          />
          <div>
            <p className="text-sm text-slate-500">Radio Elshinta</p>
            <h2 className="font-bold text-slate-900">Admin Panel</h2>
          </div>
        </div>

        {/* NAV MENU */}
        <div className="mb-6 flex flex-wrap gap-3">
          <Link to="/admin" className={navClass('/admin')}>
            Dashboard
          </Link>
          <Link to="/admin/tickets" className={navClass('/admin/tickets')}>
            Manage Tickets
          </Link>
          <Link to="/admin/users" className={navClass('/admin/users')}>
            Manage Users
          </Link>
        </div>

        {/* TITLE */}
        <div className="mb-8">
          <h1 className="text-3xl font-black tracking-tight text-slate-900">{title}</h1>
          {subtitle && <p className="mt-2 text-slate-600">{subtitle}</p>}
        </div>

        {children}
      </main>
    </div>
  )
}