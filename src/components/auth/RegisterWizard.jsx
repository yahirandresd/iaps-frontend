import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'sonner'
import { useAuth } from '../../context/AuthContext'
import { register as registerService } from '../../services/authService'
import FormField, { inputCls } from '../ui/FormField'
import Button from '../ui/Button'
import { IdCardIcon, CalendarIcon, UserIcon, PhoneIcon, MailIcon, LockIcon, HomeIcon, EyeIcon, EyeOffIcon, ArrowRightIcon, ArrowLeftIcon, CheckIcon } from '../../assets/icons'
import { onlyNumbers, onlyLetters } from '../../utils/inputRestrictions'

const EPS_LIST = ['Sura EPS', 'Sanitas EPS', 'Compensar EPS', 'Nueva EPS', 'Salud Total', 'Famisanar', 'Coomeva', 'Mutual Ser', 'Otra / No sé']
const ESTADO_LIST = ['Activo', 'Suspendido', 'Retirado', 'Pendiente']
const TIPO_AFILIADO_LIST = ['Cotizante', 'Beneficiario', 'Independiente', 'Subsidiado']

const schemas = [
  yup.object({
    numDoc:  yup.string().matches(/^\d{6,12}$/, 'Número inválido (6–12 dígitos)').required('El número es obligatorio'),
    docDate: yup.string().required('Selecciona la fecha de expedición'),
  }),
  yup.object({
    nombre: yup.string().matches(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/, 'Solo se permiten letras').min(3, 'Mínimo 3 caracteres').required('El nombre es obligatorio'),
    bday:   yup.string().required('Selecciona tu fecha de nacimiento').test('min-age', 'Debes tener al menos 18 años', v => {
      if (!v) return false
      const max = new Date(); max.setFullYear(max.getFullYear() - 18)
      return new Date(v) <= max
    }),
    phone:  yup.string().matches(/^\d{10}$/, 'Celular inválido (10 dígitos)').required('El celular es obligatorio'),
    email:  yup.string().email('Correo inválido').required('El correo es obligatorio'),
  }),
  yup.object({
    eps:              yup.string().required('Selecciona una EPS'),
    estado:           yup.string().required('Selecciona el estado'),
    fecha_afiliacion: yup.string().required('Ingresa la fecha de afiliación'),
    fecha_fin:        yup.string().nullable(),
    tipo_afiliado:    yup.string().required('Selecciona el tipo de afiliado'),
  }),
  yup.object({
    pwd:   yup.string().min(8, 'Mínimo 8 caracteres').matches(/[A-Z]/, 'Debe tener al menos 1 mayúscula').matches(/\d/, 'Debe tener al menos 1 número').matches(/[^A-Za-z0-9]/, 'Debe tener al menos 1 símbolo').required(),
    pwd2:  yup.string().oneOf([yup.ref('pwd')], 'Las contraseñas no coinciden').required('Confirma tu contraseña'),
    terms: yup.boolean().oneOf([true], 'Debes aceptar los términos'),
  }),
]

const STEP_NAMES = ['Identidad', 'Datos personales', 'Afiliación', 'Contraseña']

function PwdChecklist({ pwd }) {
  const checks = [
    { key: 'len',   label: '8+ caracteres', ok: pwd.length >= 8 },
    { key: 'upper', label: '1 mayúscula',   ok: /[A-Z]/.test(pwd) },
    { key: 'num',   label: '1 número',      ok: /\d/.test(pwd) },
    { key: 'sym',   label: '1 símbolo',     ok: /[^A-Za-z0-9]/.test(pwd) },
  ]
  const score = checks.filter(c => c.ok).length
  const barColor = ['bg-rojo', 'bg-naranja', 'bg-[#FBC02D]', 'bg-verde'][score - 1] ?? 'bg-gris-borde'
  const barW = ['0%', '25%', '50%', '75%', '100%'][score]
  return (
    <>
      <div className="h-1.5 rounded-full bg-gris-borde overflow-hidden my-1.5">
        <div className={`h-full rounded-full transition-all ${barColor}`} style={{ width: barW }} />
      </div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[13px] text-gris-texto mb-2">
        {checks.map(c => (
          <span key={c.key} className={`flex items-center gap-1.5 ${c.ok ? 'text-verde-oscuro font-bold' : ''}`}>
            <CheckIcon className={`w-3.5 h-3.5 ${c.ok ? 'text-verde' : 'text-gris-borde'}`} />
            {c.label}
          </span>
        ))}
      </div>
    </>
  )
}

function RadioCard({ label, sub, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 min-h-14 border-2 rounded-[14px] p-3 text-center font-bold text-sm transition-all
        ${selected ? 'border-azul bg-azul-suave text-azul-oscuro' : 'border-gris-borde bg-white text-texto hover:border-azul'}`}
    >
      {label}
      {sub && <span className={`block text-[12px] font-semibold mt-0.5 ${selected ? 'text-azul-oscuro' : 'text-gris-texto'}`}>{sub}</span>}
    </button>
  )
}

export default function RegisterWizard() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({})
  const [docType, setDocType] = useState('CC')
  const [gender, setGender] = useState('')
  const [regimen, setRegimen] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [showPwd2, setShowPwd2] = useState(false)
  const [done, setDone] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schemas[step - 1]),
  })

  const pwd = watch('pwd') ?? ''

  const [submitting, setSubmitting] = useState(false)

  const onStepSubmit = async (data) => {
    const merged = { ...formData, ...data, docType, gender, regimen }
    setFormData(merged)
    if (step < 4) {
      setStep(s => s + 1)
      reset()
    } else {
      setSubmitting(true)
      const { data: user, error } = await registerService(merged)
      setSubmitting(false)
      if (error) { toast.error(error); return }
      setDone(true)
      setTimeout(() => {
        login(user)
        toast.success('¡Cuenta creada! Bienvenido/a.')
        navigate('/')
      }, 2000)
    }
  }

  const goBack = () => { setStep(s => s - 1); reset() }

  if (done) {
    return (
      <div className="text-center py-3">
        <div className="w-24 h-24 mx-auto mb-3.5 rounded-full bg-verde-suave text-verde grid place-items-center animate-[pop_.4s_cubic-bezier(.2,1.3,.4,1)_both]">
          <CheckIcon className="w-14 h-14" />
        </div>
        <h2 className="text-2xl font-extrabold mb-1.5">¡Cuenta creada con éxito!</h2>
        <p className="text-[15px] text-gris-texto mb-3.5">Tu información ha sido validada con el sistema de salud.</p>
        <div className="text-left bg-gris-fondo border border-gris-borde rounded-[14px] p-3.5">
          {[
            ['Documento', `${formData.docType} ${formData.numDoc}`],
            ['Nombre', formData.nombre],
            ['Correo', formData.email],
            ['EPS', formData.eps],
          ].map(([k, v]) => v && (
            <div key={k} className="flex justify-between py-1.5 text-sm border-b border-gris-borde last:border-0">
              <span className="text-gris-texto font-bold">{k}</span>
              <span className="font-extrabold text-texto text-right max-w-[60%] break-words">{v}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Stepper */}
      <div className="flex items-center gap-1.5 mb-4" aria-hidden="true">
        {[1, 2, 3, 4].map((n, i) => (
          <div key={n} className="contents">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-sm shrink-0 transition-all
              ${n < step ? 'bg-verde border-verde text-white' : n === step ? 'bg-azul border-azul text-white shadow-[0_0_0_4px_rgba(21,101,192,.18)]' : 'bg-gris-fondo border-2 border-gris-borde text-gris-texto'}`}>
              {n < step ? <CheckIcon className="w-4 h-4" /> : n}
            </div>
            {i < 3 && <div className={`flex-1 h-[3px] rounded-full transition-all ${n < step ? 'bg-verde' : 'bg-gris-borde'}`} />}
          </div>
        ))}
      </div>
      <p className="text-[13px] font-bold text-gris-texto mb-3.5">
        Paso <strong className="text-azul-oscuro">{step}</strong> de 4 · {STEP_NAMES[step - 1]}
      </p>

      <form onSubmit={handleSubmit(onStepSubmit)} noValidate>
        {/* Paso 1 */}
        {step === 1 && (
          <div className="animate-[fade_.25s_ease_both]">
            <h2 className="text-2xl font-extrabold mb-1">Verifica tu identidad</h2>
            <p className="text-[15px] text-gris-texto mb-4">Usamos tus datos para validar tu afiliación al sistema de salud.</p>

            <FormField label="Tipo de documento">
              <div className="flex gap-2">
                {[['CC','Cédula'],['CE','Extranjería']].map(([val, sub]) => (
                  <RadioCard key={val} label={val} sub={sub} selected={docType === val} onClick={() => setDocType(val)} />
                ))}
              </div>
            </FormField>

            <FormField label="Número de documento" error={errors.numDoc?.message} icon={<IdCardIcon className="w-[18px] h-[18px]" />}>
              <input {...register('numDoc')} type="text" inputMode="numeric" placeholder="Ej. 1234567890" maxLength={12} onKeyDown={onlyNumbers} className={inputCls(true, !!errors.numDoc)} />
            </FormField>

            <FormField label="Fecha de expedición" error={errors.docDate?.message} icon={<CalendarIcon className="w-[18px] h-[18px]" />}>
              <input {...register('docDate')} type="date" className={inputCls(true, !!errors.docDate)} />
            </FormField>
          </div>
        )}

        {/* Paso 2 */}
        {step === 2 && (
          <div className="animate-[fade_.25s_ease_both]">
            <h2 className="text-2xl font-extrabold mb-1">Cuéntanos sobre ti</h2>
            <p className="text-[15px] text-gris-texto mb-4">Estos datos aparecerán en tu perfil.</p>

            <FormField label="Nombre completo" error={errors.nombre?.message} icon={<UserIcon className="w-[18px] h-[18px]" />}>
              <input {...register('nombre')} type="text" placeholder="Ej. María Fernández Gómez" autoComplete="name" onKeyDown={onlyLetters} className={inputCls(true, !!errors.nombre)} />
            </FormField>

            <FormField label="Fecha de nacimiento" error={errors.bday?.message} icon={<CalendarIcon className="w-[18px] h-[18px]" />}>
              <input {...register('bday')} type="date" max={(() => { const d = new Date(); d.setFullYear(d.getFullYear() - 18); return d.toISOString().split('T')[0] })()} className={inputCls(true, !!errors.bday)} />
            </FormField>

            <FormField label="Género">
              <div className="flex gap-2">
                {[['F','Femenino'],['M','Masculino'],['O','Otro']].map(([val, label]) => (
                  <RadioCard key={val} label={label} selected={gender === val} onClick={() => setGender(val)} />
                ))}
              </div>
            </FormField>

            <FormField label="Teléfono celular" error={errors.phone?.message} hint="Lo usaremos para enviarte recordatorios de citas." icon={<PhoneIcon className="w-[18px] h-[18px]" />}>
              <input {...register('phone')} type="tel" inputMode="numeric" placeholder="Ej. 3112345678" maxLength={10} onKeyDown={onlyNumbers} autoComplete="tel" className={inputCls(true, !!errors.phone)} />
            </FormField>

            <FormField label="Correo electrónico" error={errors.email?.message} icon={<MailIcon className="w-[18px] h-[18px]" />}>
              <input {...register('email')} type="email" placeholder="tu@correo.com" autoComplete="email" className={inputCls(true, !!errors.email)} />
            </FormField>
          </div>
        )}

        {/* Paso 3 */}
        {step === 3 && (
          <div className="animate-[fade_.25s_ease_both]">
            <h2 className="text-2xl font-extrabold mb-1">Tu afiliación al sistema</h2>
            <p className="text-[15px] text-gris-texto mb-4">Datos de tu afiliación en el sistema de salud colombiano.</p>

            <FormField label="Entidad / EPS" error={errors.eps?.message} icon={<HomeIcon className="w-[18px] h-[18px]" />}>
              <select {...register('eps')} className={`${inputCls(true, !!errors.eps)} appearance-none`}>
                <option value="">Selecciona tu EPS…</option>
                {EPS_LIST.map(e => <option key={e}>{e}</option>)}
              </select>
            </FormField>

            <FormField label="Régimen">
              <div className="flex gap-2 flex-wrap">
                {[['contributivo','Contributivo','Cotizo o me cotizan'],['subsidiado','Subsidiado','SISBEN'],['especial','Especial','FFMM, Ecopetrol…']].map(([val, label, sub]) => (
                  <RadioCard key={val} label={label} sub={sub} selected={regimen === val} onClick={() => setRegimen(val)} />
                ))}
              </div>
            </FormField>

            <FormField label="Estado de afiliación" error={errors.estado?.message} icon={<HomeIcon className="w-[18px] h-[18px]" />}>
              <select {...register('estado')} className={`${inputCls(true, !!errors.estado)} appearance-none`}>
                <option value="">Selecciona el estado…</option>
                {ESTADO_LIST.map(e => <option key={e}>{e}</option>)}
              </select>
            </FormField>

            <FormField label="Tipo de afiliado" error={errors.tipo_afiliado?.message} icon={<HomeIcon className="w-[18px] h-[18px]" />}>
              <select {...register('tipo_afiliado')} className={`${inputCls(true, !!errors.tipo_afiliado)} appearance-none`}>
                <option value="">Selecciona el tipo…</option>
                {TIPO_AFILIADO_LIST.map(t => <option key={t}>{t}</option>)}
              </select>
            </FormField>

            <FormField label="Fecha de afiliación efectiva" error={errors.fecha_afiliacion?.message} icon={<CalendarIcon className="w-[18px] h-[18px]" />}>
              <input {...register('fecha_afiliacion')} type="date" className={inputCls(true, !!errors.fecha_afiliacion)} />
            </FormField>

            <FormField label={<>Fecha de finalización <span className="text-gris-texto font-semibold">(opcional)</span></>} icon={<CalendarIcon className="w-[18px] h-[18px]" />}>
              <input {...register('fecha_fin')} type="date" className={inputCls(true, false)} />
            </FormField>
          </div>
        )}

        {/* Paso 4 */}
        {step === 4 && (
          <div className="animate-[fade_.25s_ease_both]">
            <h2 className="text-2xl font-extrabold mb-1">Crea tu contraseña</h2>
            <p className="text-[15px] text-gris-texto mb-4">Usa al menos 8 caracteres con letras y números.</p>

            <FormField label="Contraseña" error={errors.pwd?.message} icon={<LockIcon className="w-[18px] h-[18px]" />}>
              <input {...register('pwd')} type={showPwd ? 'text' : 'password'} placeholder="Mínimo 8 caracteres" autoComplete="new-password" className={`${inputCls(true, !!errors.pwd)} pr-[76px]`} />
              <button type="button" onClick={() => setShowPwd(v => !v)} className="absolute right-2 top-1/2 -translate-y-1/2 text-gris-texto font-bold text-[13px] px-2.5 py-2 rounded-[10px] hover:bg-gris-fondo flex items-center gap-1">
                {showPwd ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                {showPwd ? 'Ocultar' : 'Mostrar'}
              </button>
            </FormField>
            <PwdChecklist pwd={pwd} />

            <FormField label="Confirmar contraseña" error={errors.pwd2?.message} icon={<LockIcon className="w-[18px] h-[18px]" />}>
              <input {...register('pwd2')} type={showPwd2 ? 'text' : 'password'} placeholder="Repite tu contraseña" autoComplete="new-password" className={`${inputCls(true, !!errors.pwd2)} pr-[76px]`} />
              <button type="button" onClick={() => setShowPwd2(v => !v)} className="absolute right-2 top-1/2 -translate-y-1/2 text-gris-texto font-bold text-[13px] px-2.5 py-2 rounded-[10px] hover:bg-gris-fondo flex items-center gap-1">
                {showPwd2 ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                {showPwd2 ? 'Ocultar' : 'Mostrar'}
              </button>
            </FormField>

            <div className={`flex gap-2.5 items-start p-3 rounded-[12px] border mb-3.5 text-sm ${errors.terms ? 'border-rojo bg-rojo-suave' : 'bg-gris-fondo border-gris-borde'}`}>
              <input {...register('terms')} type="checkbox" id="terms" className="w-[22px] h-[22px] accent-azul mt-0.5 shrink-0" />
              <label htmlFor="terms" className="text-texto">
                Acepto los <button type="button" onClick={() => toast.info('Términos y condiciones')} className="text-azul font-extrabold bg-transparent border-0 p-0">términos y condiciones</button> y la <button type="button" onClick={() => toast.info('Política de privacidad')} className="text-azul font-extrabold bg-transparent border-0 p-0">política de tratamiento de datos</button> de iAPS.
              </label>
            </div>
            {errors.terms && <p className="text-[13px] text-rojo font-bold -mt-2 mb-3">{errors.terms.message}</p>}
          </div>
        )}

        <div className="flex gap-2.5 mt-1.5">
          {step > 1 && (
            <Button type="button" variant="ghost" onClick={goBack} className="flex-1">
              <ArrowLeftIcon className="w-5 h-5" /> Atrás
            </Button>
          )}
          <Button type="submit" disabled={submitting} className="flex-1">
            {step === 4 ? (submitting ? 'Creando cuenta…' : 'Crear cuenta') : 'Continuar'}
            <ArrowRightIcon className="w-5 h-5" />
          </Button>
        </div>
      </form>

      <p className="text-center mt-4 text-[13px] text-gris-texto">
        ¿Ya tienes cuenta?{' '}
        <Link to="/login" className="text-azul font-extrabold">Inicia sesión</Link>
      </p>
    </>
  )
}
