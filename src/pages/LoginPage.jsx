import LoginForm from '../components/auth/LoginForm'
import { LockIcon } from '../assets/icons'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-azul-suave via-white to-verde-suave flex flex-col md:items-center md:justify-center">
      <div className="w-full max-w-md mx-auto px-5 py-6 flex flex-col">
      <div className="flex items-center gap-3 mt-3 mb-5">
        <div className="w-14 h-14 rounded-[18px] bg-gradient-to-br from-azul to-azul-oscuro grid place-items-center shadow-md shrink-0">
          <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
            <path d="M13 4h6v6h6v6h-6v6h-6v-6H7v-6h6V4z" fill="#fff"/>
            <path d="M24 18c0-3 2-6 6-7-1 5-3 8-6 9v-2z" fill="#A5D6A7"/>
          </svg>
        </div>
        <div>
          <h1 className="m-0 text-[32px] font-black text-azul-oscuro leading-none">iAPS</h1>
          <div className="text-sm text-gris-texto font-semibold mt-0.5">Tu salud, siempre en tus manos</div>
        </div>
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
