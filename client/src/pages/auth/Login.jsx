import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import api from '../../api/axios'
import { useAuth } from '../../context/AuthContext'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [form, setForm] = useState({
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
      const res = await api.post('/auth/login', form)
      login(res.data)

      if (res.data.user.role === 'ADMIN') {
        navigate('/admin')
      } else {
        navigate('/dashboard')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login gagal')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-100 via-white to-blue-50 flex items-center justify-center px-6 py-10">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-blue-100 bg-white shadow-[0_20px_70px_rgba(0,0,0,0.08)] lg:grid-cols-2">
        
        {/* LEFT PANEL */}
        <div className="hidden lg:block bg-gradient-to-br from-blue-700 via-blue-600 to-blue-900 p-10 text-white">
          <div className="flex h-full flex-col justify-between">
            
            <div>
              <div className="mb-6 flex items-center justify-center rounded-3xl bg-white/15 px-4 py-3 text-sm font-bold shadow backdrop-blur-sm">
                Radio Elshinta 90.0 FM
              </div>

              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-100">
                News & Talk Radio
              </p>

              <h1 className="mt-4 max-w-md text-4xl font-black leading-tight">
                Radio Elshinta 90.0 FM
              </h1>

              <p className="mt-4 max-w-md text-sm leading-7 text-blue-50/90">
                Radio Elshinta merupakan radio berita dan informasi yang menyajikan
                update terkini secara cepat dan terpercaya. Didukung oleh sistem
                teknologi informasi yang terintegrasi, operasional dan layanan
                internal berjalan lebih efisien dan responsif.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
                <p className="text-sm text-blue-100">Broadcast System</p>
                <p className="mt-2 text-2xl font-bold">Stabil</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
                <p className="text-sm text-blue-100">IT Support</p>
                <p className="mt-2 text-2xl font-bold">Internal</p>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="p-8 md:p-12">
          <div className="mx-auto max-w-md">

            {/* BACK BUTTON */}
            <button
              onClick={() => navigate('/')}
              className="mb-6 flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              ← Kembali ke Beranda
            </button>

            {/* Logo */}
            <div className="mb-6 flex items-center gap-3">
              <img
                src="/logo-elshinta.png"
                alt="Elshinta"
                className="h-12 w-12 rounded-xl object-contain border border-blue-100 bg-white p-1"
              />
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-blue-600 font-semibold">
                  Radio Elshinta
                </p>
                <p className="font-bold text-neutral-900">
                  IT Helpdesk System
                </p>
              </div>
            </div>

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
              Welcome back
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-tight text-neutral-900">
              Login Account
            </h2>

            <p className="mt-2 text-neutral-500">
              Masuk untuk mengakses sistem layanan IT internal.
            </p>

            {error && (
              <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              
              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="nama@elshinta.com"
                  className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:scale-[1.01] hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? 'Loading...' : 'Login'}
              </button>
            </form>

            <p className="mt-6 text-sm text-neutral-500">
              Belum punya akun?{' '}
              <Link
                to="/register"
                className="font-semibold text-blue-600 hover:text-blue-700"
              >
                Register di sini
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  )
}