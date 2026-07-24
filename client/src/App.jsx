import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ParticipantDashboard from './pages/participant/Dashboard'
import OrganizerDashboard from './pages/organizer/Dashboard'
import AddVolunteer from './pages/organizer/AddVolunteer'
import VolunteerDashboard from './pages/volunteer/Dashboard'
import ProtectedRoute from './routes/ProtectedRoute'

function AppRoutes() {
  const { user, loading } = useAuth()

  if (loading) return <div className="min-h-screen bg-[#0a0a0f] text-white">Loading...</div>

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user ? <Navigate to={`/${user.role}`} replace /> : <Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoute allowedRole="participant" />}>
          <Route path="/participant" element={<ParticipantDashboard />} />
        </Route>
        <Route element={<ProtectedRoute allowedRole="organizer" />}>
          <Route path="/organizer" element={<OrganizerDashboard />} />
          <Route path="/organizer/add-volunteer" element={<AddVolunteer />} />
        </Route>
        <Route element={<ProtectedRoute allowedRole="volunteer" />}>
          <Route path="/volunteer" element={<VolunteerDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}
