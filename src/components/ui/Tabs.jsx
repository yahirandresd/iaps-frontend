export default function Tabs({ tabs, active, onChange }) {
  return (
    <div className="flex gap-2 px-4 py-3 overflow-x-auto bg-gris-fondo" role="tablist">
      {tabs.map((t) => (
        <button
          key={t.key}
          role="tab"
          aria-selected={active === t.key}
          onClick={() => onChange(t.key)}
          className={`
            px-4 py-2.5 rounded-full font-bold text-sm min-h-[44px] whitespace-nowrap border transition-colors
            ${active === t.key
              ? 'bg-azul text-white border-azul'
              : 'bg-white text-texto border-gris-borde'}
          `}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}
