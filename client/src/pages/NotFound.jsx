import { Link } from 'react-router'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="text-6xl font-black text-slate-900">404</h1>
      <p className="mt-3 text-slate-500">Halaman tidak ditemukan.</p>
      <Link
        to="/"
        className="mt-6 rounded-2xl bg-slate-900 px-5 py-3 font-semibold text-white"
      >
        Back to Login
      </Link>
    </div>
  )
}