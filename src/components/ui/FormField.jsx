export default function FormField({ label, error, hint, icon, children, className = '' }) {
  return (
    <div className={`flex flex-col gap-1.5 mb-3.5 ${className}`}>
      {label && (
        <label className="text-sm font-extrabold text-texto">{label}</label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-[14px] top-1/2 -translate-y-1/2 text-azul-oscuro pointer-events-none">
            {icon}
          </span>
        )}
        {children}
      </div>
      {hint && !error && (
        <p className="text-[13px] text-gris-texto">{hint}</p>
      )}
      {error && (
        <p className="text-[13px] text-rojo font-bold">{error}</p>
      )}
    </div>
  )
}

export function inputCls(hasIcon = true, hasError = false) {
  return `
    w-full min-h-[52px] rounded-[14px] border-2 bg-white font-nunito text-base
    ${hasIcon ? 'pl-11 pr-4' : 'px-4'} py-3
    text-texto transition-colors
    focus:outline-none focus:border-azul focus:shadow-[0_0_0_4px_rgba(21,101,192,.15)]
    ${hasError ? 'border-rojo bg-rojo-suave' : 'border-gris-borde'}
  `
}
