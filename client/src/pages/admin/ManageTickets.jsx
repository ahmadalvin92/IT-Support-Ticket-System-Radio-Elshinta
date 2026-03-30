import { useEffect, useState } from 'react'
import api from '../../api/axios'
import AdminLayout from '../../layouts/AdminLayout'
import TicketCard from '../../components/TicketCard'

export default function ManageTickets() {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchTickets()
  }, [])

  const fetchTickets = async () => {
    try {
      const res = await api.get('/tickets')
      setTickets(res.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal mengambil ticket')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async (id, status, resolution) => {
    try {
      await api.put(`/tickets/${id}`, { status, resolution })
      fetchTickets()
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal update ticket')
    }
  }

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Yakin ingin menghapus ticket ini?')
    if (!confirmDelete) return

    try {
      await api.delete(`/tickets/${id}`)
      fetchTickets()
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal hapus ticket')
    }
  }

  return (
    <AdminLayout
      title="Manage Tickets"
      subtitle="Update status dan berikan resolution untuk setiap request."
    >
      {loading ? (
        <div className="rounded-3xl bg-white/80 p-8 shadow">Loading tickets...</div>
      ) : error ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-4 text-red-600">{error}</div>
      ) : tickets.length === 0 ? (
        <div className="rounded-3xl bg-white/80 p-8 shadow">Belum ada ticket.</div>
      ) : (
        <div className="grid gap-6">
          {tickets.map((ticket) => (
            <TicketManagerItem
              key={ticket.id}
              ticket={ticket}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </AdminLayout>
  )
}

function TicketManagerItem({ ticket, onUpdate, onDelete }) {
  const [status, setStatus] = useState(ticket.status)
  const [resolution, setResolution] = useState(ticket.resolution || '')

  return (
    <TicketCard ticket={ticket}>
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <p className="mb-3 text-sm font-semibold text-slate-700">
          User: {ticket.user?.name} ({ticket.user?.email})
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            >
              <option value="OPEN">OPEN</option>
              <option value="IN_PROGRESS">IN PROGRESS</option>
              <option value="DONE">DONE</option>
            </select>
          </div>

          <div className="md:col-span-1">
            <label className="mb-2 block text-sm font-semibold text-slate-700">Resolution</label>
            <textarea
              rows="4"
              value={resolution}
              onChange={(e) => setResolution(e.target.value)}
              placeholder="Tulis penyelesaian masalah..."
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            onClick={() => onUpdate(ticket.id, status, resolution)}
            className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Save Update
          </button>
          <button
            onClick={() => onDelete(ticket.id)}
            className="rounded-2xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
          >
            Delete Ticket
          </button>
        </div>
      </div>
    </TicketCard>
  )
}