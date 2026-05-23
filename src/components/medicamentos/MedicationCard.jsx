import { toast } from 'sonner'
import { PillIcon, MapPinIcon, CalendarIcon, AlertIcon } from '../../assets/icons'

export default function MedicationCard({ med }) {
  return (
    <div className="bg-white rounded-lg border border-gris-borde shadow-sm p-4">
      <div className="flex gap-3 items-start">
        <div className="w-11 h-11 rounded-[14px] bg-naranja-suave text-naranja grid place-items-center shrink-0">
          <PillIcon className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[17px] font-extrabold m-0">{med.nombre}</p>
          <p className="text-sm text-gris-texto m-0 mt-0.5">{med.presentacion}</p>
        </div>
        {med.alerta && (
          <span className="bg-rojo-suave text-rojo border border-[#F4B5B5] text-xs font-extrabold px-2.5 py-1 rounded-full shrink-0">VENCE PRONTO</span>
        )}
      </div>

      <div className="mt-3 flex flex-col gap-1.5 text-[15px]">
        <div className="flex gap-2">
          <span className="text-gris-texto font-semibold min-w-[130px]">Indicación</span>
          <span className="font-bold">{med.indicacion}</span>
        </div>
        <div className="flex gap-2 items-start">
          <span className="text-gris-texto font-semibold min-w-[130px] flex items-center gap-1"><MapPinIcon className="w-4 h-4" /> Farmacia</span>
          <span className="font-bold">{med.farmacia}</span>
        </div>
        <div className="flex gap-2">
          <span className="text-gris-texto font-semibold min-w-[130px] flex items-center gap-1"><CalendarIcon className="w-4 h-4" /> Disponible</span>
          <span className="font-bold">{med.disponible}</span>
        </div>
        <div className="flex gap-2">
          <span className={`font-semibold min-w-[130px] flex items-center gap-1 ${med.alerta ? 'text-rojo' : 'text-gris-texto'}`}>
            {med.alerta && <AlertIcon className="w-4 h-4" />} Vence
          </span>
          <span className={`font-bold ${med.alerta ? 'text-rojo' : ''}`}>{med.vence}</span>
        </div>
      </div>

      <div className="flex gap-2 mt-3.5">
        <button
          onClick={() => toast.info('Abriendo mapa de farmacia…')}
          className="flex-1 min-h-11 rounded-[12px] border-2 border-azul text-azul bg-white font-extrabold text-sm"
        >
          Ver en mapa
        </button>
        <button
          onClick={() => toast.success('Recordatorio activado para ' + med.nombre)}
          className="flex-1 min-h-11 rounded-[12px] bg-azul text-white font-extrabold text-sm border-0"
        >
          Recordarme
        </button>
      </div>
    </div>
  )
}
