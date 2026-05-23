import { useNavigate } from 'react-router-dom'
import { CalendarIcon } from '../../assets/icons'
import { CITAS } from '../../data/mockData'

export default function NextAppointmentBanner() {
  const navigate = useNavigate()
  const next = CITAS.proximas[0]
  if (!next) return null

  return (
    <div className="bg-naranja-suave border border-[#FFD8A8] rounded-lg p-4 mb-4" role="region" aria-label="Próxima cita médica">
      <div className="flex items-center gap-2.5 mb-1.5">
        <span className="bg-naranja text-white font-extrabold text-xs px-2.5 py-1 rounded-full tracking-wide">PRÓXIMA</span>
        <strong className="flex items-center gap-1 text-sm">
          <CalendarIcon className="w-[18px] h-[18px]" /> Tu próxima cita
        </strong>
      </div>
      <h3 className="m-0 mb-1 text-lg font-extrabold">{next.tipo}</h3>
      <p className="m-0 text-[15px]"><strong>{next.fecha}</strong> · {next.hora}</p>
      <p className="m-0 text-[15px]">{next.medico} · {next.lugar}</p>
      <div className="flex gap-2 mt-3 flex-wrap">
        <button
          onClick={() => navigate('/citas')}
          className="flex-1 min-h-11 rounded-[12px] bg-azul text-white font-extrabold text-sm border-0"
        >
          Ver detalle
        </button>
        <button
          onClick={() => navigate('/citas')}
          className="flex-1 min-h-11 rounded-[12px] bg-white text-azul font-extrabold text-sm border-2 border-azul"
        >
          Cómo llegar
        </button>
      </div>
    </div>
  )
}
