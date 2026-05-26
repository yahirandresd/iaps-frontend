import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { toast } from 'sonner'
import { useAuth } from '../context/AuthContext'
import PageHeader from '../components/ui/PageHeader'
import FormField, { inputCls } from '../components/ui/FormField'
import Button from '../components/ui/Button'
import { CalendarIcon, ClockIcon, UserIcon, HomeIcon, FileTextIcon } from '../assets/icons'
import { agendarCita } from '../services/citasService'

const TIPOS = [
  'Medicina General',
  'Odontología',
  'Cardiología',
  'Pediatría',
  'Ginecología',
  'Psicología',
  'Nutrición y Dietética',
  'Dermatología',
  'Oftalmología',
  'Ortopedia',
  'Otra especialidad',
]

const HORAS = [
  '07:00 AM','07:30 AM','08:00 AM','08:30 AM','09:00 AM','09:30 AM',
  '10:00 AM','10:30 AM','11:00 AM','11:30 AM','12:00 PM','12:30 PM',
  '01:00 PM','01:30 PM','02:00 PM','02:30 PM','03:00 PM','03:30 PM',
  '04:00 PM','04:30 PM','05:00 PM','05:30 PM',
]

const today = new Date().toISOString().split('T')[0]

const schema = yup.object({
  tipo:  yup.string().required('Selecciona el tipo de consulta'),
  fecha: yup.string().min(today, 'La fecha no puede ser anterior a hoy').required('Selecciona la fecha'),
  hora:  yup.string().required('Selecciona la hora'),
  medico:    yup.string(),
  lugar:     yup.string(),
  notas:     yup.string(),
})

export default function NuevaCitaPage() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { lugar: user?.eps ?? '' },
  })

  const onSubmit = async (data) => {
    const { data: cita, error } = await agendarCita(data)
    if (error) { toast.error(error); return }
    toast.success('¡Cita agendada correctamente!')
    navigate('/citas')
    void cita
  }

  return (
    <section className="animate-[fade_.28s_ease_both] pb-8">
      <PageHeader title="Nueva cita" icon={<CalendarIcon className="w-[18px] h-[18px]" />} />

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="px-3 flex flex-col gap-0.5 mt-1">

        <FormField label="Tipo de consulta" error={errors.tipo?.message} icon={<FileTextIcon className="w-[18px] h-[18px]" />}>
          <select {...register('tipo')} className={`${inputCls(true, !!errors.tipo)} appearance-none`}>
            <option value="">Selecciona una especialidad…</option>
            {TIPOS.map(t => <option key={t}>{t}</option>)}
          </select>
        </FormField>

        <FormField label="Fecha" error={errors.fecha?.message} icon={<CalendarIcon className="w-[18px] h-[18px]" />}>
          <input
            {...register('fecha')}
            type="date"
            min={today}
            className={inputCls(true, !!errors.fecha)}
          />
        </FormField>

        <FormField label="Hora" error={errors.hora?.message} icon={<ClockIcon className="w-[18px] h-[18px]" />}>
          <select {...register('hora')} className={`${inputCls(true, !!errors.hora)} appearance-none`}>
            <option value="">Selecciona una hora…</option>
            {HORAS.map(h => <option key={h}>{h}</option>)}
          </select>
        </FormField>

        <FormField
          label={<>Médico <span className="text-gris-texto font-semibold">(opcional)</span></>}
          error={errors.medico?.message}
          icon={<UserIcon className="w-[18px] h-[18px]" />}
          hint="Si ya tienes médico asignado, escribe su nombre."
        >
          <input
            {...register('medico')}
            type="text"
            placeholder="Ej. Dr. Carlos Ruiz"
            className={inputCls(true, !!errors.medico)}
          />
        </FormField>

        <FormField
          label={<>Lugar / IPS <span className="text-gris-texto font-semibold">(opcional)</span></>}
          error={errors.lugar?.message}
          icon={<HomeIcon className="w-[18px] h-[18px]" />}
        >
          <input
            {...register('lugar')}
            type="text"
            placeholder="Ej. Clínica Las Américas"
            className={inputCls(true, !!errors.lugar)}
          />
        </FormField>

        <FormField
          label={<>Observaciones <span className="text-gris-texto font-semibold">(opcional)</span></>}
          icon={<FileTextIcon className="w-[18px] h-[18px]" />}
        >
          <textarea
            {...register('notas')}
            rows={3}
            placeholder="Síntomas, motivo de consulta…"
            className={`${inputCls(true, false)} resize-none`}
          />
        </FormField>

        <div className="flex gap-2.5 mt-2">
          <Button type="button" variant="ghost" className="flex-1" onClick={() => navigate('/citas')}>
            Cancelar
          </Button>
          <Button type="submit" variant="verde" disabled={isSubmitting} className="flex-1">
            {isSubmitting ? 'Agendando…' : 'Agendar cita'}
          </Button>
        </div>
      </form>
    </section>
  )
}
