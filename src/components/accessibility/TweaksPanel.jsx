import { useAccessibility } from '../../context/AccessibilityContext'

export default function TweaksPanel({ onClose }) {
  const { textSize, contrast, changeTextSize, changeContrast } = useAccessibility()

  const btnCls = (active) =>
    `flex-1 min-h-10 rounded-[10px] border font-bold text-sm transition-colors
     ${active ? 'bg-azul text-white border-azul' : 'bg-white text-texto border-gris-borde'}`

  return (
    <aside className="fixed right-4 top-[90px] w-[260px] bg-white border border-gris-borde rounded-[18px] shadow-lg p-3.5 z-[80]">
      <button
        onClick={onClose}
        className="absolute right-2 top-2 bg-transparent border-0 text-lg text-gris-texto"
        aria-label="Cerrar"
      >
        ×
      </button>

      <h4 className="text-xs font-black text-gris-texto uppercase tracking-widest mb-2.5">Tamaño de texto</h4>
      <div className="flex gap-2 mb-2.5">
        {[['md', 'A'], ['lg', 'A+'], ['xl', 'A++']].map(([val, label]) => (
          <button key={val} onClick={() => changeTextSize(val)} className={btnCls(textSize === val)}>{label}</button>
        ))}
      </div>

      <h4 className="text-xs font-black text-gris-texto uppercase tracking-widest mb-2.5">Contraste</h4>
      <div className="flex gap-2">
        {[['normal', 'Normal'], ['high', 'Alto']].map(([val, label]) => (
          <button key={val} onClick={() => changeContrast(val)} className={btnCls(contrast === val)}>{label}</button>
        ))}
      </div>
    </aside>
  )
}
