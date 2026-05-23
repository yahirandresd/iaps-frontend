import { useState } from 'react'
import { TextSizeIcon } from '../../assets/icons'
import TweaksPanel from './TweaksPanel'

export default function AccessibilityFAB() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed right-4 bottom-[110px] z-[60] bg-azul-oscuro text-white border-0 rounded-full h-[52px] px-[18px] font-black text-base inline-flex items-center gap-2 shadow-fab"
        aria-label="Aumentar tamaño de texto y opciones de accesibilidad"
      >
        <TextSizeIcon className="w-[22px] h-[22px]" />
        <span>+A</span>
      </button>
      {open && <TweaksPanel onClose={() => setOpen(false)} />}
    </>
  )
}
