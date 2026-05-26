import { useNavigate } from 'react-router-dom'
import RegisterWizard from '../components/auth/RegisterWizard'
import { ArrowLeftIcon } from '../assets/icons'

export default function RegisterPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-b from-azul-suave via-white to-verde-suave flex flex-col md:items-center md:justify-center">
      <div className="w-full max-w-md mx-auto px-5 py-6 flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => navigate('/login')}
          aria-label="Volver al inicio de sesión"
          className="w-11 h-11 rounded-sm border border-gris-borde bg-white grid place-items-center shrink-0"
        >
          <ArrowLeftIcon className="w-[22px] h-[22px] text-texto" />
        </button>
        <img src="/iAPS_logo.png" alt="iAPS" className="h-10 w-auto object-contain" />
      </div>

      <div className="bg-white rounded-xl p-[22px] shadow-lg border border-gris-borde">
        <RegisterWizard />
      </div>
      </div>
    </div>
  )
}
