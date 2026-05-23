import { toast } from 'sonner'
import { CheckCircleIcon, AlertIcon } from '../../assets/icons'
import StatusBadge from '../ui/StatusBadge'

export default function AuthorizationCard({ auth }) {
  return (
    <div className="bg-white rounded-lg border border-gris-borde shadow-sm p-4">
      <div className="flex gap-3 items-start">
        <div className="w-11 h-11 rounded-[14px] bg-verde-suave text-verde-oscuro grid place-items-center shrink-0">
          <CheckCircleIcon className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[17px] font-extrabold m-0">{auth.tipo}</p>
          <p className="text-sm text-gris-texto m-0 mt-0.5">Radicado: {auth.radicado}</p>
        </div>
        <StatusBadge cls={auth.estado.cls} label={auth.estado.label} />
      </div>

      <div className="mt-3 flex flex-col gap-1.5 text-[15px]">
        <div className="flex gap-2">
          <span className="text-gris-texto font-semibold min-w-[130px]">Médico solicitante</span>
          <span className="font-bold">{auth.medico}</span>
        </div>
        <div className="flex gap-2">
          <span className="text-gris-texto font-semibold min-w-[130px]">Fecha solicitud</span>
          <span className="font-bold">{auth.solicitada}</span>
        </div>
      </div>

      {auth.motivo && (
        <div className="mt-3 bg-rojo-suave border border-[#F4B5B5] rounded-[12px] p-3 text-sm text-rojo flex gap-2 items-start">
          <AlertIcon className="w-5 h-5 shrink-0 mt-0.5" />
          <div><strong className="block">Motivo de negación:</strong>{auth.motivo}</div>
        </div>
      )}

      {auth.estado.key === 'negadas' && (
        <button
          onClick={() => toast.info('Información sobre tutela: puedes presentarla ante un juez de la república.')}
          className="mt-3 w-full min-h-11 rounded-[12px] border-2 border-rojo text-rojo bg-white font-extrabold text-sm"
        >
          ¿Cómo interponer una tutela?
        </button>
      )}
    </div>
  )
}
