export default function StatCard({ title, value, subtitle }) {
  return (
    <div className="rounded-3xl border border-white/50 bg-white/80 p-6 shadow-[0_10px_40px_rgba(15,23,42,0.08)] backdrop-blur">
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <h3 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">{value}</h3>
      {subtitle && <p className="mt-2 text-sm text-slate-500">{subtitle}</p>}
    </div>
  )
}