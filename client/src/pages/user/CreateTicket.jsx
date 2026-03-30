import { useState } from 'react'
import { useNavigate } from 'react-router'
import api from '../../api/axios'
import MainLayout from '../../layouts/MainLayout'

export default function CreateTicket() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    title: '',
    description: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    try {
      await api.post('/tickets', form)
      setMessage('Ticket berhasil dibuat')
      setForm({ title: '', description: '' })

      setTimeout(() => {
        navigate('/tickets')
      }, 1000)
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal membuat ticket')
    } finally {
      setLoading(false)
    }
  }

  return (
    <MainLayout
      title="Create Ticket"
      subtitle="Jelaskan masalah dengan jelas supaya tim IT bisa membantu lebih cepat."
    >
      <div className="mx-auto max-w-3xl rounded-[32px] border border-white/50 bg-white/85 p-8 shadow-[0_20px_70px_rgba(15,23,42,0.08)]">
        {message && (
          <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Ticket Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Contoh: Laptop tidak bisa connect WiFi"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="7"
              placeholder="Jelaskan kendala, kapan mulai terjadi, pesan error, dan device yang dipakai..."
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              required
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="rounded-2xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:scale-[1.02] hover:bg-slate-800 disabled:opacity-70"
            >
              {loading ? 'Submitting...' : 'Submit Ticket'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="rounded-2xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  )
}