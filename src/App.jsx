import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Toaster } from 'sonner'
import { store } from './store'
import { AuthProvider, useAuth } from './context/AuthContext'
import { AccessibilityProvider } from './context/AccessibilityContext'

import AppLayout from './components/layout/AppLayout'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import CitasPage from './pages/CitasPage'
import AutorizacionesPage from './pages/AutorizacionesPage'
import MedicamentosPage from './pages/MedicamentosPage'
import HistorialPage from './pages/HistorialPage'
import EpsPage from './pages/EpsPage'
import AdresPage from './pages/AdresPage'
import PerfilPage from './pages/PerfilPage'

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

function PublicRoute({ children }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <Navigate to="/" replace /> : children
}

export default function App() {
  return (
    <Provider store={store}>
    <AuthProvider>
      <AccessibilityProvider>
        <BrowserRouter>
          <Toaster
            position="bottom-center"
            richColors
            toastOptions={{
              style: { fontFamily: 'Nunito, sans-serif', fontWeight: 700, borderRadius: '14px' },
            }}
          />
          <Routes>
            <Route path="/login"    element={<PublicRoute><LoginPage /></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />

            <Route element={<PrivateRoute><AppLayout /></PrivateRoute>}>
              <Route index element={<HomePage />} />
              <Route path="citas"          element={<CitasPage />} />
              <Route path="autorizaciones" element={<AutorizacionesPage />} />
              <Route path="medicamentos"   element={<MedicamentosPage />} />
              <Route path="historial"      element={<HistorialPage />} />
              <Route path="eps"            element={<EpsPage />} />
              <Route path="adres"          element={<AdresPage />} />
              <Route path="perfil"         element={<PerfilPage />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AccessibilityProvider>
    </AuthProvider>
    </Provider>
  )
}
