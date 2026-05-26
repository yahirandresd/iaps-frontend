import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CalendarIcon, PillIcon, ClipboardIcon, HandIcon, CheckCircleIcon, ArrowRightIcon } from '../assets/icons'

const FEATURES = [
  {
    icon: <CalendarIcon className="w-7 h-7" />,
    color: 'bg-azul-suave text-azul',
    title: 'Agenda citas',
    desc: 'Programa consultas médicas con tu EPS desde el celular, cuando quieras.',
  },
  {
    icon: <PillIcon className="w-7 h-7" />,
    color: 'bg-naranja-suave text-naranja',
    title: 'Medicamentos',
    desc: 'Consulta tus fórmulas activas y recuerda cuándo recoger tus medicamentos.',
  },
  {
    icon: <ClipboardIcon className="w-7 h-7" />,
    color: 'bg-verde-suave text-verde',
    title: 'Historial clínico',
    desc: 'Accede a tu historial de atenciones y resultados de forma segura.',
  },
  {
    icon: <HandIcon className="w-7 h-7" />,
    color: 'bg-[#EDE7F6] text-[#512DA8]',
    title: 'Estado de afiliación',
    desc: 'Revisa tu estado en el sistema, régimen y datos de tu EPS en tiempo real.',
  },
]

const IOS_STEPS = [
  'Abre esta página en Safari',
  'Toca el botón Compartir (cuadrado con flecha)',
  'Selecciona "Añadir a pantalla de inicio"',
  'Confirma tocando "Añadir"',
]

function isIos() {
  return /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase())
}

function isInStandaloneMode() {
  return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone
}

export default function LandingPage() {
  const navigate = useNavigate()
  const [installPrompt, setInstallPrompt] = useState(null)
  const [installed, setInstalled] = useState(false)
  const [showIosHint, setShowIosHint] = useState(false)

  useEffect(() => {
    if (isInStandaloneMode()) { setInstalled(true); return }

    const handler = (e) => { e.preventDefault(); setInstallPrompt(e) }
    window.addEventListener('beforeinstallprompt', handler)
    window.addEventListener('appinstalled', () => setInstalled(true))
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (isIos()) { setShowIosHint(true); return }
    if (!installPrompt) { setShowIosHint(true); return }
    await installPrompt.prompt()
    const { outcome } = await installPrompt.userChoice
    if (outcome === 'accepted') setInstalled(true)
    setInstallPrompt(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-azul-suave via-white to-verde-suave flex flex-col">

      {/* Hero */}
      <div className="flex flex-col items-center text-center px-6 pt-14 pb-10">
        <div className="flex flex-col items-center mb-6">
          <img src="/iAPS_logo-removebg-preview.png" alt="iAPS" className="h-24 w-auto object-contain drop-shadow-md" />
          <span className="text-[32px] font-extrabold text-azul-oscuro tracking-tight leading-none mt-1">iAPS</span>
        </div>
        <h1 className="text-[28px] font-extrabold text-texto leading-tight mb-3 max-w-xs">
          Tu salud, siempre en tu bolsillo
        </h1>
        <p className="text-[16px] text-gris-texto leading-relaxed max-w-sm mb-8">
          Gestiona citas, medicamentos e historial clínico con tu EPS desde el celular — sin filas, sin papeles.
        </p>

        {/* Install CTA */}
        {installed ? (
          <div className="flex items-center gap-2 bg-verde text-white font-extrabold px-6 py-3.5 rounded-xl text-[16px] shadow-md">
            <CheckCircleIcon className="w-5 h-5" /> ¡App instalada!
          </div>
        ) : (
          <button
            onClick={handleInstall}
            className="w-full max-w-xs bg-azul text-white font-extrabold text-[16px] px-6 py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            Instalar iAPS gratis
            <ArrowRightIcon className="w-5 h-5" />
          </button>
        )}

        <button
          onClick={() => navigate('/login')}
          className="mt-3 text-azul font-extrabold text-[15px] underline underline-offset-2"
        >
          Ya tengo cuenta — Ingresar
        </button>
      </div>

      {/* iOS hint */}
      {showIosHint && (
        <div className="mx-4 mb-6 bg-white border border-azul rounded-xl p-4 shadow-md">
          <p className="font-extrabold text-azul-oscuro mb-3 text-[15px]">
            {isIos() ? 'Cómo instalar en iPhone / iPad' : 'Cómo instalar manualmente'}
          </p>
          <ol className="flex flex-col gap-2">
            {IOS_STEPS.map((step, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[14px] text-texto">
                <span className="w-6 h-6 rounded-full bg-azul text-white font-extrabold text-[12px] grid place-items-center shrink-0 mt-0.5">{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>
          <button onClick={() => setShowIosHint(false)} className="mt-3 text-[13px] text-gris-texto font-bold">Cerrar</button>
        </div>
      )}

      {/* Features */}
      <div className="px-4 pb-4">
        <h2 className="text-[18px] font-extrabold text-texto mb-3 text-center">¿Qué puedes hacer?</h2>
        <div className="grid grid-cols-2 gap-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="bg-white rounded-xl p-4 border border-gris-borde shadow-sm flex flex-col gap-2">
              <div className={`w-12 h-12 rounded-[14px] grid place-items-center ${f.color}`}>
                {f.icon}
              </div>
              <p className="font-extrabold text-texto text-[15px] leading-tight">{f.title}</p>
              <p className="text-[13px] text-gris-texto leading-snug">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Trust bar */}
      <div className="mx-4 my-4 bg-white border border-gris-borde rounded-xl p-4 flex items-start gap-3 shadow-sm">
        <CheckCircleIcon className="w-6 h-6 text-verde shrink-0 mt-0.5" />
        <p className="text-[13px] text-gris-texto leading-relaxed">
          <strong className="text-texto">Seguridad garantizada.</strong> Tus datos están cifrados y protegidos. iAPS no comparte tu información con terceros sin tu autorización.
        </p>
      </div>

      {/* Footer */}
      <div className="mt-auto pb-8 text-center text-[12px] text-gris-texto px-4">
        <p>© {new Date().getFullYear()} iAPS · Sistema de Salud Digital</p>
        <button onClick={() => navigate('/login')} className="mt-2 text-azul font-bold">
          Iniciar sesión
        </button>
        {' · '}
        <button onClick={() => navigate('/register')} className="text-azul font-bold">
          Registrarse
        </button>
      </div>
    </div>
  )
}
