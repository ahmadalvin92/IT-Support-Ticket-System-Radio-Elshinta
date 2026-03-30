function statusColor(status) {
  if (status === 'OPEN') return 'bg-amber-100 text-amber-700'
  if (status === 'IN_PROGRESS') return 'bg-blue-100 text-blue-700'
  if (status === 'DONE') return 'bg-emerald-100 text-emerald-700'
  return 'bg-slate-100 text-slate-700'
}

export default function TicketCard({ ticket, children }) {
  return (
    <div className="rounded-3xl border border-white/50 bg-white/90 p-6 shadow-[0_10px_40px_rgba(15,23,42,0.08)] backdrop-blur">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-slate-900">{ticket.title}</h3>
          <p className="mt-1 text-sm text-slate-500">
            Ticket #{ticket.id} • {new Date(ticket.createdAt).toLocaleString()}
          </p>
        </div>

        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor(ticket.status)}`}>
          {ticket.status}
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">Description</p>
          <p className="text-sm leading-6 text-slate-700">{ticket.description}</p>
        </div>

        {ticket.resolution && (
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">Resolution</p>
            <p className="text-sm leading-6 text-slate-700">{ticket.resolution}</p>
          </div>
        )}

        {children}
      </div>
    </div>
  )
}