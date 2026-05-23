import { NavLink } from 'react-router-dom'
import { HomeIcon, CalendarIcon, PillIcon, ClipboardIcon, UserIcon } from '../../assets/icons'

const items = [
  { to: '/',              icon: HomeIcon,      label: 'Inicio'      },
  { to: '/citas',         icon: CalendarIcon,  label: 'Citas'       },
  { to: '/medicamentos',  icon: PillIcon,      label: 'Medicamentos'},
  { to: '/historial',     icon: ClipboardIcon, label: 'Historial'   },
  { to: '/perfil',        icon: UserIcon,      label: 'Perfil'      },
]

export default function BottomNav() {
  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-app desktop:max-w-desktop bg-white border-t border-gris-borde shadow-[0_-6px_20px_rgba(16,24,40,.06)] grid grid-cols-5 z-50"
      role="navigation"
      aria-label="Navegación principal"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {items.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 pt-2.5 pb-3 text-xs font-bold min-h-16 transition-colors
             ${isActive ? 'text-azul' : 'text-gris-texto'}`
          }
        >
          {({ isActive }) => (
            <>
              <Icon className="w-6 h-6" />
              {label}
              <span className={`w-[22px] h-[3px] rounded-full mt-0.5 ${isActive ? 'bg-azul' : 'bg-transparent'}`} />
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
