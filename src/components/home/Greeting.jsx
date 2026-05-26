import { HandIcon, CalendarIcon } from '../../assets/icons'
import { useAuth } from '../../context/AuthContext'

export default function Greeting() {
  const { user } = useAuth()
  const firstName = user?.nombre?.split(' ')[0] ?? 'Usuario'

  const today = new Date().toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  const todayStr = today.charAt(0).toUpperCase() + today.slice(1)

  return (
    <div className="bg-white border-l-[6px] border-azul rounded-md p-[18px_18px_18px_16px] mb-4 shadow-md border border-gris-borde">
      <h2 className="m-0 mb-1.5 text-[22px] font-extrabold flex items-center gap-1.5">
        <HandIcon className="w-6 h-6 text-azul inline-block" />
        ¡Hola, {firstName}!
      </h2>
      <div className="flex flex-col gap-0.5 text-[15px] text-gris-texto">
        <span>EPS: <strong className="text-texto font-bold">{user?.eps ?? '—'}</strong> · Régimen <strong className="text-texto font-bold capitalize">{user?.regimen ?? '—'}</strong></span>
        <span>Estado: <strong className="text-texto font-bold capitalize">{user?.estado ?? '—'}</strong> · Tipo: <strong className="text-texto font-bold capitalize">{user?.tipo_afiliado ?? '—'}</strong></span>
      </div>
      <span className="mt-2.5 text-sm text-azul-oscuro bg-azul-suave px-2.5 py-1.5 rounded-full inline-flex items-center gap-1 font-bold">
        <CalendarIcon className="w-4 h-4" />
        {todayStr}
      </span>
    </div>
  )
}
