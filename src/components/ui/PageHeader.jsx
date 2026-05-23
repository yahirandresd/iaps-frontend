import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon } from '../../assets/icons'

export default function PageHeader({ title, icon, accentColor = 'bg-azul', onBack }) {
  const navigate = useNavigate()
  const handleBack = onBack ?? (() => navigate(-1))

  return (
    <div className="flex items-center gap-3 px-4 py-[14px] bg-white border-b border-gris-borde sticky top-0 z-[25]">
      <button
        onClick={handleBack}
        aria-label="Volver"
        className="w-11 h-11 rounded-sm border border-gris-borde bg-white grid place-items-center shrink-0"
      >
        <ArrowLeftIcon className="w-[22px] h-[22px] text-texto" />
      </button>
      <span className={`w-1.5 h-7 rounded-full shrink-0 ${accentColor}`} aria-hidden="true" />
      <h1 className="m-0 text-xl font-extrabold flex-1 leading-tight flex items-center gap-1.5">
        {icon && <span className="text-azul">{icon}</span>}
        {title}
      </h1>
    </div>
  )
}
