import { Routes, Route, Navigate } from 'react-router'
import ProtectedRoute from '../components/ProtectedRoute'

import LandingPage from '../pages/LandingPage'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'

import UserDashboard from '../pages/user/UserDashboard'
import CreateTicket from '../pages/user/CreateTicket'
import MyTickets from '../pages/user/MyTickets'

import AdminDashboard from '../pages/admin/AdminDashboard'
import ManageTickets from '../pages/admin/ManageTickets'
import ManageUsers from '../pages/admin/ManageUsers'

import NotFound from '../pages/NotFound'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute role="USER">
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tickets/create"
        element={
          <ProtectedRoute role="USER">
            <CreateTicket />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tickets"
        element={
          <ProtectedRoute role="USER">
            <MyTickets />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute role="ADMIN">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/tickets"
        element={
          <ProtectedRoute role="ADMIN">
            <ManageTickets />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <ProtectedRoute role="ADMIN">
            <ManageUsers />
          </ProtectedRoute>
        }
      />

      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}