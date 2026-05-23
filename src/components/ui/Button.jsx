const variants = {
  primary: 'bg-azul text-white shadow-[0_4px_10px_rgba(21,101,192,.25)] hover:brightness-95',
  ghost:   'bg-white text-azul border-2 border-azul',
  verde:   'bg-verde text-white shadow-[0_4px_10px_rgba(46,125,50,.25)] hover:brightness-95',
  rojo:    'bg-rojo text-white shadow-[0_4px_10px_rgba(211,47,47,.25)] hover:brightness-95',
  naranja: 'bg-naranja text-white shadow-[0_4px_10px_rgba(245,124,0,.25)] hover:brightness-95',
}

const sizes = {
  default: 'min-h-[52px] text-base px-4 rounded-[14px]',
  sm:      'min-h-[44px] text-[15px] px-[14px] rounded-[14px]',
}

export default function Button({ variant = 'primary', size = 'default', className = '', children, ...props }) {
  return (
    <button
      className={`
        w-full border-0 font-extrabold
        inline-flex items-center justify-center gap-[10px]
        transition-all active:scale-[.99] font-nunito
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}
