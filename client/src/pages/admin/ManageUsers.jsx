import { useEffect, useState } from 'react'
import api from '../../api/axios'
import AdminLayout from '../../layouts/AdminLayout'

export default function ManageUsers() {
  const [users, setUsers] = useState([])
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'USER'
  })
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const res = await api.get('/users')
      setUsers(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  const resetForm = () => {
    setForm({
      name: '',
      email: '',
      password: '',
      role: 'USER'
    })
    setEditingId(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (editingId) {
        await api.put(`/users/${editingId}`, {
          name: form.name,
          email: form.email,
          role: form.role
        })
      } else {
        await api.post('/users', form)
      }

      resetForm()
      fetchUsers()
    } catch (error) {
      alert(error.response?.data?.message || 'Gagal menyimpan user')
    }
  }

  const handleEdit = (user) => {
    setEditingId(user.id)
    setForm({
      name: user.name,
      email: user.email,
      password: '',
      role: user.role
    })
  }

  const handleDelete = async (id) => {
    const ok = window.confirm('Yakin ingin menghapus user ini?')
    if (!ok) return

    try {
      await api.delete(`/users/${id}`)
      fetchUsers()
    } catch (error) {
      alert(error.response?.data?.message || 'Gagal hapus user')
    }
  }

  return (
    <AdminLayout
      title="Manage Users"
      subtitle="Tambah, edit, dan hapus user dari panel admin."
    >
      <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
        <div className="rounded-[32px] border border-white/50 bg-white/85 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.08)]">
          <h2 className="text-2xl font-black text-slate-900">
            {editingId ? 'Edit User' : 'Create User'}
          </h2>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                required
              />
            </div>

            {!editingId && (
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Password</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  required
                />
              </div>
            )}

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Role</label>
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="rounded-2xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
              >
                {editingId ? 'Update User' : 'Create User'}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-2xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="rounded-[32px] border border-white/50 bg-white/85 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.08)]">
          <h2 className="text-2xl font-black text-slate-900">User List</h2>

          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-3">
              <thead>
                <tr className="text-left text-sm text-slate-500">
                  <th className="px-4">Name</th>
                  <th className="px-4">Email</th>
                  <th className="px-4">Role</th>
                  <th className="px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="rounded-2xl bg-slate-50">
                    <td className="rounded-l-2xl px-4 py-4 font-semibold text-slate-800">{user.name}</td>
                    <td className="px-4 py-4 text-slate-600">{user.email}</td>
                    <td className="px-4 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          user.role === 'ADMIN'
                            ? 'bg-indigo-100 text-indigo-700'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="rounded-r-2xl px-4 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(user)}
                          className="rounded-xl bg-blue-500 px-3 py-2 text-sm font-medium text-white hover:bg-blue-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="rounded-xl bg-red-500 px-3 py-2 text-sm font-medium text-white hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {users.length === 0 && (
              <p className="py-6 text-sm text-slate-500">Belum ada user.</p>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}