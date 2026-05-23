import { Outlet } from 'react-router-dom'
import Topbar from './Topbar'
import BottomNav from './BottomNav'
import AccessibilityFAB from '../accessibility/AccessibilityFAB'

export default function AppLayout() {
  return (
    <div className="w-full min-h-screen max-w-app md:max-w-desktop mx-auto bg-gris-fondo relative pb-24 md:shadow-[0_0_40px_rgba(0,0,0,.06)]">
      <a href="#main" className="skip-link">Saltar al contenido principal</a>
      <Topbar />
      <main id="main" role="main">
        <Outlet />
      </main>
      <BottomNav />
      <AccessibilityFAB />
    </div>
  )
}
