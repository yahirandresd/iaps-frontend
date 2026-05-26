import LoginForm from '../components/auth/LoginForm'
import { LockIcon } from '../assets/icons'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-azul-suave via-white to-verde-suave flex flex-col md:items-center md:justify-center">
      <div className="w-full max-w-md mx-auto px-5 py-6 flex flex-col">
      <div className="flex flex-col items-start mt-3 mb-5">
        <img src="/iAPS_logo-removebg-preview.png" alt="iAPS" className="h-16 w-auto object-contain" />
        <span className="text-[22px] font-extrabold text-azul-oscuro tracking-tight leading-none -mt-1">iAPS</span>
      </div>

      <div className="bg-white rounded-xl p-[22px] shadow-lg border border-gris-borde">
        <h2 className="m-0 mb-1.5 text-[22px] font-extrabold">Iniciar sesión</h2>
        <p className="m-0 mb-4 text-[15px] text-gris-texto">Ingresa con tu cédula de ciudadanía, la fecha de expedición y tu contraseña.</p>
        <LoginForm />
      </div>

      <p className="mt-4 text-center text-[13px] text-gris-texto flex items-center justify-center gap-1.5">
        <LockIcon className="w-[18px] h-[18px]" />
        Tus datos están protegidos. iAPS no comparte tu información sin tu autorización.
      </p>
      </div>
    </div>
  )
}
