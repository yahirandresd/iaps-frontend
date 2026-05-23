import { useNavigate } from 'react-router-dom'
import { BellIcon } from '../../assets/icons'
import { useAuth } from '../../context/AuthContext'

export default function Topbar({ notifCount = 3 }) {
  const { user } = useAuth()
  const navigate = useNavigate()

  const initials = user?.initials ?? user?.nombre?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() ?? 'U'

  return (
    <header className="bg-azul-suave px-5 py-[18px] flex items-center gap-3 sticky top-0 z-30 border-b border-[rgba(21,101,192,.12)]" role="banner">
      <div className="flex items-center gap-2.5 flex-1">
        <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-azul to-azul-oscuro grid place-items-center shadow-sm shrink-0">
          <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
            <path d="M13 4h6v6h6v6h-6v6h-6v-6H7v-6h6V4z" fill="#fff"/>
            <path d="M24 18c0-3 2-6 6-7-1 5-3 8-6 9v-2z" fill="#A5D6A7"/>
          </svg>
        </div>
        <div>
          <div className="font-black text-[22px] tracking-wide text-azul-oscuro leading-none">iAPS</div>
          <div className="text-xs text-gris-texto leading-none mt-0.5">Tu salud, siempre en tus manos</div>
        </div>
      </div>

      <button
        className="w-11 h-11 rounded-full border border-[rgba(21,101,192,.18)] bg-white grid place-items-center relative"
        aria-label={`Notificaciones (${notifCount} nuevas)`}
      >
        <BellIcon className="w-[22px] h-[22px] text-azul-oscuro" />
        {notifCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[20px] h-5 px-1.5 rounded-full bg-rojo text-white text-[12px] font-black grid place-items-center border-2 border-azul-suave">
            {notifCount}
          </span>
        )}
      </button>

      <button
        onClick={() => navigate('/perfil')}
        className="w-11 h-11 rounded-full bg-gradient-to-br from-[#5e96d1] to-azul text-white grid place-items-center font-black text-base shadow-sm"
        aria-label="Mi perfil"
      >
        {initials}
      </button>
    </header>
  )
}
