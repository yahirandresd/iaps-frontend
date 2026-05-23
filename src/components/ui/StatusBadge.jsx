const styles = {
  green:  'bg-verde-suave text-verde-oscuro border border-[#B7DDB9]',
  orange: 'bg-naranja-suave text-[#B85C00] border border-[#FFD8A8]',
  red:    'bg-rojo-suave text-rojo border border-[#F4B5B5]',
  gray:   'bg-[#ECEFF4] text-[#455064] border border-[#D6DBE3]',
  blue:   'bg-azul-suave text-azul-oscuro border border-[#BBDEFB]',
}

export default function StatusBadge({ cls = 'gray', label }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-extrabold text-[13px] tracking-wide ${styles[cls] ?? styles.gray}`}>
      {label}
    </span>
  )
}
