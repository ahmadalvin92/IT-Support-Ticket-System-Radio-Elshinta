import { useEffect, useState } from 'react'
import api from '../../api/axios'
import AdminLayout from '../../layouts/AdminLayout'
import StatCard from '../../components/StatCard'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalTickets: 0,
    open: 0,
    inProgress: 0,
    done: 0,
    totalUsers: 0
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [ticketsRes, usersRes] = await Promise.all([
        api.get('/tickets'),
        api.get('/users')
      ])

      const tickets = ticketsRes.data
      const users = usersRes.data

      setStats({
        totalTickets: tickets.length,
        open: tickets.filter((t) => t.status === 'OPEN').length,
        inProgress: tickets.filter((t) => t.status === 'IN_PROGRESS').length,
        done: tickets.filter((t) => t.status === 'DONE').length,
        totalUsers: users.length
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <AdminLayout
      title="Admin Dashboard"
      subtitle="Monitor seluruh ticket dan user dalam satu tampilan."
    >
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
        <StatCard title="Total Tickets" value={stats.totalTickets} />
        <StatCard title="Open" value={stats.open} />
        <StatCard title="In Progress" value={stats.inProgress} />
        <StatCard title="Done" value={stats.done} />
        <StatCard title="Users" value={stats.totalUsers} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-[32px] bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white shadow-[0_20px_70px_rgba(59,130,246,0.24)]">
          <p className="text-sm uppercase tracking-[0.25em] text-blue-100">Tickets</p>
          <h2 className="mt-3 text-3xl font-black">Manage all requests</h2>
          <p className="mt-3 text-sm leading-7 text-blue-50">
            Update status, isi resolution, dan hapus ticket yang sudah tidak diperlukan.
          </p>
        </div>

        <div className="rounded-[32px] border border-white/50 bg-white/85 p-8 shadow-[0_20px_70px_rgba(15,23,42,0.08)]">
          <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Users</p>
          <h2 className="mt-3 text-3xl font-black text-slate-900">Control user access</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Tambah user baru, edit role, atau hapus akun langsung dari panel admin.
          </p>
        </div>
      </div>
    </AdminLayout>
  )
}