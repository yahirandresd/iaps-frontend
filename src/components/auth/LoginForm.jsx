import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'sonner'
import { useAuth } from '../../context/AuthContext'
import FormField, { inputCls } from '../ui/FormField'
import Button from '../ui/Button'
import { IdCardIcon, LockIcon, EyeIcon, EyeOffIcon, ArrowRightIcon } from '../../assets/icons'
import { onlyNumbers } from '../../utils/inputRestrictions'
import { login as loginService } from '../../services/authService'
import { useRateLimit } from '../../hooks/useRateLimit'

const schema = yup.object({
  cedula:   yup.string().matches(/^\d{6,12}$/, 'Ingresa una cédula válida (6–12 dígitos)').required('La cédula es obligatoria'),
  password: yup.string().min(4, 'Mínimo 4 caracteres').required('La contraseña es obligatoria'),
})

function fmt(s) { return `${String(Math.floor(s / 60)).padStart(2,'0')}:${String(s % 60).padStart(2,'0')}` }

export default function LoginForm() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [showPass, setShowPass] = useState(false)
  const { isLocked, secondsLeft, recordAttempt, resetAttempts } = useRateLimit('login')

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = async ({ cedula, password }) => {
    try {
      const profile = await loginService(cedula, password)
      resetAttempts()
      await login(profile)
      toast.success(`¡Bienvenido/a, ${profile.nombre?.split(' ')[0] ?? ''}!`)
      navigate('/')
    } catch (e) {
      recordAttempt()
      toast.error(e.message ?? 'Error al iniciar sesión')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormField label="Cédula de ciudadanía" error={errors.cedula?.message} hint="Solo números, sin puntos ni espacios." icon={<IdCardIcon className="w-[18px] h-[18px]" />}>
        <input
          {...register('cedula')}
          type="text"
          inputMode="numeric"
          placeholder="Ej. 1234567890"
          maxLength={12}
          autoComplete="username"
          onKeyDown={onlyNumbers}
          className={inputCls(true, !!errors.cedula)}
        />
      </FormField>

      <FormField label="Contraseña" error={errors.password?.message} icon={<LockIcon className="w-[18px] h-[18px]" />}>
        <input
          {...register('password')}
          type={showPass ? 'text' : 'password'}
          placeholder="Tu contraseña"
          autoComplete="current-password"
          className={`${inputCls(true, !!errors.password)} pr-[76px]`}
        />
        <button
          type="button"
          onClick={() => setShowPass(v => !v)}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-transparent border-0 text-gris-texto font-bold text-[13px] px-2.5 py-2 rounded-[10px] hover:bg-gris-fondo flex items-center gap-1"
          aria-label="Mostrar u ocultar contraseña"
        >
          {showPass ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
          {showPass ? 'Ocultar' : 'Mostrar'}
        </button>
      </FormField>

      <div className="flex justify-between items-center mt-1 mb-3.5 text-sm">
        <label className="flex gap-2 items-center font-bold cursor-pointer">
          <input type="checkbox" className="w-5 h-5 accent-azul" />
          Recordarme
        </label>
        <button type="button" onClick={() => toast.info('Te enviaremos un enlace de recuperación.')} className="text-azul font-extrabold bg-transparent border-0 text-sm">
          ¿Olvidaste tu contraseña?
        </button>
      </div>

      {isLocked && (
        <div className="bg-rojo-suave border border-rojo rounded-xl p-3 mb-3.5 text-center">
          <p className="font-extrabold text-rojo text-[15px]">⛔ Demasiados intentos</p>
          <p className="text-rojo text-[14px] mt-0.5">Puedes intentar de nuevo en <strong>{fmt(secondsLeft)}</strong></p>
        </div>
      )}

      <Button type="submit" disabled={isSubmitting || isLocked}>
        {isSubmitting ? 'Ingresando…' : 'Ingresar'}
        <ArrowRightIcon className="w-5 h-5" />
      </Button>

      <p className="text-center mt-4 text-[13px] text-gris-texto">
        ¿Es tu primera vez?{' '}
        <Link to="/register" className="text-azul font-extrabold">Regístrate aquí</Link>
      </p>
    </form>
  )
}
