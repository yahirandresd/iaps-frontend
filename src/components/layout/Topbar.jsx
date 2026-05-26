import { useNavigate } from 'react-router-dom'
import { BellIcon } from '../../assets/icons'
import { useAuth } from '../../context/AuthContext'

export default function Topbar({ notifCount = 3 }) {
  const { user } = useAuth()
  const navigate = useNavigate()

  const initials = user?.initials ?? user?.nombre?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() ?? 'U'

  return (
    <header className="bg-azul-suave px-5 py-[18px] flex items-center gap-3 sticky top-0 z-30 border-b border-[rgba(21,101,192,.12)]" role="banner">
      <div className="flex items-center gap-1.5 flex-1">
        <img src="/iAPS_logo-removebg-preview.png" alt="iAPS" className="h-9 w-auto object-contain" />
        <span className="text-[20px] font-extrabold text-azul-oscuro tracking-tight leading-none">iAPS</span>
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
