import { useEffect, useState } from 'react'
import api from '../../api/axios'
import MainLayout from '../../layouts/MainLayout'
import TicketCard from '../../components/TicketCard'

export default function MyTickets() {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchTickets()
  }, [])

  const fetchTickets = async () => {
    try {
      const res = await api.get('/tickets/my')
      setTickets(res.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal mengambil ticket')
    } finally {
      setLoading(false)
    }
  }

  return (
    <MainLayout
      title="My Tickets"
      subtitle="Daftar semua ticket yang pernah kamu buat."
    >
      {loading ? (
        <div className="rounded-3xl bg-white/80 p-8 text-slate-600 shadow">Loading tickets...</div>
      ) : error ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-4 text-red-600">{error}</div>
      ) : tickets.length === 0 ? (
        <div className="rounded-3xl bg-white/80 p-8 text-slate-600 shadow">Belum ada ticket.</div>
      ) : (
        <div className="grid gap-6">
          {tickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      )}
    </MainLayout>
  )
}