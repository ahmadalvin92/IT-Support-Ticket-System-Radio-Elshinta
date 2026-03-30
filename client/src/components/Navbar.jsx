import { Link, useNavigate } from 'react-router'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/30 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to={user?.role === 'ADMIN' ? '/admin' : '/dashboard'} className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-bold text-white shadow-lg">
            IT
          </div>
          <div>
            <p className="text-lg font-bold tracking-tight text-slate-900">IT Support System</p>
            <p className="text-xs text-slate-500">Ticketing dashboard</p>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <div className="hidden text-right md:block">
            <p className="text-sm font-semibold text-slate-800">{user?.name}</p>
            <p className="text-xs text-slate-500">{user?.role}</p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:scale-[1.02] hover:bg-slate-800"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}