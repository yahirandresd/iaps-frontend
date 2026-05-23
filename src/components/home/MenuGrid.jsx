import { useNavigate } from 'react-router-dom'
import { CalendarIcon, CheckCircleIcon, PillIcon, ClipboardIcon, HomeIcon, FileTextIcon } from '../../assets/icons'

const tiles = [
  { to: '/citas',          icon: CalendarIcon,    color: 'bg-azul-suave text-azul-oscuro',          title: 'Mis Citas',          desc: 'Agenda, consulta y cancela tus citas médicas.' },
  { to: '/autorizaciones', icon: CheckCircleIcon, color: 'bg-verde-suave text-verde-oscuro',         title: 'Autorizaciones',     desc: 'Revisa el estado de tus autorizaciones médicas.' },
  { to: '/medicamentos',   icon: PillIcon,        color: 'bg-naranja-suave text-naranja',            title: 'Mis Medicamentos',   desc: 'Medicamentos pendientes por recoger en farmacia.' },
  { to: '/historial',      icon: ClipboardIcon,   color: 'bg-[#E1ECFF] text-azul-oscuro',            title: 'Historial Clínico',  desc: 'Consulta tus atenciones médicas anteriores.' },
  { to: '/eps',            icon: HomeIcon,        color: 'bg-[#D6EBD8] text-verde-oscuro',           title: 'Cambio de EPS',      desc: 'Solicita traslado o conoce el proceso paso a paso.' },
  { to: '/adres',          icon: FileTextIcon,    color: 'bg-rojo-suave text-rojo',                  title: 'Certificado ADRES',  desc: 'Accede a ADRES para descargar tu certificado.' },
]

export default function MenuGrid() {
  const navigate = useNavigate()

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-1">
      {tiles.map(({ to, icon: Icon, color, title, desc }) => (
        <button
          key={to}
          onClick={() => navigate(to)}
          className="bg-white border border-gris-borde rounded-lg p-4 shadow-md text-left flex flex-col gap-2 min-h-[148px] transition-transform hover:scale-[1.03] hover:shadow-lg active:scale-[.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azul"
          role="listitem"
        >
          <div className={`w-[52px] h-[52px] rounded-[16px] grid place-items-center mb-1 ${color}`}>
            <Icon className="w-7 h-7" />
          </div>
          <h3 className="m-0 text-lg font-extrabold leading-tight">{title}</h3>
          <p className="m-0 text-sm text-gris-texto leading-snug">{desc}</p>
        </button>
      ))}
    </div>
  )
}
