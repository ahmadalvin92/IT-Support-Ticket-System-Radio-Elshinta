import { Link } from 'react-router'
import MainLayout from '../../layouts/MainLayout'
import { useAuth } from '../../context/AuthContext'
import StatCard from '../../components/StatCard'

export default function UserDashboard() {
  const { user } = useAuth()

  return (
    <MainLayout
      title={`Hi, ${user?.name || 'User'} 👋`}
      subtitle="Pantau kebutuhan support kamu dan buat ticket baru dengan cepat."
    >
      <div className="grid gap-6 md:grid-cols-3">
        <StatCard title="My Access" value="User Portal" subtitle="Buat dan lihat ticket pribadi" />
        <StatCard title="Ticket Flow" value="Open → Done" subtitle="Status diperbarui oleh admin" />
        <StatCard title="Support Mode" value="Active" subtitle="Sistem siap menerima request" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-[32px] bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 p-8 text-white shadow-[0_20px_70px_rgba(15,23,42,0.18)]">
          <p className="text-sm uppercase tracking-[0.25em] text-blue-200">Quick action</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight">Buat ticket baru</h2>
          <p className="mt-3 max-w-lg text-sm leading-7 text-slate-200">
            Laporkan masalah laptop, printer, koneksi internet, akun, software, atau kebutuhan teknis lainnya.
          </p>
          <Link
            to="/tickets/create"
            className="mt-6 inline-flex rounded-2xl bg-white px-5 py-3 font-semibold text-slate-900 transition hover:scale-[1.02]"
          >
            Create Ticket
          </Link>
        </div>

        <div className="rounded-[32px] border border-white/50 bg-white/80 p-8 shadow-[0_20px_70px_rgba(15,23,42,0.08)]">
          <p className="text-sm uppercase tracking-[0.25em] text-slate-400">My history</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">Lihat semua ticket</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Cek status ticket yang sudah kamu kirim dan lihat resolution dari admin jika sudah selesai.
          </p>
          <Link
            to="/tickets"
            className="mt-6 inline-flex rounded-2xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:scale-[1.02] hover:bg-slate-800"
          >
            My Tickets
          </Link>
        </div>
      </div>
    </MainLayout>
  )
}