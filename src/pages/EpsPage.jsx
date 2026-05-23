import { useState } from 'react'
import PageHeader from '../components/ui/PageHeader'
import Banner from '../components/ui/Banner'
import { HomeIcon, InfoIcon, GlobeIcon, PhoneIcon, ChevronRightIcon } from '../assets/icons'

function AccordionStep({ num, title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="bg-white border border-gris-borde rounded-lg p-4 mb-3 shadow-sm">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex gap-3 items-center text-[17px] font-extrabold bg-transparent border-0 p-0 text-left"
        aria-expanded={open}
      >
        <div className="w-9 h-9 rounded-[12px] bg-azul-suave text-azul-oscuro grid place-items-center font-extrabold text-base shrink-0">{num}</div>
        <span className="flex-1">{title}</span>
        <ChevronRightIcon className={`w-[22px] h-[22px] text-gris-texto transition-transform shrink-0 ${open ? 'rotate-90' : ''}`} />
      </button>
      {open && <div className="mt-3.5 text-[15px] animate-[fade_.2s_ease_both]">{children}</div>}
    </div>
  )
}

export default function EpsPage() {
  const checks = [
    { id: 'c1', label: 'Cédula de ciudadanía' },
    { id: 'c2', label: 'No tener deudas con la EPS actual' },
    { id: 'c3', label: 'No estar en tratamiento activo (hay excepciones)' },
    { id: 'c4', label: 'Haber estado mínimo 1 año en la EPS actual' },
  ]
  const [checked, setChecked] = useState({})

  return (
    <section className="animate-[fade_.28s_ease_both]">
      <PageHeader title="Cambio de EPS" accentColor="bg-verde-oscuro" icon={<HomeIcon className="w-[18px] h-[18px]" />} />

      <div className="px-4 pt-2">
        <Banner type="info" icon={<InfoIcon className="w-[22px] h-[22px]" />}>
          ¿Quieres cambiar de EPS? Aquí te explicamos el proceso <strong>paso a paso</strong> de forma sencilla.
        </Banner>

        <AccordionStep num={1} title="¿Cuándo puedo cambiarme?" defaultOpen>
          <p>Puedes solicitar el <strong>traslado de EPS una vez al año</strong>. El período de movilidad ordinario es en <strong>junio</strong>.</p>
          <p className="text-gris-texto mt-2">Existen casos especiales: cambio de ciudad, mala atención reportada o cierre de la EPS actual.</p>
        </AccordionStep>

        <AccordionStep num={2} title="¿Qué necesito?">
          <ul className="list-none p-0 m-2 flex flex-col gap-2">
            {checks.map(c => (
              <li key={c.id} className="flex gap-2.5 items-start p-2.5 bg-gris-fondo rounded-[12px] border border-gris-borde">
                <input
                  type="checkbox"
                  id={c.id}
                  checked={!!checked[c.id]}
                  onChange={e => setChecked(prev => ({ ...prev, [c.id]: e.target.checked }))}
                  className="w-[22px] h-[22px] accent-verde mt-0.5 shrink-0"
                />
                <label htmlFor={c.id} className="text-[15px]">{c.label}</label>
              </li>
            ))}
          </ul>
        </AccordionStep>

        <AccordionStep num={3} title="¿Cómo lo hago?">
          <div className="flex gap-2.5 flex-wrap mb-3">
            <a href="https://www.miseguridadsocial.gov.co" target="_blank" rel="noopener noreferrer"
              className="flex-1 min-h-11 rounded-[12px] bg-azul text-white font-extrabold text-sm inline-flex items-center justify-center gap-2 no-underline min-w-[140px]">
              <GlobeIcon className="w-[18px] h-[18px]" /> Solicitar en línea
            </a>
            <a href="tel:018000513700"
              className="flex-1 min-h-11 rounded-[12px] border-2 border-azul text-azul bg-white font-extrabold text-sm inline-flex items-center justify-center gap-2 no-underline min-w-[140px]">
              <PhoneIcon className="w-[18px] h-[18px]" /> Llamar Supersalud
            </a>
          </div>
          <p className="text-gris-texto">Línea Supersalud: <strong>018000-513700</strong> (gratuita nacional).</p>
        </AccordionStep>

        <AccordionStep num={4} title="¿Cuánto demora?">
          <p>El traslado se hace efectivo el <strong>primer día del mes siguiente</strong> a tu solicitud, siempre y cuando cumplas los requisitos.</p>
        </AccordionStep>

        <a href="https://www.miseguridadsocial.gov.co" target="_blank" rel="noopener noreferrer"
          className="mt-2 mb-4 min-h-[52px] w-full rounded-[14px] bg-verde text-white font-extrabold text-base inline-flex items-center justify-center gap-2.5 no-underline shadow-[0_4px_10px_rgba(46,125,50,.25)]">
          Iniciar solicitud en Mi Seguridad Social
        </a>
      </div>
    </section>
  )
}
