import { useState } from 'react'
import { ClipboardIcon, ChevronRightIcon } from '../../assets/icons'

export default function HistoryCard({ record }) {
  const [expanded, setExpanded] = useState(false)
  const [showSimple, setShowSimple] = useState(false)

  return (
    <div className="bg-white rounded-lg border border-gris-borde shadow-sm p-4">
      <div className="flex gap-3 items-start">
        <div className="w-11 h-11 rounded-[14px] bg-[#E1ECFF] text-azul-oscuro grid place-items-center shrink-0">
          <ClipboardIcon className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[17px] font-extrabold m-0">{record.tipo}</p>
          <p className="text-sm text-gris-texto m-0 mt-0.5">{record.medico}</p>
        </div>
        <span className="text-sm text-gris-texto font-semibold shrink-0">{record.fecha}</span>
      </div>

      <button
        onClick={() => setExpanded(v => !v)}
        className="mt-3 flex items-center gap-1.5 text-azul font-bold text-sm bg-transparent border-0 p-0"
        aria-expanded={expanded}
      >
        <ChevronRightIcon className={`w-4 h-4 transition-transform ${expanded ? 'rotate-90' : ''}`} />
        {expanded ? 'Ocultar detalle' : 'Ver detalle'}
      </button>

      {expanded && (
        <div className="mt-3 border-t border-gris-borde pt-3 flex flex-col gap-2.5 text-[15px] animate-[fade_.2s_ease_both]">
          <div>
            <span className="text-gris-texto font-semibold block text-sm">Diagnóstico (CIE-10)</span>
            <span className="font-bold">{record.diagnostico}</span>
          </div>
          <div>
            <span className="text-gris-texto font-semibold block text-sm">Resumen médico</span>
            <span>{record.resumen}</span>
          </div>
          <button
            onClick={() => setShowSimple(v => !v)}
            className="text-azul font-bold text-sm bg-azul-suave border-0 rounded-[10px] px-3 py-2 text-left w-fit"
          >
            {showSimple ? 'Ocultar' : 'Ver en lenguaje sencillo'}
          </button>
          {showSimple && (
            <div className="bg-verde-suave border border-[#B7DDB9] rounded-[12px] p-3 text-[15px] text-verde-oscuro animate-[fade_.2s_ease_both]">
              {record.simple}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
