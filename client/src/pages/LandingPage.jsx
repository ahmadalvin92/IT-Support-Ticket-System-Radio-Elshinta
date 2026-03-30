import { Link } from 'react-router'
import { useEffect, useState } from 'react'
import api from '../api/axios'

export default function LandingPage() {
  const [stats, setStats] = useState({
    totalTickets: 0,
    totalUsers: 0,
    resolved: 0
  })

  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [statsRes, reportsRes] = await Promise.all([
        api.get('/public/stats'),
        api.get('/public/reports')
      ])

      setStats(statsRes.data)
      setReports(reportsRes.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-900">
      
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-white/40 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <img
              src="/logo-elshinta.png"
              alt="Radio Elshinta"
              className="h-12 w-12 rounded-xl object-contain bg-white p-1 shadow"
            />
            <div>
              <h1 className="text-lg font-black tracking-tight">Radio Elshinta</h1>
              <p className="text-sm text-slate-500">IT Support Ticket System</p>
            </div>
          </div>

          <nav className="flex items-center gap-3">
            <Link to="/login" className="rounded-xl border px-4 py-2 text-sm font-semibold">
              Login
            </Link>
            <Link to="/register" className="rounded-xl bg-slate-900 px-4 py-2 text-sm text-white">
              Register
            </Link>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
            Internal Helpdesk Platform
          </p>
          <h2 className="mt-4 text-5xl font-black">
            Layanan IT support Radio Elshinta
          </h2>
          <p className="mt-6 text-lg text-slate-600">
            Laporkan kendala IT dengan mudah dan pantau progresnya secara realtime.
          </p>

          <div className="mt-8 flex gap-4">
            <Link to="/login" className="rounded-2xl bg-slate-900 px-6 py-3 text-white">
              Login
            </Link>
            <Link to="/register" className="rounded-2xl border px-6 py-3">
              Buat Akun
            </Link>
          </div>
        </div>

        {/* STATS */}
        <div className="rounded-[32px] bg-white p-8 shadow">
          {loading ? (
            <p>Loading data...</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl bg-blue-50 p-5">
                <p>Total Reports</p>
                <h3 className="text-3xl font-bold">{stats.totalTickets}</h3>
              </div>

              <div className="rounded-3xl bg-indigo-50 p-5">
                <p>Users Reported</p>
                <h3 className="text-3xl font-bold">{stats.totalUsers}</h3>
              </div>

              <div className="rounded-3xl bg-emerald-50 p-5">
                <p>Resolved</p>
                <h3 className="text-3xl font-bold">{stats.resolved}</h3>
              </div>
            </div>
          )}

          {/* RECENT REPORTS */}
          <div className="mt-8">
            <p className="mb-4 text-sm font-semibold uppercase text-slate-400">
              Aktivitas Pelapor
            </p>

            {loading ? (
              <p>Loading reports...</p>
            ) : reports.length === 0 ? (
              <p>Belum ada laporan</p>
            ) : (
              <div className="space-y-4">
                {reports.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between rounded-2xl bg-slate-50 px-4 py-4"
                  >
                    <div>
                      <p className="font-semibold">{item.user?.name}</p>
                      <p className="text-sm text-slate-500">{item.title}</p>
                    </div>

                    <span className="text-xs bg-amber-100 px-3 py-1 rounded-full">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t bg-white p-6 text-center text-sm text-slate-500">
        © 2026 Radio Elshinta - IT Support System | Developed By Ahmad Alvin Griffin
      </footer>
    </div>
  )
}