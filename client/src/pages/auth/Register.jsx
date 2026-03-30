import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import api from '../../api/axios'
import { useAuth } from '../../context/AuthContext'

export default function Register() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await api.post('/auth/register', form)
      login(res.data)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Register gagal')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-10">
      <div className="w-full max-w-xl rounded-[32px] border border-white/50 bg-white/80 p-8 shadow-[0_20px_70px_rgba(15,23,42,0.12)] backdrop-blur-xl md:p-10">
      <div className="flex items-center gap-3 mb-6">
  <img
    src="/logo-elshinta.png"
    alt="Elshinta"
    className="h-10 w-10 rounded-xl object-contain"
  />
  <div>
    <p className="text-xs text-slate-500">Radio Elshinta</p>
    <p className="font-bold text-slate-900">IT Support System</p>
  </div>
</div>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">Create account</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900">Register User</h1>
        <p className="mt-2 text-slate-500">Buat akun baru untuk mengirim ticket IT support.</p>

        {error && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Ahmad Alvin"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Minimal 6 karakter"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 font-semibold text-white transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? 'Loading...' : 'Create Account'}
          </button>
        </form>

        <p className="mt-6 text-sm text-slate-500">
          Sudah punya akun?{' '}
          <Link to="/" className="font-semibold text-indigo-600 hover:text-indigo-700">
            Login sekarang
          </Link>
        </p>
      </div>
    </div>
  )
}