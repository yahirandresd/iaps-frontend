const styles = {
  info:   'bg-azul-suave text-azul-oscuro border border-[#BBDEFB]',
  warn:   'bg-naranja-suave text-[#7A3E00] border border-[#FFD8A8]',
  danger: 'bg-rojo-suave text-rojo border border-[#F4B5B5]',
  priv:   'bg-[#F0F4FA] text-azul-oscuro border border-gris-borde',
}

export default function Banner({ type = 'info', icon, children, className = '' }) {
  return (
    <div className={`rounded-md p-[14px_16px] text-[15px] flex gap-2.5 items-start mx-1 mb-3.5 ${styles[type]} ${className}`}>
      {icon && <span className="mt-[1px] shrink-0">{icon}</span>}
      <div>{children}</div>
    </div>
  )
}
