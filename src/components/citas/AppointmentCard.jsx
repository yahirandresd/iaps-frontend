import { toast } from 'sonner'
import { CalendarIcon, MapPinIcon } from '../../assets/icons'
import StatusBadge from '../ui/StatusBadge'
import AlertDialog from '../ui/AlertDialog'

export default function AppointmentCard({ cita, onCancel }) {
  return (
    <div className="bg-white rounded-lg border border-gris-borde shadow-sm p-4">
      <div className="flex gap-3 items-start">
        <div className="w-11 h-11 rounded-[14px] bg-azul-suave text-azul-oscuro grid place-items-center shrink-0">
          <CalendarIcon className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[17px] font-extrabold m-0">{cita.tipo}</p>
          <p className="text-sm text-gris-texto m-0 mt-0.5">{cita.medico}</p>
        </div>
        <StatusBadge cls={cita.estado.cls} label={cita.estado.label} />
      </div>

      <div className="mt-3 flex flex-col gap-1.5 text-[15px]">
        <div className="flex gap-2">
          <span className="text-gris-texto font-semibold min-w-[110px] flex items-center gap-1"><CalendarIcon className="w-4 h-4" /> Fecha</span>
          <span className="font-bold">{cita.fecha} · {cita.hora}</span>
        </div>
        <div className="flex gap-2">
          <span className="text-gris-texto font-semibold min-w-[110px] flex items-center gap-1"><MapPinIcon className="w-4 h-4" /> Lugar</span>
          <span className="font-bold">{cita.lugar}</span>
        </div>
        {cita.direccion && (
          <div className="flex gap-2">
            <span className="text-gris-texto font-semibold min-w-[110px]" />
            <span className="text-gris-texto text-sm">{cita.direccion}</span>
          </div>
        )}
      </div>

      {cita.estado.cls !== 'gray' && cita.estado.cls !== 'red' && (
        <div className="flex gap-2 mt-3.5">
          <button
            onClick={() => toast.info('Abriendo mapa…')}
            className="flex-1 min-h-11 rounded-[12px] border-2 border-azul text-azul bg-white font-extrabold text-sm"
          >
            Cómo llegar
          </button>
          <AlertDialog
            trigger={
              <button className="flex-1 min-h-11 rounded-[12px] bg-rojo text-white font-extrabold text-sm border-0">
                Cancelar cita
              </button>
            }
            title="¿Cancelar esta cita?"
            description={`${cita.tipo} — ${cita.fecha} · ${cita.hora}. Esta acción no se puede deshacer.`}
            confirmLabel="Sí, cancelar"
            confirmVariant="rojo"
            onConfirm={() => { onCancel?.(cita.id); toast.success('Cita cancelada.') }}
          />
        </div>
      )}
    </div>
  )
}
