import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './lib/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToHash from './components/ScrollToHash'
import Home from './pages/Home'
import Convention from './pages/Convention'
import Booking from './pages/Booking'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <AuthProvider>
      <ScrollToHash />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/convention" element={<Convention />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </AuthProvider>
  )
}
